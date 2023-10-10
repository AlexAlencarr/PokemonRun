//SELETORES PARA COLETAR AS CLASSES DO HTML
const pikachu = document.querySelector('.pikachu');

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