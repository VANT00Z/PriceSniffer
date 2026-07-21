from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import User, Review
from logging import getLogger

import json
import hashlib

from django.db import transaction

""" Main """


def index(request):
    if request.session.get('user_id'):
        return redirect('main:menu')
    else:
        return render(request, 'main/index.html')


def mainMenu(request):
    if request.session.get('user_id'):
        return render(request, 'main/menu.html')
    else:
        return redirect('main:index')


""" Buttons """


def profile(request):
    if request.session.get('user_id'):
        user = request.session.get('username')
        return render(request, 'main/profile.html', {'UserName': user})
    else:
        return redirect('main:menu')


def contacts(request):
    return render(request, 'main/contacts.html')


def reviews(request):
    with open('static/json/reviews.json', 'r', encoding='utf-8') as json_file:
        reviews = json.load(json_file)
    return render(request, 'main/reviews.html', {'reviews': reviews})


def link(request):
    return render(request, 'main/link.html')


def authors(request):
    return render(request, 'main/authors.html')

def donate(request):
    return render(request, 'main/donate.html')


""" Functions """


def authorization(request):
    if request.method == 'POST':
        name = request.POST.get('auth-username').strip()
        password = request.POST.get('auth-password').strip()

        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        if not all([name, password]):
            response = {
                'success': False,
                'message': 'Не все поля заполнены'
            }

            return JsonResponse(response)

        try:
            user = User.objects.get(username=name, password=hashed_password)

            request.session['user_id'] = user.id
            request.session['username'] = user.username

            response = {
                'success': True,
                'message': 'Успешная авторизация',
                'redirect': '/menu'
            }

            return JsonResponse(response)

        except User.DoesNotExist:
            response = {
                'success': False,
                'message': 'Пользователь не найден'
            }
            return JsonResponse(response)

        except Exception as error:
            response = {
                'success': False,
                'message': error
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
                'success': False,
                'message': 'Не все поля заполнены'
            }
            return JsonResponse(response)

        if password != repeat_password:
            response = {
                'success': False,
                'message': 'Пароли не совпадают'
            }
            return JsonResponse(response)

        if User.objects.filter(username=str(name)).exists():
            response = {
                'success': False,
                'message': 'Пользователь уже существует'
            }
            return JsonResponse(response)

        try:
            hashed_password = hashlib.sha256(password.encode()).hexdigest()

            with transaction.atomic():
                user = User.objects.create(
                    username=name,
                    email=email,
                    phone=number,
                    password=hashed_password,
                )

                request.session['user_id'] = user.id
                request.session['username'] = user.username

            response = {
                'success': True,
                'message': 'Успешная регистрация',
                'redirect': '/menu'
            }

            return JsonResponse(response)

        except Exception as error:
            response = {
                'success': False,
                'message': f'Ошибка: {error}'
            }
            return JsonResponse(response)

    return redirect('main:index')


def logout_user(request):
    try:
        request.session.flush()
        response = {
            'success': True,
            'message': 'Выход из аккаунта',
            'redirect': '/'
        }

        return JsonResponse(response)

    except Exception as error:
        response = {
            'success': False,
            'message': error
        }

        return JsonResponse(response)


def delete_account(request):
    # Удаление аккаунта
    return redirect('main:index')


def create_review(request):
    return redirect('main:reviews')


""" Admin funcs """


def moderatorView(request):
    response = {
        'success': False,
        'message': 'Now unwork',
        'redirect': '/'
    }
    return JsonResponse(response)


def getVisits(request):
    return


""" Cookie """


def set_Cookie(request):
    user_id = request.session.get('user_id')
    return redirect('main:index')


def checkCookie(request):
    return redirect('main:index')


logger = getLogger(__name__)


@csrf_exempt
def sendLog(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            log_message = data.get('log_message')

            logger.info(f"Лог из JS: {log_message}")

            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
