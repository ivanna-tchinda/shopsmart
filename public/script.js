var btn_enter = document.getElementById("enter-btn")
var elt_srch = document.getElementById("input-search")

// document.addEventListener('DOMContentLoaded', function () {
    
// });

btn_enter.addEventListener("click", function () {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
})


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
            return;
        }
        else
            return;
    });

    table.innerHTML = tableHtml;
}