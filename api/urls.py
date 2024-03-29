from django.urls import path
from .views import DynamoDetailRequest, DynamoRequest, WeatherRequest, MainRequest

urlpatterns = [
    path('api/', MainRequest.as_view()),
    path('api/data/', DynamoRequest.as_view()),
    path('api/<route>/<date>/', DynamoDetailRequest.as_view()),
    path('api/wind/', WeatherRequest.as_view()),
]
