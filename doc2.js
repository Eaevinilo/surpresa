// Função para enviar a nota e o comentário
function submitRating() {
    // Obter o nome do usuário
    const name = document.getElementById('name').value.trim();

    // Obter o comentário do textarea
    const commentText = document.getElementById('comment').value.trim();

    // Obter a nota selecionada
    const ratingInputs = document.getElementsByName('rating');
    let ratingValue = null;
    for (const input of ratingInputs) {
        if (input.checked) {
            ratingValue = input.value;
            break;
        }
    }

    if (ratingValue === null) {
        alert('Por favor, selecione uma nota.');
        return;
    }

    if (commentText === '') {
        alert('Por favor, digite um comentário.');
        return;
    }

    if (name === '') {
        alert('Por favor, digite seu nome.');
        return;
    }

    // Recuperar os comentários existentes do localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Adicionar o novo comentário, nota e nome
    comments.push({ name: name, rating: ratingValue, comment: commentText });

    // Salvar os comentários atualizados no localStorage
    localStorage.setItem('comments', JSON.stringify(comments));

    // Limpar os campos de entrada
    document.getElementById('comment').value = '';
    document.getElementById('name').value = '';
    document.querySelector('input[name="rating"]:checked').checked = false;

    // Mostrar o resultado
    document.getElementById('result').textContent = 'Comentário enviado com sucesso!';
}

// Função para mostrar os comentários armazenados
function showComments() {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; // Limpar os comentários existentes

    // Recuperar os comentários do localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Adicionar cada comentário à lista
    comments.forEach((commentObj, index) => {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.innerHTML = `
            <p><strong>Nome:</strong> ${commentObj.name}</p>
            <p><strong>Nota:</strong> ${commentObj.rating} estrelas</p>
            <p><strong>Comentário:</strong> ${commentObj.comment}</p>
        `;

        // Adicionar botão de exclusão
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteComment(index);
        commentItem.appendChild(deleteButton);

        commentsContainer.appendChild(commentItem);
    });
}

// Função para excluir um comentário
function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.splice(index, 1); // Remover o comentário selecionado

    // Salvar a lista atualizada no localStorage
    localStorage.setItem('comments', JSON.stringify(comments));

    // Atualizar a lista de comentários exibida
    showComments();
}

// Exibir os comentários ao carregar a página
window.onload = showComments;

