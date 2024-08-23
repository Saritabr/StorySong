// Função para submeter o formulário e gerar a história
async function submitForm() {
    const ingredientInputs = document.getElementsByClassName('musica');
    const carregar = document.getElementById('carregar');
    carregar.style.display = "block";
    const musicas = [];

    for (let i = 0; i < ingredientInputs.length; i++) {
        if (ingredientInputs[i].value) {
            musicas.push(ingredientInputs[i].value);
        }
    }

    if (musicas.length < 1) {
        alert('Por favor, preencha pelo menos um campo!');
        return;
    }

    const data = {
        musica: musicas // Passa as músicas como uma única string separada por quebras de linha
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/musicas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        const responseDiv = document.getElementById('response');

        if (result && !result.Erro) {
            carregar.style.display = "none";
            const musica = result.join('');
            responseDiv.innerHTML = musica; // Exibe a resposta formatada em HTML
        } else {
            carregar.style.display = "none";
            responseDiv.innerHTML = `<p>Erro: Tente novamente </p>`;
            console.error(result.Erro)
        }

        responseDiv.style.display = 'block';
    } catch (error) {
        const responseDiv = document.getElementById('response');
        responseDiv.innerHTML = `<p>Erro: ${error.message}</p>`;
        responseDiv.style.display = 'block';
    }
}

