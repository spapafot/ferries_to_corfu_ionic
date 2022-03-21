from django.core.management.base import BaseCommand, CommandError
import re
import requests
from bs4 import BeautifulSoup
import boto3
from datetime import date as dt, timedelta
import time
from api.models import SchemaValidator
from botocore.exceptions import ClientError
import logging
from django.conf import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()
SCRAPE_URL = settings.SCRAPE_URL

#TODO Find alternative source for schedule
#TODO Add retry Logic

try:
    logger.info('Trying to connect to resource DynamoDB table from COMMANDS')
    table = boto3.resource(
        'dynamodb',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
    ).Table(settings.DB_TABLE)
except ClientError as e:
    logger.info(e)


class Command(BaseCommand):
    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('date', nargs='+', type=str)

        # Named (optional) arguments
        parser.add_argument(
            '--update',
            action='store_true',
            help='Check for changes in schedule',
        )
        parser.add_argument(
            '--populate',
            action='store_true',
            help='Populate with new schedule',
        )

    def get_departures(self, starting_port, destination_port, date):

        def chunks(lst, n):
            for i in range(0, len(lst), n):
                yield lst[i:i + n]

        departures = []
        headers = requests.utils.default_headers()
        headers.update({
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        })

        response = requests.get(f'{SCRAPE_URL}/{starting_port}/{destination_port}/{date}', headers=headers)
        soup = BeautifulSoup(response.content, 'html5lib')
        deps = soup.find_all(name='td', style=re.compile(r"width:95px"))

        for i in deps:
            departures.append(i.text.strip())

        cleaned = list(map(lambda x: x.replace("\n", "").replace("  ", ""), departures))
        cleaned = list(chunks(cleaned, 4))

        dep_list = {
            'date': date,
            'route': f'{starting_port}-{destination_port}',
            'details': []
        }

        for i in cleaned:
            dep_list['details'].append(
                {
                    'departure_time': i[1].split("-")[0].strip(),
                    'arrival_time': i[1].split("-")[1].strip(),
                    'company': i[3].split("-")[0].strip(),
                    'ship': i[3].split("-")[1].strip(),
                })

        return dep_list

    def populate_database(self):
        validator = SchemaValidator()
        start_date = dt.today()
        is_not_empty = True
        dep_list = []
        ig = 'igoymenitsa'
        cf = 'kerkyra'

        while is_not_empty:
            ig_cf = self.get_departures(ig, cf, start_date.strftime("%Y-%m-%d"))
            time.sleep(25)
            cf_ig = self.get_departures(cf, ig, start_date.strftime("%Y-%m-%d"))
            time.sleep(15)
            start_date += timedelta(days=1)
            if ig_cf['details'] and cf_ig['details']:
                if validator.validate_schema(ig_cf):
                    dep_list.append(ig_cf)
                if validator.validate_schema(cf_ig):
                    dep_list.append(cf_ig)
            else:
                is_not_empty = False

        with table.batch_writer() as batch:
            for item in dep_list:
                batch.put_item(
                    Item=item
                )

    def check_if_schedule_changed(self, scraped_schedule, route, date):

        try:
            logger.info('Trying to GET a single item from DynamoDB table to check for schedule changes')
            response = table.get_item(
                Key={
                    'date': date,
                    'route': route,
                }
            )
            print(response)
            saved_schedule = response['Item']

            return saved_schedule['details'] == scraped_schedule['details']
        except ClientError as error:
            logging.info("Schedule changes scan:", error)
            return True


    def update_database(self, date):
        validator = SchemaValidator()

        ig = 'igoymenitsa'
        cf = 'kerkyra'
        ig_cf = self.get_departures(ig, cf, date)
        cf_ig = self.get_departures(cf, ig, date)
        deps = [ig_cf, cf_ig]

        if self.check_if_schedule_changed(ig_cf, route=ig_cf['route'], date=date):
            return logger.info('No changes detected')

        if self.check_if_schedule_changed(cf_ig, route=cf_ig['route'], date=date):
            return logger.info('No changes detected')

        for i in deps:
            if validator.validate_schema(i):
                try:
                    logger.info('Trying to PUT a single item to DynamoDB table')

                    table.update_item(
                        Key={
                            'date': date,
                            'route': i['route'],
                        },
                        UpdateExpression='SET #details = :val1',
                        ExpressionAttributeValues={
                            ':val1': i['details'],
                        },
                        ExpressionAttributeNames={
                            '#details': 'details',
                        },
                    )
                except ClientError as error:
                    logger.info(error)
        else:
            logger.info('Could not validate schema for DB update')

    def handle(self, *args, **options):
        if options['update']:
            for date in options['date']:
                self.update_database(date)
        if options['populate']:
            # ONLY POPULATE MANUALLY
            print('POPULATE HERE')

