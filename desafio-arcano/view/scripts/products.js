const products = document.getElementById('pro');
const search = document.getElementById('search');

async function getProducts(userId){
    const url = await fetch(`http://localhost:8000/users/cart/${userId}`)
    const data = await url.json()

    let table = document.createElement('table');
    let product = Object.keys(data[0]);
  
    // Cria o cabeçalho da tabela
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
  
    product.forEach((item) => {
      let th = document.createElement("th");
      th.innerText = item; 
      tr.appendChild(th);
    })
  
    thead.appendChild(tr);
    table.appendChild(tr);
  
    data.forEach((item) => {
      let tr = document.createElement("tr");
      let vals = Object.values(item);
  
      vals.forEach((elem) => {
        let td = document.createElement("td");
        td.innerText = elem; 
        tr.appendChild(td);
      })
  
      table.appendChild(tr); 
    })
  
    products.appendChild(table);
}

function clearProducts() {
    while (products.firstChild) {
      products.removeChild(products.firstChild);
    }
}
function searchUser() {
    const userId = search.value;
    clearProducts();
    getProducts(userId);
}



searchUser()
