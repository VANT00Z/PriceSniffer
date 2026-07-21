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
    path('authors', views.authors, name='authors'),

    # Administrators
    path('moderator_view', views.moderatorView, name='moderatorView'),

    # Actions
    path('register', views.registration, name='register'),
    path('authorization', views.authorization, name='authorization'),
    path('logout', views.logout_user, name='logout'),
    path('server_log', views.sendLog, name='serverLog')
]
