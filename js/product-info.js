//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {};
var productList = {};
const maxRating = 5;

//Funcion que mostraba las imagenes que fue sustituida 14/9 por el carousel
function showImagesGallery(array) {

    let htmlContentToImagen = "";
   
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToImagen = `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesWrapper").innerHTML = htmlContentToImagen;
    }
}
function showRating() {
    let score = product.rating;
    let stars = "";
    let html = "";
    for (let i = 1; i <= maxRating; i++) {
        if (i <= score) {
            stars += '<i class="fa fa-star checked"></i>';
        } else {
            stars += '<i class="fa fa-star"></i>';
        }
    }

    html = `<span>  ${stars}</span>`

    document.getElementById("rating").innerHTML = html;

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");
            let productrelated = document.getElementById("relatedPrductContainer")
            let productCurrency = document.getElementById("currencyProduct");
            

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = '<a href="products.html">' + product.category + '</a>';
            productCostHTML.innerHTML = product.cost;
            productrelated.innerHTML = product.relatedProducts;
            productCurrency.innerHTML = product.currency;

            showRating();
            //Muestro las imagenes en forma de galería
            //showImagesGallery(product.images);
            showRelatedProducts(product.relatedProducts);
                      
        }
    })
});
//productos relacionados
function showRelatedProducts(relatedProductsArray) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productList = resultObj.data;

            let htmlRelatedProducts = "";

            for (let i = 0; i < relatedProductsArray.length; i++) {
                let relatedProductPosition = relatedProductsArray[i];
                let relatedProduct = productList[relatedProductPosition];

                htmlRelatedProducts += `
                <div class= "col-lg-3 col-md-4 col-6 border">
                    <div class= "row">
                        <img class="img-fluid p-2" src="`+ relatedProduct.imgSrc + `">                                              
                    </div>                   
                    <div "relatedProductInfo" class= "row p-2">
                    <p>`+ relatedProduct.name + `</p> 
                    <p>`+ relatedProduct.description + `</p>
                    </div>
                    <div class= "row p-2">
                    <a href="product-info.html">Ver</a>
                    </div>                     
                </div>`
            }
            document.getElementById("relatedPrductContainer").innerHTML = htmlRelatedProducts;
        }
    })
}
// Muestro los comentarios del JSON
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            let html="";
            
            comments.forEach(function(comment) {
                let productScore= comment.score;
                let score= "";
                for(let i = 1 ; i<=productScore ; i++ ){
                    score += `<i class="fa fa-star checked"> </i>`;
                }
                for(let i = productScore +1; i <= 5; i++){
                    score += `<i class="fa fa-star"> </i>`;
                }
                html += `
                <li class="media">
                    <div class="media-body">           
                    <label class="mt-0"><strong> ${comment.user}</strong>
                    <span>${score}</span>
                    <span class="small"> ${comment.dateTime}</span>                                 
                    </label>
                    <br>
                    <label class="small">${comment.description}</label>
                    <hr>
                    </div>                              
                </li>    
                `                   
                

                });  
             document.getElementById("comentarios").innerHTML = html;

        }
    
    });
   
});
// funcion para guardar comentario y mostrarlo luego
function guardarComentario(comentario) {

    localStorage.setItem("comentario", comentario)
    localStorage.setItem("valor", value)
    
}
 

// setea el dato del usuario en el span de id user
var comentarios = localStorage.getItem("comentario");
var valoracion = localStorage.getItem("valor");
/*Mostrar datos almacenados*/
document.getElementById("coment").innerHTML = l_user
document.getElementById("coment2").innerHTML = comentarios
document.getElementById("valoracion").innerHTML = valoracion


