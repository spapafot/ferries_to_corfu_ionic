import json
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from datetime import datetime


class SchemaValidator:
    def __init__(self):
        self.schema = {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "properties": {
                "date": {
                    "type": "string"
                },
                "route": {
                    "type": "string"
                },
                "details": {
                    "type": "array",
                    "minItems": 3,
                    "uniqueItems": True,
                    "items": [
                        {
                            "type": "object",
                            "properties": {
                                "departure_time": {
                                    "type": "string"
                                },
                                "arrival_time": {
                                    "type": "string"
                                },
                                "company": {
                                    "type": "string"
                                },
                                "ship": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "departure_time",
                                "arrival_time",
                                "company",
                                "ship"
                            ]
                        }
                    ]
                }
            },
            "required": [
                "date",
                "route",
                "details"
            ]
        }

    def validate_schema(self, json_data):
        try:
            validate(instance=json_data, schema=self.schema)
        except ValidationError as e:
            print('Could not validate schema:', e.message)
            return False

        for i in json_data['details']:
            try:
                assert i['company'].strip() == 'KERKYRA LINES' or i['company'].strip() == 'KERKYRA SEAWAYS'
            except AssertionError:
                print(f'Corrupted data: {i["company"]}')
                continue

        for i in json_data['details']:
            try:
                datetime.strptime(i['departure_time'], '%H:%M')
                datetime.strptime(i['arrival_time'], '%H:%M')
            except ValueError as e:
                print(f'Corrupted data: {e} \n{i["departure_time"]}\n{i["arrival_time"]}')
                return False
            except TypeError as e:
                print(f'Corrupted data: {e} \n{i["departure_time"]}\n{i["arrival_time"]}')
                return False
        return True





my_json = {'date': '2022-03-29', 'route': 'igoymenitsa-kerkyra', 'details': [{'departure_time': '03:30', 'arrival_time': '05:15', 'company': 'KEA LINES', 'ship': 'ALKINOOS'}, {'departure_time': '04:00', 'arrival_time': '05:30', 'company': 'KERKYRA SEAWAYS', 'ship': 'AGIA EIRINI'}, {'departure_time': '06:30', 'arrival_time': '08:00', 'company': 'KERKYRA LINES', 'ship': 'ANO HORA II'}, {'departure_time': '08:15', 'arrival_time': '09:45', 'company': 'KERKYRA SEAWAYS', 'ship': 'ELENI'}, {'departure_time': '10:00', 'arrival_time': '11:45', 'company': 'KERKYRA LINES', 'ship': 'ALKINOOS'}, {'departure_time': '11:30', 'arrival_time': '12:40', 'company': 'KERKYRA SEAWAYS', 'ship': 'HERMES'}, {'departure_time': '12:30', 'arrival_time': '14:00', 'company': 'KERKYRA LINES', 'ship': 'ANO HORA II'}, {'departure_time': '14:00', 'arrival_time': '15:30', 'company': 'KERKYRA SEAWAYS', 'ship': 'ELENI'}, {'departure_time': '15:30', 'arrival_time': '17:00', 'company': 'KERKYRA LINES', 'ship': 'AGIA THEODORA'}, {'departure_time': '16:30', 'arrival_time': '17:40', 'company': 'KERKYRA LINES', 'ship': 'KERKYRA EXPRESS'}, {'departure_time': '17:30', 'arrival_time': '19:00', 'company': 'KERKYRA SEAWAYS', 'ship': 'IONAS'}, {'departure_time': '18:30', 'arrival_time': '19:40', 'company': 'KERKYRA SEAWAYS', 'ship': 'HERMES'}, {'departure_time': '20:30', 'arrival_time': '22:00', 'company': 'KERKYRA LINES', 'ship': 'AGIA THEODORA'}, {'departure_time': '23:30', 'arrival_time': '01:00', 'company': 'KERKYRA SEAWAYS', 'ship': 'IONAS'}]}
#validate_schema(my_json)

my_json = json.dumps({'date': '2022-04-2', 'route': 'igoymenitsa-kerkyra', 'details': [{'departure_time': '02:30', 'arrival_time': '04:00', 'company': 'KERKYRA SEAWAYS', 'ship': 'AGIA EIRINI'}, {'departure_time': '04:00', 'arrival_time': '05:30', 'company': 'KERKYRA LINES', 'ship': 'ANO HORA II'}, {'departure_time': '05:30', 'arrival_time': '07:00', 'company': 'KERKYRA LINES', 'ship': 'KERKYRA'}, {'departure_time': '07:00', 'arrival_time': '08:10', 'company': 'KERKYRA SEAWAYS', 'ship': 'HERMES'}, {'departure_time': '08:30', 'arrival_time': '10:00', 'company': 'KERKYRA SEAWAYS', 'ship': 'AGIA EIRINI'}, {'departure_time': '10:00', 'arrival_time': '11:30', 'company': 'KERKYRA LINES', 'ship': 'ANO HORA II'}, {'departure_time': '11:15', 'arrival_time': '12:45', 'company': 'KERKYRA LINES', 'ship': 'AGIA THEODORA'}, {'departure_time': '12:30', 'arrival_time': '14:00', 'company': 'KERKYRA LINES', 'ship': 'KERKYRA'}, {'departure_time': '13:30', 'arrival_time': '14:40', 'company': 'KERKYRA SEAWAYS', 'ship': 'HERMES'}, {'departure_time': '14:30', 'arrival_time': '16:15', 'company': 'KERKYRA LINES', 'ship': 'ALKINOOS'}, {'departure_time': '15:30', 'arrival_time': '16:45', 'company': 'KERKYRA LINES', 'ship': 'KERKYRA EXPRESS'}, {'departure_time': '16:30', 'arrival_time': '18:00', 'company': 'KERKYRA SEAWAYS', 'ship': 'IONAS'}, {'departure_time': '17:30', 'arrival_time': '19:00', 'company': 'KERKYRA LINES', 'ship': 'AGIA THEODORA'}, {'departure_time': '18:30', 'arrival_time': '20:00', 'company': 'KERKYRA SEAWAYS', 'ship': 'ELENI'}, {'departure_time': '20:30', 'arrival_time': '21:45', 'company': 'KERKYRA LINES', 'ship': 'KERKYRA EXPRESS'}, {'departure_time': '23:30', 'arrival_time': '01:00', 'company': 'KERKYRA SEAWAYS', 'ship': 'ELENI'}]})

