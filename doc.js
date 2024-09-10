document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (username === 'Vini05' && password === 'Senha') {
        message.textContent = 'Login bem-sucedido!';
        message.style.color = 'green';
        window.open('doc2.html')
    } else {
        message.textContent = 'Usuário ou senha inválidos!';
        message.style.color = 'red';
    }
});