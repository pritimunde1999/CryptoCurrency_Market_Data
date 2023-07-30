let req = {
    method: 'GET',
    headers: {
        'Content-type' : 'application/json'
    },
    mode: 'cors',
    cache: 'default'
};





const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
const grid_button = document.getElementById("grid");
const list_button = document.getElementById("list");
const container = document.getElementById("container");
const container1 = document.getElementById("container1");
const table = document.querySelector("#container1 > table");
container.style.display ="none";

let arr;
async function getAllResults(idx)
{
    const response = await fetch(url,{method:"GET"});
    const result = await response.json();
    if(idx===1)
    {
       dataOnUIByGrid(result);
    }
    else if(idx===2)
    {
        dataOnUIByList(result);
    }
    console.log(result);

    
} 




function showPanel(idx){
   
   console.log(idx);
    if(idx == 1){
        list_button.style.borderBottom = "none";
        grid_button.style.borderBottom = "2px solid rgb(60, 120, 205)";
        container.style.display = "grid";
        // container1.style.display = "none";
        getAllResults(1);
        container1.innerHTML = '';
    }else if(idx==2){
        grid_button.style.borderBottom = "none";
        list_button.style.borderBottom = "2px solid rgb(60, 120, 205)";
        container1.style.display = "grid";
        // container.style.display = "none";
        getAllResults(2);
        container.innerHTML = '';
    }
}
showPanel(1);


function dataOnUIByGrid(info){
   info.forEach(data => {
      const card = document.createElement("div");
      card.className = "card";
      
      const symbol = data.symbol.toUpperCase();
      const num = data.price_change_percentage_24h.toFixed(2);
      card.innerHTML=
      `<div class="top">
      <div class="logo">
          <img src="${data.image}">
      </div>
      <div class="name">
          <p id="short"><b>${symbol}</b></p>
          <p id="long">${data.name}</p>
      </div>
  </div>

  <div class="mid" id="${num}">${num}%</div>
  
  <div class="bottom">
      <p class="price" id="${data.current_price}">$ ${data.current_price}</p>
      <p id="vol">Total Volume: ${data.total_volume}</p>
      <p id="cap">Market Cap: $ ${data.market_cap}</p>
  </div>`

   container.appendChild(card);

   let mid = document.getElementById(`${num}`);
   let price = document.getElementById(`${data.current_price}`);

 if(num < 0)
 {
     mid.style.border ="2px solid #E7514A";
     mid.style.color = "#E7514A";
     price.style.color ="#E7514A";
  
  
 }
   });
}



                       
                    

 
function dataOnUIByList(info){
    info.forEach(data => {
    const row = document.createElement("tr");
    const symbol = data.symbol.toUpperCase();
    const num = data.price_change_percentage_24h.toFixed(2);

      row.innerHTML=
      `<td>
      <div class="top1">
          <div class="logo1">
               <img src="${data.image}">
          </div>
          <div class="name">
              <p id="short"><b>${symbol}</b></p>
              <p id="long">${data.name}</p>
          </div>
      </div>
     </td>
     <td style="width:23%">
     <div class="mid1" id="${num}">${num}%</div>
     </td>
     <td>
      <p class="price" id="${data.current_price}">$ ${data.current_price}</p>
     </td>
     <td><p id="vol">${data.total_volume}</p></td>
     <td><p id="cap">$ ${data.market_cap}</p></td>`;

     table.appendChild(row);

     let mid = document.getElementById(`${num}`);
     let price = document.getElementById(`${data.current_price}`);

//    if(num < 0)
//    {
//        mid.style.border ="2px solid #E7514A";
//        mid.style.color = "#E7514A";
//        price.style.color ="#E7514A";
    
    
//    }
   
});


   
}
