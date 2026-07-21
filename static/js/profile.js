document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout_button');

    const csrfToken = document.querySelector('meta[name="csrf_token"]')?.getAttribute('content')

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

    logoutButton.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/logout', {
                method: 'GET',
                headers: {
                    'X-Csrftoken': csrfToken,
                    'Accept': 'application/json'
                },
            });
            if (!response.ok) {
                showNotification('Ошибка сервера', true);
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
            showNotification('Произошла ошибка', true)
            return;
        }
    });
})