from django.shortcuts import render
from .models import User, Review


""" Mains """


def index(request):
    return render(request, 'main/index.html')


def mainMenu(request):
    return render(request, 'main/menu.html')


""" Buttons """


def profile(request):
    return render(request, 'main/profile.html')


def about(request):
    return render(request, 'main/about.html')


def contacts(request):
    return render(request, 'main/contacts.html')


def reviews(request):
    return render(request, 'main/reviews.html')

def link(request):
    return render(request, 'main/link.html')


""" Functions """

def register(request):
    return render(request, '')

def authorization(request):
    return render(request, '')