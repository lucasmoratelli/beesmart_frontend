async function getToggle(deviceId) {
    let response = await fetch("http://192.168.41.76:8080/toggle/" + deviceId,);
    //let response = await fetch("http://localhost:8080/toggle/" + deviceId,);
    let deviceStatus = await response.json();

    console.log(deviceStatus);
    if(deviceStatus){
        document.getElementById("btn" + deviceId).style.backgroundColor = "#2980b9"
    }else{
        document.getElementById("btn" + deviceId).style.backgroundColor = "#005064"
    }
    return deviceStatus;
}


//Get Devices Funcion
async function getDevices() {

    document.getElementById("fundo").style.display = "inline-block"
    document.getElementById("spinner").style.display = "block"

    let response = await fetch("http://192.168.41.76:8080/actuator/");
    //let response = await fetch("http://localhost:8080/actuator/");
    let devices = await response.json();
    

    console.log(devices);

    return devices;
}

//Get Devices and print on screen
getDevices().then(devices => devices.forEach(Device => {

    if(Device.type == 0) {
        var deviceHtml = "<div class='col'><button id= 'btn" + Device.id + "' class='on-off-btn' onclick = toggle(" + Device.id + ")>" + Device.name + "</button></div>"
    } else if(Device.type == 1) {
        var deviceHtml = "<div class='col'><button id= 'btn" + Device.id + "' class='on-off-btn' data-bs-toggle='modal' data-bs-target='#modal" + Device.gpio + "'>" + Device.name + "</button></div><div class='modal fade' style='background-color: rgba(0, 79, 99, 0.3)' id='modal" + Device.gpio + "' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'><div class='modal-dialog modal-sm'><div style='background-color:#16242c;' class='modal-content'><div class='modal-header'><h1 class='modal-title fs-5' id='staticBackdropLabel'>" + Device.name + "</h1><button type='button' class='btn-close' style='background-color: red' data-bs-dismiss='modal' aria-label='Close'></button></div><div class='modal-body'><div class='row justify-content-md-center'><div class='col-md-auto'><div class='btn-group' role='group' aria-label='Basic radio toggle button group'><input type='radio' class='btn-check' name='" + Device.gpio + "' id='" + Device.gpio + "On' autocomplete='off'><label class='btn btn-outline-primary' for='" + Device.gpio + "On'>On</label><input type='radio' class='btn-check' name='" + Device.gpio + "' id='" + Device.gpio + "Off' autocomplete='off'><label class='btn btn-outline-primary' for='" + Device.gpio + "Off'>Off</label></div></div><br><div class='row justify-content-md-center' style='margin-top: 10px'><div class='col-md-auto'><div class='ac-display-div'><input type='number' min='16' max='35' class='ac-display' id='input" + Device.gpio + "' value='" + Device.temperature + "' >°C</div><div class='row justify-content-md-center' style='margin-top: 10px'><div class='col-md-auto'><div class='btn-group' role='group'><button type='button' class='btn btn-primary' id='decrease' onclick='decreaseValue(\"input" + Device.gpio + "\")'>-</button><button type='button' class='btn btn-primary' id='increase' onclick='increaseValue(\"input" + Device.gpio + "\")'>+</button></div></div></div></div></div></div></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button><button type='button' id='btnSave"+Device.gpio+"' class='btn btn-primary' onclick='saveStatus(" + Device.gpio + ", \"" + Device.type + "\")' data-bs-dismiss='modal'>Salvar</button></div></div></div></div>"
    }
    
    let div = document.getElementById("parent-div");
    div.innerHTML += deviceHtml;

}));

//Get Status of Devices
getDevices().then(devices => devices.forEach(Devices => {
    if(Devices.status){
        document.getElementById("btn" + Devices.id).style.backgroundColor = "#2980b9"
    }else{
        document.getElementById("btn" + Devices.id).style.backgroundColor = "#005064"
    }
    document.getElementById("fundo").style.display = "none"
    document.getElementById("spinner").style.display = "none"
}));

function toggle(id) {

    let deviceStatus = getToggle(id);
    console.log(deviceStatus);
    
};

function increaseValue(inputId) {
    var value = parseInt(document.getElementById(inputId).value);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById(inputId).value = value;
  }
  
function decreaseValue(inputId) {
    var value = parseInt(document.getElementById(inputId).value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById(inputId).value = value;
  }
