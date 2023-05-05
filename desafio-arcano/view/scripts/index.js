const divuser = document.getElementById('users');

async function getData() {
    const url = await fetch('http://localhost:8000/users');
    const data = await url.json();
  
    // Adiciona a propriedade `totalProducts` a cada objeto de usuário
    data.forEach((user) => {
      const total = user.products.reduce((acc, curr) => acc + curr.quantity, 0);
      user.totalProducts = total;
    });
  
    let table = document.createElement('table');
    let user = Object.keys(data [0]);

    let index = user.indexOf("products");
    if (index > -1) {
      user.splice(index, 1);
    }
  
    // Cria o cabeçalho da tabela
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
  
    user.forEach((item) => {
      let th = document.createElement("th");
      th.innerText = item; 
      tr.appendChild(th);
    })
  
    thead.appendChild(tr);
    table.appendChild(tr);
  
    data.forEach((item) => {
      let tr = document.createElement("tr");
      let vals = Object.values(item);
        
      let index = vals.indexOf(item.products);
      if (index > -1) {
        vals.splice(index, 1);
      }
      
      vals.forEach((elem) => {
        let td = document.createElement("td");
        td.innerText = elem; 
        tr.appendChild(td);
      })
  
      table.appendChild(tr); 
    })
  
    divuser.appendChild(table);
  }

getData()