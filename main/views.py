from django.shortcuts import render
from .models import User, Review


""" main menu """


def index(request):
    return render(request, 'main/index.html')


""" menu with register """


def mainMenu(request):
    return render(request, 'main/menu.html')


""" buttons """


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