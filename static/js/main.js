document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById("start-button");

    const changeToAuth = document.getElementById("change-to-auth");
    const changeToReg = document.getElementById("change-to-reg");

    const closeAuth = document.getElementById("close-auth-button");
    const closeReg = document.getElementById("close-reg-button");

    const authPopup = document.getElementById("auth-popup");
    const regPopup = document.getElementById("reg-popup");

    const regForm = document.getElementById("reg-form");
    const authForm = document.getElementById("auth-form");

    let isReg = true;


    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px 20px';
        notification.style.backgroundColor = isError ? '#ff4444' : '#4CAF50';
        notification.style.color = 'white';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '10000';
        notification.style.fontSize = '14px';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            // 1. Отменяем стандартную перезагрузку страницы при отправке формы
            e.preventDefault();

            // 2. Собираем все данные из полей формы
            const formData = new FormData(regForm);

            try {
                // 3. Отправляем асинхронный POST-запрос на URL, указанный в action формы
                const response = await fetch(regForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        // Django требует этот заголовок для защиты от CSRF при AJAX-запросах
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                // 4. Ловим и декодируем JSON-ответ от Django
                const data = await response.json();

                // 5. Обрабатываем результат (свойства success и message из вашего views.py)
                if (data.success === 'False') {
                    // Выводим ошибку пользователю (можно заменить на красивый alert или текст на экране)
                    alert(`Ошибка регистрации: ${data.message}`);
                } else {
                    // Если всё успешно (например, если Django вернул redirect)
                    // Проверяем, прислал ли сервер URL для перенаправления
                    if (response.redirected) {
                        window.location.href = response.url;
                    } else {
                        alert('Регистрация успешна!');
                        window.location.href('/menu'); // или перенаправление вручную
                    }
                }

            }
            catch (error) {
                console.warn("Ошибка сервера или сети:", error);
                alert("Произошла ошибка")
            }
        })
    }

    if (authForm) {
        console.log('Форма авторизации найдена')
    }


    function showRegPopup() {
        regPopup.style.display = 'flex';
        isReg = true;
    }

    function showAuthPopup() {
        authPopup.style.display = 'flex';
        isReg = false
    }

    function closePopups() {
        regPopup.style.display = 'none';
        authPopup.style.display = 'none';
    }

    function changePopups() {
        if (isReg === true) {
            closePopups();
            showAuthPopup();
            isReg = false;
        }
        else {
            closePopups();
            showRegPopup();
            isReg = true;
        }
    }

    startButton.addEventListener('click', function (event) {
        event.preventDefault();
        showRegPopup();
    });

    changeToAuth.addEventListener('click', function (event) {
        event.preventDefault();
        changePopups();
    });

    changeToReg.addEventListener('click', function (event) {
        event.preventDefault();
        changePopups();
    });

    closeAuth.addEventListener('click', function (event) {
        event.preventDefault();
        closePopups();
    });

    closeReg.addEventListener('click', function (event) {
        event.preventDefault();
        closePopups();
    });

    authPopup.addEventListener('click', function (event) {
        if (event.target === authPopup) {
            closePopups();
        }
    });

    regPopup.addEventListener('click', function (event) {
        if (event.target === regPopup) {
            closePopups();
        }
    });
})