let arrayArticles = []
let subtotaltotal = 0;
let comissionPercentage = 0;
let costoEnvio = 0;

// Se crea función que clasifica los subtotales según currency para que de esa manera que el valor en una única moneda en este caso son pesos uruguayos
function clasificacionSubTotales(count, index) {
  let sub = 0; //Se crea la variable sub con valor unicial 0
  if (arrayArticles[index].currency === "USD") { //Este if tiene como condicion si currency es dólares va a tomar la cantidad de artículos y el valor unitario los multiplica, a ese valor posteriormente es multiplicado por 40 para hacer la conversion a pesos uruguayos
    sub = arrayArticles[index].unitCost * count * 40;
  } else {//Si esta en pesos multiplica el costo unitario por la cantidad de artículos
    sub = arrayArticles[index].unitCost * count;
  }
  return sub; //Luego devuelve el valor de la variable siempre en pesos uruguayos

}
//Función que engloba todos los subtotales
function actualizaTodosSubTotales() {
  let subtotal = 0; //Se crea la variable subtotal con valor unicial 0
  let countArray = document.getElementsByClassName("countArticle");//Se crea la variable countArray donde se encuentran todos los elementos con la clase "countArticle"
  for (let i = 0; i < countArray.length; i++) {// Se crea un for para que recorra los elementos de countArray
    subtotal += clasificacionSubTotales(countArray[i].value, i);//Se agregan a la variable subtotal los valores que fueron arrojados por la función clasificacionSubTotales se le pasa como parametros countArray[i].value,i 
  };
  document.getElementById("subtotal").innerHTML = "UYU " + subtotal;// Se muesta el valor correspondiente en el html
  subtotaltotal = subtotal; // Se crea una variable que toma ese valor de subtotal 

}
function costoDeEnvio() {
  let costEnvio = subtotaltotal * comissionPercentage

  document.getElementById("envio").innerHTML = "UYU " + costEnvio;
  costoEnvio = costEnvio
}
//Función que muestra el total
function calcTotal() {

  let total = subtotaltotal + costoEnvio // En este caso la suma de los Subtolates es igual al total 

  document.getElementById("total").innerHTML = "UYU " + total;

}
//Función que engloba a los addEvenListener
function addEventCount() {
  let subtotalArray = document.getElementsByClassName("countArticle");//Se crea la variable subtotalArray donde se encuentran todos los elementos con la clase "countArticle
  for (let i = 0; i < subtotalArray.length; i++) {// Se crea un for para que recorra los elementos de subtotalArray
    subtotalArray[i].addEventListener("change", function () {//Cuando el valor de subtotalArray[i] es modificado se ejecuta la función que toma los elementos con id "productSubtotal-" se muestra currency, se multiplica el costo unitario por la nueva cantidad de elementos.
      document.getElementById("productSubtotal-" + i).innerHTML = arrayArticles[i].currency + " " +
        subtotalArray[i].value * arrayArticles[i].unitCost;
      actualizaTodosSubTotales();//Se ejecutan las funciónes actualizaTodosSubTotales y calcTotal
      calcTotal();
      costoDeEnvio();
    });

  }


}
//Se crea funcion que tome los elementos del array y los muestre en el html

function ShowCartProducts(articles) {
  let html = "";

  for (let i = 0; i < articles.length; i++) {//For que recorre todos los elementos del JSON

    poductUnitCost = articles[i].unitCost;
    poductCurrency = articles[i].currency;

    html += `
        <tr class="col-md-9">
        <td><img src= ${articles[i].src} width="100px"></td>
        <td>${articles[i].name}</td>
        <td>${articles[i].currency} ${articles[i].unitCost}</td>
        <td><input class="form-control countArticle" style="width:60px;" type="number" id="productCount" value=${articles[i].count} min="1"></td>
        <td><span id="productSubtotal-${[i]}" style="font-weight:bold;">${articles[i].currency}  ${(articles[i].unitCost * articles[i].count)}</span></td>             
    </tr>
    `

  };
  document.getElementById("cart-products").innerHTML = html;
  addEventCount();
  actualizaTodosSubTotales();
  calcTotal();
  costoDeEnvio();
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_DESAFIANTE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      arrayArticles = resultObj.data.articles;
      ShowCartProducts(arrayArticles);

    }

  });

});



document.getElementById("premium").addEventListener("change", function () {
  comissionPercentage = 0.15;
  costoDeEnvio();
  calcTotal();
});

document.getElementById("express").addEventListener("change", function () {
  comissionPercentage = 0.07;
  costoDeEnvio();
  calcTotal();
});

document.getElementById("standard").addEventListener("change", function () {
  comissionPercentage = 0.05;
  costoDeEnvio();
  calcTotal();
});



//Se agrega una escucha en el evento 'submit' que será
//lanzado por el formulario cuando se seleccione 'Comprar'.


let direccion = document.getElementById("direccion");
let puerta = document.getElementById("puerta");
let localidad = document.getElementById("localidad");
let departamento = document.getElementById("departamento");

function validarDireccion() {
  if (direccion.value === ""|| puerta.value === "" ||localidad.value === ""||departamento.value === "" ) {
    document.getElementById("valdireccion").innerHTML= `<div class="alert alert-warning alert-dismissible fade show text-center" >
    <strong>FALTAN DATOS DE DIRECCION!</strong> Vuelve a asegurarte de que todos los campos de dirección esten correctamente ingresados.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" >
      <span aria-hidden="true">&times;</span>
    </button>
    </div>`
   document.getElementById("numerotarjeta").disabled = true;
   document.getElementById("vencimiento").disabled = true;
   document.getElementById("cvv").disabled = true;
   document.getElementById("nombre").disabled = true;
   document.getElementById("numerodecuenta").disabled = true;
   document.getElementById("tarjetacheck").disabled = true;
   document.getElementById("cuentaboton").disabled = true;

  }else{
  document.getElementById("valdireccion").innerHTML= `<div class="alert alert-success alert-dismissible fade show text-center" >
  <strong>DATOS INGRESADOS!</strong> Se han guardado los datos de envío.
  <br>
  <h>Continua con la forma de pago...</h>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`
document.getElementById("numerotarjeta").disabled = false;
document.getElementById("vencimiento").disabled = false;
document.getElementById("cvv").disabled = false;
document.getElementById("nombre").disabled = false;
document.getElementById("numerodecuenta").disabled = false;
document.getElementById("tarjetacheck").disabled = false;
document.getElementById("cuentaboton").disabled = false;
}
}
let tarjetaCredito = document.getElementById("tarjetacheck");
let cuentaCorriente = document.getElementById("cuentaboton");
let numTarj = document.getElementById("numerotarjeta");
let venc = document.getElementById("vencimiento");
let cvv = document.getElementById("cvv");
let numCuenta = document.getElementById("numerodecuenta");
let nombreTitular = document.getElementById("nombre");

//funcion que cuando se marca radio button tarjeta de credito quede deshabilitado el input ceunta corriente 

document.getElementById("tarjetacheck").addEventListener("click", function () {
  document.getElementById("numerotarjeta").disabled = false;
  document.getElementById("vencimiento").disabled = false;
  document.getElementById("cvv").disabled = false;
  document.getElementById("nombre").disabled = false;
  document.getElementById("numerodecuenta").disabled = true;
});

document.getElementById("cuentaboton").addEventListener("click", function () {
  document.getElementById("numerotarjeta").disabled = true;
  document.getElementById("vencimiento").disabled = true;
  document.getElementById("cvv").disabled = true;
  document.getElementById("nombre").disabled = true;
  document.getElementById("numerodecuenta").disabled = false;

});

document.getElementById("Ingresar").addEventListener("click", function () {
  if (tarjetaCredito.checked) {
    if (numTarj.value !== "" && venc.value !== "" && cvv.value !== "") {
      document.getElementById("cualquiera").innerHTML= `<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
      <strong>COMPRA REALIZADA!</strong> Gracias por elegirnos.
      <button type="button" class="close" data-dismiss="alert" id="cerrarModal" aria-label="Close"  data-dismiss="modal">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
    } else {
      document.getElementById("cualquiera").innerHTML= `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>FALTAN DATOS!</strong> Asegurate de que todos los campos esten correctamente ingresados.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
    }
  } else if (cuentaCorriente.checked) {
    if (numCuenta.value !== "") {
      document.getElementById("cualquiera").innerHTML= `<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
      <strong>COMPRA REALIZADA!</strong> Gracias por elegirnos.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
      
    } else {
      document.getElementById("cualquiera").innerHTML= `<div class="alert alert-warning alert-dismissible fade show text-center" role="alert">
      <strong>FALTAN DATOS!</strong> Asegurate de que todos los campos esten correctamente ingresados.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
    }
  }else{alert("Seleccionar forma de pago")}


}
);
