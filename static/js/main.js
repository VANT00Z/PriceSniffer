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
        notification.style.fontWeight = '600';
        notification.style.animation = 'notFade 1s';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = "notFadeOut 1.2s"
        }, 2500)
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(regForm);
            try {
                const response = await fetch(regForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                const data = await response.json();
                if (data.success === 'False') {
                    showNotification(data.message, true);
                } else {
                    if (response.redirected) {
                        window.location.href = response.url;
                    } else {
                        showNotification('Регистрация успешна', false);
                        window.location.href('/menu');
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