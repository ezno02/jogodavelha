const board = document.getElementById('board')
const statusText = document.getElementById('status')
const tentativas = document.getElementById('tentativas')

let jogoAtivo = true
let jogadas = 0
let jogadorAtual = 'X'
let celulas = Array(9).fill(null)

function reiniciarJogo() {
    // Função de iniciar jogo.
    jogoAtivo = true
    jogadas = 0
    jogadorAtual = 'X'
    statusText.style.color = 'blue'
    celulas = Array(9).fill(null)
    // console.log(statusText);
    statusText.textContent = `turno do jogador X`
    tentativas.textContent = '0'
    // console.log(statusText);
    criarTabuleiro()
}

function criarTabuleiro(win) {
    board.innerHTML = ``
    console.log(win)
    celulas.forEach((celula, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.index = index;
        div.addEventListener('click', clickCelula)
        if (celula) {
            div.textContent = celula
            div.classList.add(celula)
            // div.classList.add(celula.toLowerCase())
            if (win !== undefined) {

                for (let i = 0; i < win.length; i++) {
                    if (index === win[i]){
                        div.classList.add('winnerBoard')
                        // console.log(win)
                    }
                }

            }
        }
        board.appendChild(div);
    });
}

function clickCelula(e) {
    const index = e.target.dataset.index
    // console.log(e)
    // console.log(index)

    jogadas++

    if (celulas[index] || !jogoAtivo) {
        return
    }

    celulas[index] = jogadorAtual
    criarTabuleiro()
    if (verificarVitoria()) {
        // vitoria
        statusText.textContent = `O jogador ${jogadorAtual} venceu!`
        tentativas.textContent = jogadas
        jogoAtivo = false
    } else if (!celulas.includes(null)) {
        // empate
        jogoAtivo = false
        statusText.textContent = `O jogo empatou!`
    } else {
        if (jogadorAtual === 'X') {
            jogadorAtual = 'O'
            statusText.style.color = 'yellow'
        } else {
            jogadorAtual = 'X'
            statusText.style.color = 'blue'
        }
        // jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'
        statusText.textContent = `turno do jogador ${jogadorAtual}.`
        tentativas.textContent = jogadas
    }
}

function verificarVitoria() {
    const combinacoes = [
        // horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonal
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
            // console.log('Vitoria!')
            criarTabuleiro(combinacoes[i])
            return true
        }
    }
    return false
}

// Precisamos retornar combinações pela jogadas;

reiniciarJogo()