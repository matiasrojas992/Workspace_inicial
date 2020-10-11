//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let arrayArticles=[]
let subtotaltotal=0;
// Se crea función que clasifica los subtotales según currency para que de esa manera que el valor en una única moneda en este caso son pesos uruguayos
function clasificacionSubTotales(count, index){
  let sub= 0; //Se crea la variable sub con valor unicial 0
  if(arrayArticles[index].currency==="USD"){ //Este if tiene como condicion si currency es dólares va a tomar la cantidad de artículos y el valor unitario los multiplica, a ese valor posteriormente es multiplicado por 40 para hacer la conversion a pesos uruguayos
    sub= arrayArticles[index].unitCost*count*40;
  }else{//Si esta en pesos multiplica el costo unitario por la cantidad de artículos
    sub= arrayArticles[index].unitCost*count;
  }
  return sub; //Luego devuelve el valor de la variable siempre en pesos uruguayos
 
}
//Función que engloba todos los subtotales
function actualizaTodosSubTotales(){
  let subtotal= 0; //Se crea la variable subtotal con valor unicial 0
  let countArray= document.getElementsByClassName("countArticle");//Se crea la variable countArray donde se encuentran todos los elementos con la clase "countArticle"
  for(let i=0;i<countArray.length;i++){// Se crea un for para que recorra los elementos de countArray
    subtotal += clasificacionSubTotales(countArray[i].value , i);//Se agregan a la variable subtotal los valores que fueron arrojados por la función clasificacionSubTotales se le pasa como parametros countArray[i].value,i 
  };
  document.getElementById("subtotal").innerHTML = "UYU " + subtotal;// Se muesta el valor correspondiente en el html
  subtotaltotal=subtotal; // Se crea una variable que toma ese valor de subtotal 
  
}
//Función que muestra el total
function calcTotal(){
  let total = subtotaltotal;// En este caso la suma de los Subtolates es igual al total 
  document.getElementById("total").innerHTML = "UYU " + total;
}
//Función que engloba a los addEvenListener
function addEventCount(){
  let subtotalArray = document.getElementsByClassName("countArticle");//Se crea la variable subtotalArray donde se encuentran todos los elementos con la clase "countArticle
  for(let i=0;i<subtotalArray.length;i++){// Se crea un for para que recorra los elementos de subtotalArray
      subtotalArray[i].addEventListener("change",function(){//Cuando el valor de subtotalArray[i] es modificado se ejecuta la función que toma los elementos con id "productSubtotal-" se muestra currency, se multiplica el costo unitario por la nueva cantidad de elementos.
      document.getElementById("productSubtotal-"+i).innerHTML= arrayArticles[i].currency + " "+
      subtotalArray[i].value* arrayArticles[i].unitCost;
      actualizaTodosSubTotales();//Se ejecutan as funciónes actualizaTodosSubTotales y calcTotal
      calcTotal();
  });

  }
  

}
//Se crea funcion que tome los elementos del array y los muestre en el html

function ShowCartProducts(articles){
    let html = "";
   
    for (let i=0; i < articles.length ; i++){//For que recorre todos los elementos del JSON
      
      poductUnitCost= articles[i].unitCost;
      poductCurrency= articles[i].currency;

        html +=`
        <tr>
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
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_DESAFIANTE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      arrayArticles=resultObj.data.articles;
      ShowCartProducts(arrayArticles);
    
    }
  
  }
  )
});