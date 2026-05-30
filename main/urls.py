from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    # base
    path('', views.index, name='index'),
    path('mainMenu', views.index, name='mainMenu'),
]
