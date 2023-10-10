//SELETORES PARA COLETAR AS CLASSES DO HTML
const pikachu = document.querySelector('.pikachu');
const pokeball = document.querySelector('.pokeball');
const restartButton = document.querySelector('.restart');

//CÓDIGO DESENVOLVIDO PARA A REALIZAÇÃO DO MECANISMO DE PULO DO POKÉMON, EM QUE IRÁ SER ADICIONADA UMA CLASSE A UMA OUTRA CLASSE, FAZENDO COM QUE ACONTEÇA O PULO
const jump = () => {
    pikachu.classList.add('jump');
    
    //APÓS 500ms, A CLASSE SERÁ REMOVIDA, PARA QUE ASSIM, POSSA SER REALIZADO UM NOVO PULO
    setTimeout(() => {
        pikachu.classList.remove('jump');
    
    }, 500);
}

//CÓDIGO PARA DESATIVAR AS TECLAS ALT E F12
document.addEventListener("keydown", function(press) {
    if (press.key === "Alt" || press.key === "F12") {
        press.preventDefault(); 
    }
  });

//CÓDIGO PARA O POKÉMON REALIZAR A MECÂNICA DE PULO
document.addEventListener('keydown', jump);

const loop = setInterval(() => {
    const colisao = setInterval(() => {
        //CONSTANTES COM O INTUITO DE ARMAZENAR A POSIÇÃO RELATIVA DAS POKEBOLAS EM RELAÇÃO AO LADO ESQUERDO DA TELA
        const pokeballPosition = pokeball.offsetLeft;

        //CONSTANTE COM O INTUITO DE ARMAZENAR A POSIÇÃO RELATIVA DO POKÉMON EM RELAÇÃO À PARTE INFERIOR
        const pikachuPosition = +window.getComputedStyle(pikachu).bottom.replace('px','');

        //ESSA CONDIÇÃO TESTARÁ SE A POKEBOLA ESTÁ A UMA DETERMINADA POSIÇÃO EM RELAÇÃO À ESQUERDA E SE O POKÉMON ESTÁ A UMA DETERMINADA POSIÇÃO EM RELAÇÃO À PARTE INFERIOR DA TELA
        //CASO A POKEBOLA ESTEJA A 510 PIXELS DA ESQUERDA E, SIMULTANEAMENTE, O PIKACHU ESTEJA A MENOS QUE 20 PIXELS DO CHÃO, O JOGO SERÁ INTERROMPIDO
        if ((pokeballPosition >= 510 && pikachuPosition < 20)) {
            //LINHAS DE CÓDIGO CRIADAS COM O OBJETIVO DE PARAR A ANIMAÇÃO DA POKEBOLA E FIXÁ-LA NA POSIÇÃO EM QUE TOCOU NO POKÉMON, VARIANDO CONFORME O TIPO DA POKEBOLA
            pokeball.style.animation = 'none';
            pokeball.style.left = `${pokeballPosition}px`;

            //LINHAS DE CÓDIGO PARA DESATIVAR A ANIMAÇÃO DO POKÉMON E FIXÁ-LO NA POSIÇÃO EM QUE TOCOU NA POKEBOLA
            pikachu.style.animation = 'none';
            pikachu.style.bottom = `${pikachuPosition}px`

            //LINHAS DE CÓDIGO PARA TROCAR O GIF DO POKÉMON CORRENDO PELA IMAGEM DO POKÉMON MORTO E AJUSTAR O TAMANHO DA IMAGEM
            pikachu.src = './Images/pikachuDead.png';
            pikachu.style.width = '85px';
            clearInterval(loop);

            //CÓDIGO PARA TORNAR VISÍVEL O BOTÃO DE REINICIAR O JOGO
            restartButton.style.visibility = 'visible';
        }
    }, 10);
}, 1000);

//CÓDIGO IMPLEMENTADO COM O OBJETIVO DE REINICIAR O JOGO
const restartGame = () =>{
    window.location.reload();
}
