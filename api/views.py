import boto3
import logging
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from botocore.exceptions import ConnectionError, ClientError
import requests

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

#TODO Add authentication classes and permissions
#TODO Add retries

try:
    logger.info('Trying to connect to resource DynamoDB table')
    table = boto3.resource(
        'dynamodb',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
    ).Table(settings.DB_TABLE)
except ConnectionError as e:
    logger.info(e)


class WeatherRequest(APIView):

    def get(self, request):
        try:
            response = requests.get(f"{settings.WEATHER_URL}?lat={settings.LAT}&lon={settings.LON}&exclude={settings.EXCLUDE}&appid={settings.WEATHER_API_KEY}")
            data = response.json()
            return Response(data, status=status.HTTP_200_OK)
        except Exception as error:
            logger.info(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DynamoRequest(APIView):

    def get(self, request):
        try:
            logger.info('Trying to GET all items from DynamoDB table')
            response = table.scan()['Items']
            return Response(response, status=status.HTTP_200_OK)
        except ClientError as error:
            logger.info(error)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            logger.info('Trying to POST a single item to DynamoDB table')
            data = request.data
            table.put_item(Item=data)
            return Response(status=status.HTTP_201_CREATED)
        except ClientError as error:
            logger.info(error)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class DynamoDetailRequest(APIView):

    def get(self, request, date, route):
        try:
            logger.info('Trying to GET a single item from DynamoDB table')
            response = table.get_item(
                Key={
                    'date': date,
                    'route': route,
                }
            )
            item = response['Item']
            if item:
                return Response(item, status=status.HTTP_200_OK)
            else:
                return Response({"date": date, "route": route, "details": []}, status=status.HTTP_404_NOT_FOUND)
        except ClientError as error:
            logger.info(error)
            return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response({"date": date, "route": route, "details": []}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, date, route):

        data = request.data
        try:
            logger.info('Trying to PUT a single item to DynamoDB table')
            table.update_item(
                Key={
                    'date': date,
                    'route': route,
                },
                UpdateExpression='SET #details = :val1',
                ExpressionAttributeValues={
                    ':val1': data['details'],
                },
                ExpressionAttributeNames={
                    '#details': 'details',
                },
            )
            return Response(status=status.HTTP_201_CREATED)
        except ClientError as error:
            logger.info(error)
            return Response(status=status.HTTP_400_BAD_REQUEST)



