from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    # Main
    path('', views.index, name='index'),

    # Pages
    path('menu', views.mainMenu, name='menu'),
    path('profile', views.profile, name='profile'),
    path('contacts', views.contacts, name='contacts'),
    path('reviews', views.reviews, name='reviews'),
    path('link', views.link, name='link'),

    # Protocols
    # path(),

    # Actions
    path('register', views.registration, name='register'),
    path('authorization', views.authorization, name='authorization'),
    path('server_log', views.sendLog, name='serverLog')
]
