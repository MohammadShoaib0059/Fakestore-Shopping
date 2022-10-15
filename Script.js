function LoadCategories() {
    fetch("http://fakestoreapi.com/products/categories")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.unshift("all");
            for (var item of data) {
                var option = document.createElement("option");
                option.text = item.toUpperCase();
                option.value = item;
                document.getElementById("lstCategories").appendChild(option);
            }
        })
}
function LoadProducts(url) {
    document.getElementById("catalog").innerHTML = "";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var item of data) {
                var div = document.createElement("div");
                div.className = "card m-2 p-2";
                div.style.width = "200px";
                div.innerHTML = `
          <img src=${item.image} height="150" class="card-img-top">
          <div class="card-header" style="height:170px">
            <p>${item.title}</p>
               </div>
           <div class="card-body">
              <h3>${item.price}</h3>
                  </div>
           <div class="card-footer">
       <button onclick="AddToCartClick(${item.id})" class="btn btn-danger w-100">
         <span class="bi bi-cart4"></span> Add to Cart
            </button>
        </div>
            `;
                document.getElementById("catalog").appendChild(div);
            }
        })
}
function bodyload() {
    LoadCategories();
    LoadProducts("http://fakestoreapi.com/products");
    GetCartItemsCount();
}
function CategoryChange() {
    var categoryname = document.getElementById("lstCategories").value;
    if (categoryname == "all") {
        LoadProducts("http://fakestoreapi.com/products");
    } else {
        LoadProducts(`http://fakestoreapi.com/products/category/${categoryname} `);
    }
}
var CartItems = [];
function GetCartItemsCount() {
    document.getElementById("lblCount").innerHTML = CartItems.length;
}
function AddToCartClick(id) {
    fetch(`http://fakestoreapi.com/products/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            CartItems.push(data);
            GetCartItemsCount();
            alert(`${data.title} \n Added to Cart`);
        })
}
function ShowCart() {
    document.querySelector("tbody").innerHTML = "";
    for (var item of CartItems) {
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdPhoto = document.createElement("td");
        var tdRemove = document.createElement("td");
        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;
        var img = document.createElement("img");
        img.width = "50";
        img.height = "50";
        img.src = item.image;
        tdPhoto.appendChild(img);
        tdRemove.innerHTML = `
<button class="btn btn-outline-danger">
<span class="bi bi-trash2-fill"></span> 
</button>
`;
        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPhoto);
        tr.appendChild(tdRemove);
        document.querySelector("tbody").appendChild(tr);
    }
}