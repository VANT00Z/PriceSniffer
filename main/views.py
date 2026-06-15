from django.shortcuts import render
from .models import User, Review

import json

""" Main """


def index(request):
    return render(request, 'main/index.html')


def mainMenu(request):
    return render(request, 'main/menu.html')


""" Buttons """


def profile(request):
    return render(request, 'main/profile.html')


def contacts(request):
    return render(request, 'main/contacts.html')


def reviews(request):
    with open('static/json/reviews.json', 'r', encoding='utf-8') as json_file:
        reviews = json.load(json_file)
    return render(request, 'main/reviews.html', {'reviews': reviews})


def link(request):
    return render(request, 'main/link.html')


""" Functions """

def register(request):
    return render(request, '')

def authorization(request):
    return render(request, '')

def create_review(request):
    return render(request, '')