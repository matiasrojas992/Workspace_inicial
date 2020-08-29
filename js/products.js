var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        hideSpinner();
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      return result;
    });
}
//Var y Const 
const PRODUCTS_ORDEN_ASC = "Asc";
const PRODUCTS_ORDEN_DESC = "Desc";
const PRODUCTS_RELEVANCIA = "Relevancia";
var minCount = undefined;
var maxCount = undefined;
var currentSortCriteria = "";
var categoriesArray = [];
var row = []; 

//Funcion para filtar(estan todas juntas, Criteria es el parametro que las diferencia)
function sortProducts(criteria, array) {
  let result = [];

  if (criteria === PRODUCTS_ORDEN_ASC) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount < bCount) { return -1; }
      if (aCount > bCount) { return 1; }
      return 0;
    });
  } else if (criteria === PRODUCTS_ORDEN_DESC) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount > bCount) { return -1; }
      if (aCount < bCount) { return 1; }
      return 0;
    });
  } else if (criteria === PRODUCTS_RELEVANCIA) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) { return -1; }
      if (aCount < bCount) { return 1; }
      return 0;
    });
  }

  return result;
}


function showList(array) {

  let htmlContentToAppend = "";
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let products = currentCategoriesArray[i];
    if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
      ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {

        //COMENTARIO: CAMBIÉ LA LÍNEA 81, ANTES ERA  <div class="row">
        //AHORA ES <div class="row" data-filter-name="`+products.name+`" data-filter-desc="`+products.description+`" > 
      htmlContentToAppend += `
      <div class="list-item list-item-action">
        <div class="row" data-filter-name="`+products.name+`" data-filter-desc="`+products.description+`" >
              <div class="col-3">
                  <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">                  
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1" id="namefilter">`+ products.name + `</h4>                      
                      <small class="text-muted">` + products.soldCount + ` artículos</small>                                       
                  </div>
</br><p id="descriptionfilter">` + products.description + `</p>
</br><p align="right"> ` + products.currency + `  ` + products.cost + `<p>     
              </div>
          </div>
      </div>
      `

      document.getElementById("containerListCar").innerHTML = htmlContentToAppend;
    }
  }
}

function sortAndShowProducts(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortProducts(currentSortCriteria, currentCategoriesArray);

  //Muestro las categorías ordenadas
  showList();
  buscador(row);

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var row = []; 

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowProducts(PRODUCTS_ORDEN_ASC, resultObj.data);
    }
    row =document.getElementById("containerListCar").getElementsByClassName("row"); 
  });
  //buscador
document.getElementById("buscar").addEventListener("keyup", function () {
    buscador(row);
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(PRODUCTS_ORDEN_ASC);
  });  

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(PRODUCTS_ORDEN_DESC);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(PRODUCTS_RELEVANCIA);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showList();
  });

  document.getElementById("rangeFilterCount").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
      minCount = parseInt(minCount);
    }
    else {
      minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
      maxCount = parseInt(maxCount);
    }
    else {
      maxCount = undefined;
    }

    showList();
    buscador(row);
  });
});
// Buscador

function buscador(row) {
  // Declare variable
  filtradotexto = document.getElementById("buscar").value.toUpperCase();
  
  for (i = 0; i < row.length; i++) {
    
    if (row[i].dataset.filterName.toUpperCase().includes(filtradotexto) || row[i].dataset.filterDesc.toUpperCase().includes(filtradotexto)) 
    {
      row[i].parentNode.style.display = "";     
     
    } else {
      row[i].parentNode.style.display = "none";
      
    }
  }
}


