const board = document.getElementById('board')
const statusText = document.getElementById('status')

let jogoAtivo = true
let jogadorAtual = 'X'
let celulas = Array(9).fill(null)

function reiniciarJogo() {
    // Função de iniciar jogo.
    jogoAtivo = true
    jogadorAtual = 'X'
    celulas = Array(9).fill(null)
    // console.log(statusText);
    statusText.textContent = `turno do jogador X`
    // console.log(statusText);
    criarTabuleiro()
}

function criarTabuleiro() {
    board.innerHTML = ``
    celulas.forEach((celula, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.index = index;
        div.addEventListener('click', clickCelula)
        if (celula) {
            div.textContent = celula
            div.classList.add(celula)
            div.classList.add(celula.toLowerCase())
        }
        board.appendChild(div);
    });
}

function clickCelula(e) {
    const index = e.target.dataset.index
    // console.log(e)
    // console.log(index)

    if (celulas[index] || !jogoAtivo) {
        return
    }

    celulas[index] = jogadorAtual
    criarTabuleiro()
    if (verificarVitoria()) {
        // vitoria
        statusText.textContent = `O jogador ${jogadorAtual} venceu!`
        jogoAtivo = false
    } else if (!celulas.includes(null)) {
        // empate
        jogoAtivo = false
        statusText.textContent = `O jogo empatou!`
    } else {
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'
        statusText.textContent = `turno do jogador ${jogadorAtual}`
    }
}

function verificarVitoria() {
    const combinacoes = [
        // horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // vertical
        [2, 5, 8],
        [0, 3, 6],
        [1, 4, 7],

        [0, 4, 8],
        [2, 4, 6],
    ]
    // console.log(celulas)
    for (let i = 0; i < combinacoes.length; i++) {
        const [a, b, c] = combinacoes[i]
        // console.log(a, b, c)
        const valorA = celulas[a]
        const valorB = celulas[b]
        const valorC = celulas[c]
        // console.log(valorA, valorB, valorC)
        if (valorA && valorA === valorB && valorA === valorC) {
            console.log('Vitoria!')
            return true
        }
        // console.log(combinacoes[i])
        // for(let j = 0; j < combinacoes[i].length; j++){
        // console.log(combinacoes[i][j])
        //}
    }
    return false
}
// Precisamos retornar combinações pela jogadas;

reiniciarJogo()