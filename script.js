//SELETORES PARA COLETAR AS CLASSES DO HTML
const pikachu = document.querySelector('.pikachu');
const pokeball = document.querySelector('.pokeball');
const ultraball = document.querySelector('.ultraball');
const masterball = document.querySelector('.masterball');
const gameOver = document.querySelector('.gameOver')
const jumpClass = document.querySelector('.jump')
const restartButton = document.querySelector('.restart')

//VARIÁVEL IMPLEMENTADA COM O OBJETIVO DE ARMAZENAR A PONTUAÇÃO OBTIDA PELO JOGADOR AO DECORRER DO TEMPO
let score = 0;

//VARIÁVEL IMPLEMENTADA COM O OBJETIVO DE GUARDAR A INFORMAÇÃO DE SE O JOGO ESTÁ ATIVO/INATIVO, FOI CRIADA POIS FOI A ÚNICA FORMA QUE CONSEGUIMOS DE PARAR A CONTAGEM DO SCORE APÓS O USUÁRIO PERDER
let playing = true;

//CÓDIGO DESENVOLVIDO PARA A REALIZAÇÃO DO MECANISMO DE PULO DO POKÉMON, EM QUE IRÁ SER ADICIONADA UMA CLASSE A UMA OUTRA CLASSE, FAZENDO COM QUE ACONTEÇA O PULO
const jump = () => {
    pikachu.classList.add('jump');
    
    //APÓS 500ms, A CLASSE SERÁ REMOVIDA, PARA QUE ASSIM, POSSA SER REALIZADO UM NOVO PULO
    setTimeout(() => {
        pikachu.classList.remove('jump');
    
    }, 500);
}

//CÓDIGO PRINCIPAL PARA O MECANISMO DO JOGO, NELE ESTÁ ARMAZENADO AS INFORMAÇÕES SOBRE O SCORE, AS POSIÇÕES RELATIVAS ÀS POKEBOLAS, A POSIÇÃO DO PIKACHU, ALÉM DO GERENCIAMENTO DAS ANIMAÇÕES DA TELA DO JOGO
const loop = () => {
    setTimeout(loop, 1000)
    //CÓDIGO EM QUE SERÁ GERADA A PONTUAÇÃO A SER VISUALIZADA NO CANTO SUPERIOR DIREITO DA TELA DO JOGO
    const scoreCounter = () => {
        if (playing) {
            score += 1;
            gameOver.innerHTML = 'Score: ' + score;
            setTimeout(scoreCounter, 15000);
        }
    }
    scoreCounter();

    const collision = () => {
        setTimeout(collision, 10)
        //CONSTANTES COM O INTUITO DE ARMAZENAR A POSIÇÃO RELATIVA DAS POKEBOLAS EM RELAÇÃO AO LADO ESQUERDO DA TELA
        const pokeballPosition = pokeball.offsetLeft;
        const ultraballPosition = ultraball.offsetLeft;
        const masterballPosition = masterball.offsetLeft;

        //CONSTANTE COM O INTUITO DE ARMAZENAR A POSIÇÃO RELATIVA DO POKÉMON EM RELAÇÃO À PARTE INFERIOR
        const pikachuPosition = +window.getComputedStyle(pikachu).bottom.replace('px','');

        //ESSA CONDIÇÃO TESTARÁ SE A POKEBOLA ESTÁ A UMA DETERMINADA POSIÇÃO EM RELAÇÃO À ESQUERDA E SE O POKÉMON ESTÁ A UMA DETERMINADA POSIÇÃO EM RELAÇÃO À PARTE INFERIOR DA TELA
        //CASO A POKEBOLA ESTEJA A 510 PIXELS DA ESQUERDA E, SIMULTANEAMENTE, O PIKACHU ESTEJA A MENOS QUE 20 PIXELS DO CHÃO, O JOGO SERÁ INTERROMPIDO
        if ((pokeballPosition >= 510 && pikachuPosition < 20) || (ultraballPosition >= 514 && pikachuPosition < 20) || (masterballPosition >= 514 && pikachuPosition < 20)) {
            //LINHAS DE CÓDIGO CRIADAS COM O OBJETIVO DE PARAR A ANIMAÇÃO DA POKEBOLA E FIXÁ-LA NA POSIÇÃO EM QUE TOCOU NO POKÉMON, VARIANDO CONFORME O TIPO DA POKEBOLA
            pokeball.style.animation = 'none';
            pokeball.style.left = `${pokeballPosition}px`;
            ultraball.style.animation = 'none';
            ultraball.style.left = `${ultraballPosition}px`;
            masterball.style.animation = 'none';
            masterball.style.left = `${masterballPosition}px`;

            //LINHAS DE CÓDIGO PARA DESATIVAR A ANIMAÇÃO DO POKÉMON E FIXÁ-LO NA POSIÇÃO EM QUE TOCOU NA POKEBOLA
            pikachu.style.animation = 'none';
            pikachu.style.bottom = `${pikachuPosition}px`

            //LINHAS DE CÓDIGO PARA TROCAR O GIF DO POKÉMON CORRENDO PELA IMAGEM DO POKÉMON MORTO E AJUSTAR O TAMANHO DA IMAGEM
            pikachu.src = './Images/pikachuDead.png';
            pikachu.style.width = '85px';
        
            //CÓDIGO PARA TORNAR VISÍVEL O BOTÃO DE REINICIAR O JOGO
            restartButton.style.visibility = 'visible';

            playing = false;

            clearTimeout(loop);
            clearTimeout(scoreCounter);
        } else if(score > 10 && score < 30){
            //LINHAS DE CÓDIGO COM O OBJETIVO DE DESATIVAR A POKEBOLA ATUAL E SUBSTUIR PELA SUBSEQUENTE
            pokeball.style.animation = 'none';
            pokeball.style.visibility = 'hidden';
            ultraball.style.animation = 'turn 1s linear infinite';
            ultraball.style.visibility = 'visible';
        } else if(score > 30){
            //LINHAS DE CÓDIGO COM O OBJETIVO DE DESATIVAR A POKEBOLA ATUAL E SUBSTUIR PELA SUBSEQUENTE
            ultraball.style.animation = 'none';
            ultraball.style.visibility = 'hidden';
            masterball.style.animation = 'turn 0.7s linear infinite';
            masterball.style.visibility = 'visible';
        }
    };
    collision();
}
loop();

//CÓDIGO IMPLEMENTADO COM O OBJETIVO DE REINICIAR O JOGO
const restartGame = () =>{
    window.location.reload();
}

//CÓDIGO PARA DESATIVAR AS TECLAS ALT E F12
document.addEventListener("keydown", function(press) {
    if (press.key === "Alt" || press.key === "F12") {
        press.preventDefault(); 
    }
  });

//CÓDIGO PARA O POKÉMON REALIZAR A MECÂNICA DE PULO
document.addEventListener('keydown', jump);

//CASO SEJA APERTADO O "F5" VOLTA PARA A TELA DA CAPA DO JOGO
document.addEventListener('keydown', function(press){
    if (press.key === "F5"){
        window.location.href = "index.html"
    }
})

//FUNÇAO PARA SAIR DA CAPA DO JOGO E IR PARA O JOGO
function start(){ 
    window.location.href = "game.html";
}
