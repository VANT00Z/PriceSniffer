from django.db import models


class User(models.Model):
    username = models.CharField(max_length=30, null=False, blank=True)
    email = models.EmailField(null=False, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    password = models.CharField(max_length=128, null=True, blank=True)

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
