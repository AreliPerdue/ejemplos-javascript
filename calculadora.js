//alert("hola mundo"); /*sirve para poner un mensaje pop-up cuando se abre la pagina*/

function Mostrar () {
    let numero1 = parseInt(document.getElementById("numero1").value);
    let numero2 = parseInt(document.getElementById("numero2").value);

    let resultado = 0;
    
    resultado = numero1 + numero2;

    let objResultado= document.getElementById("resultado");
    objResultado.innerHTML = resultado;


}