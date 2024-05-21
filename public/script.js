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
        console.log(i);
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

    table.innerHTML += "<li>No Data</li>";
}

function loadHTMLTable(data) {
    const table = document.querySelector('li');

    if (data.length === 0) {
        table.innerHTML = "<li>No Data</li>";
        return;
    }
    let tableHtml = "";
    data.forEach(function ({product, price_lidl, price_leclerc, price_auchan, price_franprix}) {
        if(product == elt_srch.value)
        {
            tableHtml += `<li>${product}</li>`;
            tableHtml += `<li>Prix lidl:${price_lidl}</li>`;
            tableHtml += `<li>Prix leclerc:${price_leclerc}</li>`;
            tableHtml += `<li>Prix auchan:${price_auchan}</li>`;
            tableHtml += `<li>Prix franprix:${price_franprix}</li>`;
            tableHtml += "</tr>";
            // return;
        }
    });

    table.innerHTML = tableHtml;
}