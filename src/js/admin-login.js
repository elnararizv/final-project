document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.login-form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const button = document.querySelector('button');
    const login = document.querySelector('.admin-login')
    const dashboard = document.querySelector('.admin-dashboard')

    button.addEventListener('click', function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === 'Admin' && password === 'Admin2020') {
            login.style.display = 'none';
            dashboard.style.display = 'block';
        } else {
            alert('Invalid username or password');
        }
    });

    passwordInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click();
        }
    });
});

