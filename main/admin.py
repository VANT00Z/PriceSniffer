from django.contrib import admin
from django.apps import AppConfig
from .models import User, Review


class MyAppConfig(AppConfig):
    name = 'Price Sniffer'
    verbose_name = 'Ищейка'


""" Decorations """
admin.site.site_header = 'Price Sniffer Admin Panel'
admin.site.site_title = 'PS AP'
admin.site.index_title = 'Welcome to Admin Panel'


""" Register funcs"""
admin.site.register(User)
admin.site.register(Review)
