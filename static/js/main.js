document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById("start-button");

    const changeToAuth = document.getElementById("change-to-auth");
    const changeToReg = document.getElementById("change-to-reg");

    const closeAuth = document.getElementById("close-auth-button");
    const closeReg = document.getElementById("close-reg-button");

    const authPopup = document.getElementById("auth-popup");
    const regPopup = document.getElementById("reg-popup");

    const regForm = document.getElementById("");
    const authForm = document.getElementById("");

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

    // if (regForm) regForm.addEventListener('submit',);
    // if (authForm) authForm.addEventListener('submit',);


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