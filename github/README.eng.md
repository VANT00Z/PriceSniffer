# PriceSniffer

<b style='text-decoration: underline;'>English</b> | <b>[Русский](README.ru.md)</b>

Web service for finding and comparing deals and prices.

# Description

PriceSniffer is a web service that allows any user to find a single product across different marketplaces and identify the best price for it.

# Technologies

### Technologies used

- Django
- HTML5
- CSS3
- JavaScript
- async develop

### Database

- SQLite

# For Developers

## Installation and Launch

### Requirements

- Python 3.8+
- pip

### Installing dependencies

```bash
pip install django
```
*when using a virtual environment (Recommended)*

```bash
.venv/Scripts/pip.exe install django
```

### Launch

1. Creating migrations:

```bash
python manage.py makemigrations
```

2. Applying migrations:

```bash
python manage.py migrate
```

3. Starting the test server:

```bash
python manage.py runserver
```
### Opening the site

After starting the test server, you can open the site at:

```
http://127.0.0.1:8000/
```
*If you haven't changed the django settings ([settings.py](/config/settings.py))*

# Developers

- Backend developer - [huh/VANT00Z](https://github.com/VANT00Z)
- Frontend developer - [huh/VANT00Z](https://github.com/VANT00Z)

# Licence

Distributed under the [Apache License 2.0](LICENSE).