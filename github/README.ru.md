# PriceSniffer

<b>[English](README.eng.md)</b> | <b style='text-decoration: underline;' >Русский</b>

Веб-сервис для поиска и сравнения выгоды и цен.

# Описание

PriceSniffer - это веб-сервис позволяющий любому пользователю найти один товар на разных маркетплейсах, выгодную стоимость этого товара.

# Технологии

### Используемые технологии

- Django
- HTML5
- CSS3
- JavaScript
- async develop

### База данных

- SQLite

# Разработчикам

## Установка и запуск

### Требования

- Python 3.8+
- pip

### Установка зависимостей

```bash
pip install django
```
*при использовании окружения (Рекомендуется)*

```bash
.venv/Scripts/pip.exe install django
```

### Запуск

1. Создание миграций:

```bash
python manage.py makemigrations
```

2. Применение миграций:

```bash
python manage.py migrate
```

3. Запуск тестового сервера:

```bash
python manage.py runserver
```
### Открытие сайта

После запуска тестового сервера, вы можете открыть сайт по адресу: 
```
http://127.0.0.1:8000/
```
*Если вы не меняли настройки django ([settings.py](/config/settings.py))*

# Разработчики

- Backend developer - [huh/VANT00Z](https://github.com/VANT00Z)
- Frontend developer - [huh/VANT00Z](https://github.com/VANT00Z)

# Licence

Distributed under the [Apache License 2.0](LICENCE).