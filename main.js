const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let data = [];

function get_Data(callback) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      callback(res);
    });
}

// --------------------------------------------------------------------------

get_Data((value) => {
  data = value;

  // Lo primero que se hace es crear el menú de navegación

  const mainDiv = document.getElementById("main-div");

  // Creo la fila

  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("bg-dark");

  let colAux = document.createElement("div");
  colAux.classList.add("col-1");
  row.appendChild(colAux);

  let valor;

  for (let i = 0; i < data.length; i++) {
    let colAux = document.createElement("div");
    colAux.classList.add("col-2");
    colAux.classList.add("navBar");
    colAux.appendChild(document.createTextNode(data[i].name));
    row.appendChild(colAux);

    colAux.onclick = function () {
      mostrarPlatos(colAux);
    };
  }

  mainDiv.appendChild(row);

  // Inserto la fila de la funcionalidad

  let filaDespliegue = document.createElement("div");
  filaDespliegue.classList.add("row");
  // Primero imprimo el valor de la categoría
  let filaTit = document.createElement("div");
  filaTit.classList.add("row");
  let colTit = document.createElement("div");
  colTit.classList.add("col-12");

  // Primera funcionalidad, cada vez que haga click sobre alguna categoría, debo mostrar sus platos

  function mostrarPlatos(categ) {
    // Primero limpio todo lo demás
    for (child of filaDespliegue.children) {
      filaDespliegue.removeChild(child);
    }

    colTit.innerText = categ.innerText;
    filaTit.appendChild(colTit);
    filaDespliegue.appendChild(filaTit);
    mainDiv.appendChild(filaDespliegue);
    colTit.classList.add("titCateg");

    // Acá debo crear las tarjetas con las cuales voy a mostrar los platos

    let index;
    let filaAux = document.createElement("div");
    filaAux.classList.add("row");

    // Recupero el índice de la categoría
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === categ.innerText) {
        index = i;
      }
    }

    // Con este índice me traigo la lista de los platos
    console.log(data[index].products);
    for (let i = 0; i < data[index].products.length; i++) {
      // Acá tengo que crear las tarjetas e insertarlas
      // CREAR ESTRUCTURA
      let colAux = document.createElement("div");
      colAux.classList.add("col-3");

      let card = document.createElement("div");
      card.className = "card";

      let card_body = document.createElement("div");
      card_body.className = "card-body";

      let title = document.createElement("h5");
      title.className = "card-title";
      title.innerHTML = data[index].products[i].name;

      let text = document.createElement("p");
      text.className = "card-text";
      text.innerHTML = data[index].products[i].description;

      let num = document.createElement("p");
      num.className = "card-text";
      num.innerHTML = data[index].products[i].price;

      let btn = document.createElement("button");
      btn.innerHTML = "Comprar";

      card_body.appendChild(title);
      card_body.appendChild(text);
      card_body.appendChild(num);
      card_body.appendChild(btn);
      card.appendChild(card_body);
      colAux.appendChild(card);
      filaDespliegue.appendChild(colAux);
    }
  }
});
