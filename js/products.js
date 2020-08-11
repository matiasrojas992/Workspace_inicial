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
function showCategoriesList(array){

  let htmlContentToAppend = "";
  for(let i = 0; i < array.length; i++){
      let category = array[i];

      htmlContentToAppend += `
      <div class="list-group-item list-group-item-action">
          <div class="row">
              <div class="col-3">
                  <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">                  
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">`+ category.name +`</h4>                      
                      <small class="text-muted">` + category.soldCount + ` artículos</small>                                       
                  </div>
</br><p>` + category.description + `</p>
</br><p align="right"> ` + category.currency + `  ` + category.cost + `<p>     
              </div>
          </div>
      </div>
      `

      document.getElementById("containerListCar").innerHTML = htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded",
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      carlist = resultObj.data;
          showCategoriesList(carlist);
    }
  }));