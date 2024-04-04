const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarPausar = document.querySelector('#start-pause');
const botaoIniciarOuPausar = document.querySelector('#start-pause span');
const iconeIniciarOuPausar = document.querySelector('.app__card-primary-butto-icon');
const temporizador = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somIniciar = new Audio('/sons/play.wav');
const somPausar = new Audio('/sons/pause.mp3');
const somFimDoTempo = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

botaoFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    botaoFoco.classList.add("active");
});

botaoDescansoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    botaoDescansoCurto.classList.add("active");
});

botaoDescansoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    botaoDescansoLongo.classList.add("active");
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove("active");
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        somFimDoTempo.play()
        alert('Tempo Finalizado');
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

iniciarPausar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        somPausar.play();
        zerar();
        return
    }
    somIniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    botaoIniciarOuPausar.textContent = "Pausar";
    iconeIniciarOuPausar.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
    clearInterval(intervaloId);
    botaoIniciarOuPausar.textContent = "Começar";
    iconeIniciarOuPausar.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTempo()