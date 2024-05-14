document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.login-form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const button = document.querySelector('button');

    button.addEventListener('click', function(event) {
        event.preventDefault(); 

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === 'Admin' && password === 'Admin2020') {
            window.location.href = 'admin.html';
        } else {
            alert('Invalid username or password');
        }
    });
});
