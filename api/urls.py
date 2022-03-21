from django.urls import path
from .views import DynamoDetailRequest, DynamoRequest, WeatherRequest

urlpatterns = [
    path('api/', DynamoRequest.as_view()),
    path('api/<route>/<date>/', DynamoDetailRequest.as_view()),
    path('api/wind/', WeatherRequest.as_view()),
]
