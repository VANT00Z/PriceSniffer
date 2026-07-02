from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import User, Review

import json
import hashlib

from django.db import transaction

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


def set_Cookie(request, user):
    # Подключение cookie
    return redirect('main:index')


def authorization(request):
    if request.method == 'POST':
        name = request.POST.get('auth-username').strip()
        password = request.POST.get('auth-password').strip()

        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        if not all([name, password]):
            response = {
                'success': 'False',
                'message': 'Не все поля заполнены'
            }
            return JsonResponse(response)

        try:
            response = {
                'success': 'True',
                'message': 'Успешная авторизация',
                'redirect': '/menu'
            }
            return JsonResponse(response)

        except User.DoesNotExist:
            response = {
                'success': 'False',
                'message': 'Пользователь не найден'
            }
            return JsonResponse(response)

        except Exception as error:
            response = {
                'success': 'False',
                'message': f'Ошибка: {error}'
            }
            return JsonResponse(response)

    return redirect('main:index')


def registration(request):
    if request.method == 'POST':
        name = request.POST.get('reg-username').strip()
        email = request.POST.get('reg-email').strip()
        number = request.POST.get('reg-phone').strip()
        password = request.POST.get('reg-password').strip()
        repeat_password = request.POST.get('reg-ex-password').strip()

        if not all([name, email, number, password, repeat_password]):
            response = {
                'success': 'False',
                'message': 'Не все поля заполнены'
            }
            return JsonResponse(response)

        elif password != repeat_password:
            response = {
                'success': 'False',
                'message': 'Пароли не совпадают'
            }
            return JsonResponse(response)

        elif User.objects.filter(username=str(name)).exists():
            response = {
                'success': 'False',
                'message': 'Пользователь уже существует'
            }
            return JsonResponse(response)

        try:
            # Успех
            hashed_password = hashlib.sha256(password.encode()).hexdigest()

            with transaction.atomic():
                user = User.objects.create(
                    name=name,
                    email=email,
                    phone=number,
                )

            response = {
                'success': 'True',
                'message': 'Успешная регистрация',
                'redirect': '/menu'
            }

            return JsonResponse(response)

        except Exception as error:
            response = {
                'success': 'False',
                'message': f'Ошибка: {error}'
            }
            return JsonResponse(response)

    return redirect('main:index')


def create_review(request):
    return render(request, '')
