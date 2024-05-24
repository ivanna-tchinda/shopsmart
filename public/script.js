var btn_enter = document.getElementById("enter-btn")
var elt_srch = document.getElementById("input-search")
var city_srch = document.getElementById("city-search")
var products_elts = [];

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getAllParis')
    .then(response => response.json())
    .then(data => getData(data['data']));
});

window.onscroll = function() {scrollFunction()};

var navbar = document.getElementById("navbar");

var sticky = navbar.offsetTop;

function scrollFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }

function getData(data) {
    data.forEach(function ({product}){
        products_elts.push(product)
    })
    products_elts.sort();
}

function displayNames(value) {
    elt_srch.value = value;
    removeElements();
}

elt_srch.addEventListener("keyup", (e) => {
    //loop through above array
    //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
    removeElements();
    for (let i of products_elts) {
      //convert input to lowercase and compare with each string
      if (
        i.toLowerCase().startsWith(elt_srch.value.toLowerCase()) &&
        products_elts.value != ""
      ) {
        //create li element
        let listItem = document.createElement("li");
        //One common class name
        listItem.classList.add("list-items");
        listItem.style.cursor = "pointer";
        listItem.addEventListener('click', function() {
            displayNames(i);
        });
        //Display matched part in bold
        let word = "<b>" + i.substr(0, elt_srch.value.length) + "</b>";
        word += i.substr(elt_srch.value.length);
        //display the value in array
        listItem.innerHTML = word;
        document.getElementById("search-elements").appendChild(listItem);
      }
    }
});


function removeElements() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
      item.remove();
    });
}

btn_enter.addEventListener("click", function (e) {
    e.preventDefault()
    switch (city_srch.value) {
        case "paris":
            fetch('http://localhost:3000/getAllParis')
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data']));
            break;
        case "toulon":
            fetch('http://localhost:3000/getAllToulon')
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data']));
            break;
        default:
            cityNotInDb();
            break;
    }
})

function cityNotInDb() {
    const table = document.querySelector('li');
    if(!(city_srch.value))
    {
        table.innerHTML += "<li>Veuillez entrer une ville</li>";
        return;
    }


    table.innerHTML += "<li>Liste des villes recensées: Paris, Toulon</li>";
}

function loadHTMLTable(data) {
    const table = document.querySelector('ul');

    if (data.length === 0) {
        table.innerHTML = "<li>No Data</li>";
        return;
    }
    let tableHtml = "";
    data.forEach(function (item) {
        if(item.product == elt_srch.value)
        {
            for (var element in item){
                if (element == "product")
                    continue;
                var magasin = element.substring(6)
                const imagePath = `/assets/${magasin}-logo.png`;
                console.log("magasin: "+ magasin)
                tableHtml += `
                <li>
                    <div class="one-product">
                        <img class="logo-img" src="${imagePath}"/>
                        <div class="product-section">
                            <h3>Produit:</h3>
                            <p>${item.product}</p>
                        </div>
                        <div class="address-section">
                            <h3>Adresse:</h3>
                            <p>1 rue du lac, 75015, Paris</p>
                        </div>
                        <div class="price-section">
                            <h3>Prix(€/kg):</h3>
                            <p>${item[element]}</p>
                        </div>
                        <button class="details-btn"><a class="text-detailsbtn">Plus de détails</a></button>
                    </div>
                </li>`;
            };
        }
    });

    table.innerHTML = tableHtml;
}