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
    document.getElementById("fundo").style.display = "inline-block"
    document.getElementById("spinner").style.display = "block"

    let response = await fetch("https://65120b2ab8c6ce52b3954849.mockapi.io/rotina/rotina")
    let rotinas = await response.json();
    console.log(rotinas)
    return rotinas;
}

async function deleteRotina() {
    let response = await fetch("https://65120b2ab8c6ce52b3954849.mockapi.io/rotina/rotina/" + idRotinaASerExcluida,{
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    let rotinaId = await response.json();

    console.log(rotinaId);

    var node = document.getElementById("card"+idRotinaASerExcluida);
    if (node.parentNode) {
    node.parentNode.removeChild(node);
    }

    return rotinaId;

}

async function postRotina(type, dispositivo,horario,sensor,acao,nome) {
    let response = await fetch("https://65120b2ab8c6ce52b3954849.mockapi.io/rotina/rotina/",{
        method: "POST",       
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: type,
            name: nome,
            time: horario+":00",
            action: acao,
            sensor: sensor,
            actuator: dispositivo
        })
      });   
    let pessoa = await response.json();
    location.reload();
    return pessoa;
} 

//Obter valores da API de rotina
getRotinas().then(rotinas => rotinas.forEach(Rotina => {
    let textoSe;
    let textoHorario;
    let textoAcao;
    let textoSensor;
    let textoActuator;
    //define se a rotina sera criada por temperatura ou Horario
    if(Rotina.type == 0){
        textoSe = "Quando chegar Certo Horario";
        textoHorario = Rotina.time;
        
    }else if(Rotina.type == 1){  
        textoSe = "Ao Pressionar Interruptor";
        textoHorario = "-";
        textoAcao = "Trocar status";      
    }
    //Rotina ligada e desligada
    if(Rotina.action == 1){
        textoAcao = "Ligar";
        
    }else if(Rotina.action == 0){  
        textoAcao = "Desligar";      
    }

    if(Rotina.type == 0){
        textoSensor = "-"

    }else{
        if(Rotina.sensor == 5){
            textoSensor = "Interruptor 1";   
        }else if(Rotina.sensor == 6){
            textoSensor = "Interruptor 2";   
        }else if(Rotina.sensor == 7){
            textoSensor = "Interruptor 3";   
        }else if(Rotina.sensor == 8){
            textoSensor = "Interruptor 4";   
        }    
    }

    
    if(Rotina.actuator == 1){
        textoActuator = "Luz 1";   
    }else if(Rotina.actuator == 2){
        textoActuator = "Luz 2";   
    }else if(Rotina.actuator == 3){
        textoActuator = "Luz 3";   
    }else if(Rotina.actuator == 4){
        textoActuator = "Tomada 1";   
    }
    var deviceHtml = "<div class='col' id='card"+ Rotina.id +"'><div class='card' style='width: 18rem; color: white; background-color: #005064'><div class='card-body'><h5 class='card-title'>" + Rotina.name +"</h5><h6 class='card-subtitle'>" + textoSe + "</h6><hr><p class='card-text'> Sensor: <strong>"+ textoSensor +"</strong></p><p class='card-text'> Atuador: <strong>" + textoActuator + "</strong></p><p class='card-text'>Horário de atuação: "+ textoHorario +"</p> Ação: <strong>" + textoAcao + "</strong></p><button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='confirmarExclusao("+Rotina.id+") 'data-bs-toggle='modal' data-bs-target='#confirmacaoExclusaoModal'>Excluir</button></div></div></div>";

    let div = document.getElementById("pai");
    
    div.innerHTML += deviceHtml;

    document.getElementById("fundo").style.display = "none"
    document.getElementById("spinner").style.display = "none"
    
}));

let type;
let dispositivo;
let horario;
let sensor;
let acao;
let nome;

document.addEventListener('DOMContentLoaded', function () {
    //seleciona o botao proximo pelo id
    var botaoProximo = document.getElementById('btnNomeProximo');
    //seleciona o botao pelo id    
    botaoProximo.addEventListener('click', function () {
        //campo texto id
        var nomeRotinaInput = document.getElementById('exampleTextBox');

        // valor campo de texto
        nome = nomeRotinaInput.value;

        //imprimindo no console
        console.log('Valor da Rotina:', nome);
    });
    var salvarRotinaHorario = document.getElementById('salvarRotinaHorario');
    //seleciona o botao pelo id    
    salvarRotinaHorario.addEventListener('click', function () {
        //campo texto id
        horario = document.getElementById('selectHorario').value;
        acao = document.getElementById('selectAcao').value;
        dispositivo = document.getElementById('selectDispositivo').value;
        //imprimindo no console
        console.log(horario,acao,dispositivo);
        postRotina(type, dispositivo,horario,sensor,acao,nome);
        
    });
});



    function aoPressionarInterruptor() {
        type = 1;
        console.log('Valor da variavel type:', type);
    }
    document.querySelector('.btn-secondary[data-bs-target="#modal1"]').addEventListener('click', aoPressionarInterruptor);
    
    function quandoChegarCertoHorario() {
        type = 0;
        console.log('Valor da variavel type:', type);
    }

    let idRotinaASerExcluida;

    function confirmarExclusao(id) {
      idRotinaASerExcluida = id;
        console.log('Valor do id', idRotinaASerExcluida);
    }
  
    document.querySelector('.btn-secondary[data-bs-target="#modal2"]').addEventListener('click', quandoChegarCertoHorario);
     
    // Ao Pressionar Interruptor
    function salvarSensorAtuador(){
      sensor = document.getElementById("sensorSelect").value;
      dispositivo = document.getElementById("lightSelect").value;
      console.log(sensor,dispositivo);

      postRotina(type, dispositivo,horario,sensor,acao,nome);
    };

    // Quando Chegar Certo Horario
    document.getElementById("selectHorario").addEventListener("change", function() {
      horario = document.getElementById("selectHorario").value;
      
      console.log("Horário selecionado:", horario);
    });

    document.getElementById("selectDispositivo").addEventListener("change", function() {
      dispositivo = document.getElementById("selectDispositivo").value;
      console.log("Dispositivo selecionado:", dispositivo);
    });

    document.getElementById("selectAcao").addEventListener("change", function() {
      acao = document.getElementById("selectAcao").value;
      console.log("Ação selecionada:", acao);
    });


