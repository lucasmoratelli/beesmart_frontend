function openNav() {
    var sideNav = document.getElementById("mySidenav");
    if (sideNav.style.left === "0px") {
        sideNav.style.left = "-250px";
        document.getElementsByClassName("content")[0].style.marginLeft = "0";
    } else {
        sideNav.style.left = "0px";
        document.getElementsByClassName("content")[0].style.marginLeft = "250px";
    }
}
function Salvar(){
    // Referências aos elementos do modal
const modal = document.getElementById('modal fade');
const abrirModalBtn = document.getElementById('abrirModalBtn');
const fecharModalBtn = document.getElementById('fecharModalBtn');

// Função para abrir o modal
function abrirModal() {
  modal.style.display = 'block';
}

// Função para fechar o modal
function fecharModal() {
  modal.style.display = 'none';
}

// Adicione um evento de clique para abrir o modal
abrirModalBtn.addEventListener('click', abrirModal);

// Adicione um evento de clique para fechar o modal
fecharModalBtn.addEventListener('click', fecharModal);
}
async function getRotinas() {
    let response = await fetch("https://65120b2ab8c6ce52b3954849.mockapi.io/rotina/rotina")
    let rotinas = await response.json();

    return rotinas;
}

async function deletePessoas(id) {
    let response = await fetch("https://65120b2ab8c6ce52b3954849.mockapi.io/rotina/rotina/" + id,{
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    let rotinaId = await response.json();

    console.log(rotinaId);

    var node = document.getElementById("card"+id);
    if (node.parentNode) {
    node.parentNode.removeChild(node);
    }

    return rotinaId;

}

//Obter valores da API de rotina
getRotinas().then(rotinas => rotinas.forEach(Rotina => {
    //define se a rotina sera criada por temperatura ou Horario
    if(Rotina.se == 0){
        var textoSe = "Temperatura";
        
    }else if(Rotina.se == 1){  
        var textoSe = "Horario";      
    }
    //condicao "< , = , >"
    if(Rotina.condicao == 0){
        var textoCondicao = "Menor";
    }else if(Rotina.condicao == 1){
        var textoCondicao = "Igual";
    }else if(Rotina.condicao == 2){
        var textoCondicao = "Maior";
    }
    //Ritina ligada e desligada
    if(Rotina.liga == true){
        var textoAcao = "Ligar";
        
    }else if(Rotina.liga == false){  
        var textoAcao = "Desligar";      
    }
    var deviceHtml = "<div class='col' id='card"+ Rotina.id +"'><div class='card' style='width: 18rem; color: white; background-color: #005064'><div class='card-body'><h5 class='card-title'>Rotina" + Rotina.id +"</h5><h6 class='card-subtitle'>" + Rotina.aparelho + "</h6><hr><p class='card-text'> Se: <strong>"+ textoSe +"</strong></p><p class='card-text'> Condição: <strong>" + textoCondicao + "</strong></p><p class='card-text'>"+ textoSe +":<strong>" + Rotina.valor + "</strong></p><p class='card-text'> <strong>" + textoAcao + "</strong></p><p class='card-text'> <strong>" + Rotina.aparelho + "</strong></p><button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='deletePessoas("+Rotina.id+")'>Excluir</button></div></div></div>";

    let div = document.getElementById("pai");
    
    div.innerHTML += deviceHtml;
    
}));
document.addEventListener('DOMContentLoaded', function () {
    //seleciona o botao proximo pelo id
    var botaoProximo = document.querySelector('.modal-footer .btn-primary');
    //seleciona o botao pelo id    
    botaoProximo.addEventListener('click', function () {
        //campo texto id
        var nomeRotinaInput = document.getElementById('exampleTextBox');

        // valor campo de texto
        var nomeRotina = nomeRotinaInput.value;

        //imprimindo no console
        console.log('Valor da Rotina:', nomeRotina);
    });
});


