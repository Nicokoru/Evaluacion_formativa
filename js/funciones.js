 function imagen1(){         
            document.getElementById("img1").src="../img/perrito1.jpg";
        }
        function imagen2(){
            document.getElementById("img1").src="../img/perrito2.jpg";
        }
function sumar(){
    let num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);
    let resultado = num1 + num2;
    document.getElementById("resultado").innerText = "El resultado de la suma es: " + resultado;
}
function restar(){
    let  num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);
    let resultado = num1 - num2;
    document.getElementById("resultado").innerText = "El resultado de la resta es: " + resultado;
}
function multiplicar(){
    let num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);
    let resultado = num1 * num2;
    document.getElementById("resultado").innerText = "El resultado de la multiplicación es: " + resultado;
}   
function dividir(){
    let num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);
    if(num2 === 0){
        document.getElementById("resultado").innerText = "Error: No se puede dividir entre cero.";
    } else {
        let resultado = num1 / num2;
        document.getElementById("resultado").innerText = "El resultado de la división es: " + resultado;
        } 
function limpiar(){
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("resultado").innerText = "";
}
}