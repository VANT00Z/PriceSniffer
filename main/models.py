from django.db import models


class User(models.Model):
    username = models.CharField(max_length=30, null=False, blank=True)
    email = models.EmailField(null=False, blank=True)
    phone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.username

    class Meta():
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        db_table = 'users'
