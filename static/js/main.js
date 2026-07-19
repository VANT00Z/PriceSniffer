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

    const csrfToken = document.querySelector('meta[name="csrf_token"]')?.getAttribute('content')
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
            const formBody = new FormData();

            const name = formData.get('reg-username');
            const email = formData.get('reg-email');
            const phone = formData.get('reg-phone');
            const password = formData.get('reg-password');
            const exPassword = formData.get('reg-ex-password');

            if (!name || !email || !phone || !password || !exPassword) {
                showNotification('Необходимо заполнить все поля', true);
                return;
            }

            if (password !== exPassword) {
                showNotification('Пароли не совпадают', true);
                return;
            }

            formBody.append('reg-username', name);
            formBody.append('reg-email', email);
            formBody.append('reg-phone', phone);
            formBody.append('reg-password', password);
            formBody.append('reg-ex-password', exPassword);

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'X-Csrftoken': csrfToken,
                        'Accept': 'application/json'
                    },
                    body: formBody
                });

                const contentType = response.headers.get('content-type');

                if (!response.ok || !contentType) {
                    console.log(response, " - ", response.headers)
                    showError("Uncorrect response (Error)");
                }

                else if (!contentType.includes("application/json")) {
                    showError("Uncorrect response (not JSON)");
                }

                const data = await response.json();
                if (data.success === false) {
                    showNotification(data.message, true);
                }
                else if (data.success === true) {
                    showNotification(data.message, false);
                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 1500);
                }
            }

            catch (error) {
                showError(error);
                return;
            }
        })
    }

    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(authForm);
            const formBody = new FormData();

            const email = formData.get('auth-username');
            const password = formData.get('auth-password');

            formBody.append('auth-username', email);
            formBody.append('auth-password', password);

            if (!email || !password) {
                showNotification('Необходимо заполнить все поля', true);
                return;
            }

            try {
                const response = await fetch('/authorization', {
                    method: 'POST',
                    headers: {
                        'X-Csrftoken': csrfToken,
                        'Accept': 'application/json'
                    },
                    body: formBody
                });

                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }

                const data = await response.json();

                if (data.success === false) {
                    showNotification(data.message, true);
                }

                if (data.success === true) {
                    showNotification(data.message, false)
                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 1500);
                }
            }

            catch (error) {
                showError(error);
                return;
            }
        })
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
    if (startButton) {
        startButton.addEventListener('click', function (event) {
            event.preventDefault();
            showRegPopup();
        });
    }

    if (changeToAuth) {
        changeToAuth.addEventListener('click', function (event) {
            changePopups();
            event.preventDefault();
        });
    }

    if (changeToReg) {
        changeToReg.addEventListener('click', function (event) {
            event.preventDefault();
            changePopups();
        });
    }

    if (closeAuth) {
        closeAuth.addEventListener('click', function (event) {
            event.preventDefault();
            closePopups();
        });
    }

    if (closeReg) {
        closeReg.addEventListener('click', function (event) {
            event.preventDefault();
            closePopups();
        });
    }

    if (authPopup) {
        authPopup.addEventListener('click', function (event) {
            if (event.target === authPopup) {
                closePopups();
            }
        });
    }

    if (regPopup) {
        regPopup.addEventListener('click', function (event) {
            if (event.target === regPopup) {
                closePopups();
            }
        });
    }

    // Demonstration funtions
    function sendLogToServer(message) {
        fetch('/server_log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ 'log_message': message })
        });
    }

    function showError(error) {
        console.warn("Ошибка сервера или сети:", error);
        alert("Произошла ошибка");
    }

})