from django.db import models
from django.contrib.auth.models import AbstractBaseUser


class User(models.Model):
    username = models.CharField(max_length=30, null=False, blank=True)
    email = models.EmailField(null=False, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    password = models.CharField(max_length=128, null=True, blank=True)
    last_login = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    class Meta():
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        db_table = 'users'

    def __str__(self):
        return self.username


class Review(models.Model):
    creator = models.CharField(max_length=30, null=False, blank=True)
    description = models.TextField(null=False, blank=True)
    stars = models.IntegerField(null=True, blank=False)

    class Meta():
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
        db_table = 'reviews'

    def __str__(self):
        return f"{self.creator}: {self.description}"
