const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let data = [];
let productosPedidos = [];

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
  // Última funcionalidad: cancelar la orden
  // Get the modal
  var modal = document.getElementById("myModal");

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
    colAux.classList.add("d-none");
    colAux.classList.add("d-sm-block");
    colAux.appendChild(document.createTextNode(data[i].name));
    row.appendChild(colAux);

    colAux.onclick = function () {
      mostrarPlatos(colAux);
    };
  }

  mainDiv.appendChild(row);
  // Primera funcionalidad, cada vez que haga click sobre alguna categoría, debo mostrar sus platos

  // Inserto la fila de la funcionalidad

  let filaDespliegue = document.createElement("div");
  filaDespliegue.classList.add("row");
  mainDiv.appendChild(filaDespliegue);

  // Declaro la columna sobre la cual voy a escribir el título
  let colTit = document.createElement("div");
  colTit.classList.add("col-10");
  // Declaro la fila sobre la que está el título
  let filaTit = document.createElement("div");
  filaTit.classList.add("row");
  // Columna Auxiliar para dejar centradas las tarjetas
  let colPadding1 = document.createElement("div");
  colPadding1.classList.add("col-1");
  filaTit.appendChild(colPadding1);

  function mostrarPlatos(categ) {
    let cargado = document.getElementById("cargado");
    cargado.innerText = categ.innerText;
    // Primero limpio todo lo demás
    if (mainDiv.childNodes.length > 2) {
      mainDiv.removeChild(mainDiv.lastChild);
    }
    if (colTit.childNodes.length > 0) {
      colTit.removeChild(colTit.firstChild);
      colTit.removeChild(colTit.lastChild);
    }

    tit = document.createElement("h3");
    tit.appendChild(document.createTextNode(categ.innerText));
    colTit.appendChild(tit);
    colTit.appendChild(document.createElement("hr"));
    filaTit.appendChild(colTit);
    filaDespliegue.appendChild(filaTit);

    // Acá debo crear las tarjetas con las cuales voy a mostrar los platos

    let index;
    let filaAux = document.createElement("div");
    filaAux.classList.add("row");
    filaAux.setAttribute("id", "filaTarjetas");
    mainDiv.appendChild(filaAux);

    // Creo la columna que me va a dar el padding
    let colPadding2 = document.createElement("div");
    colPadding2.classList.add("col-1");
    filaAux.appendChild(colPadding2);

    let colDatos = document.createElement("div");
    colDatos.classList.add("col-10");
    filaAux.appendChild(colDatos);

    // Y en la columna de datos meto la fila final
    let filaDatos = document.createElement("div");
    filaDatos.setAttribute("id", "filaDatos");
    filaDatos.classList.add("row");
    colDatos.appendChild(filaDatos);

    // Recupero el índice de la categoría
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === categ.innerText) {
        index = i;
      }
    }

    // Con este índice me traigo la lista de los platos
    for (let i = 0; i < data[index].products.length; i++) {
      // Acá tengo que crear las tarjetas e insertarla
      let colAux = document.createElement("div");
      colAux.classList.add("col-12");
      colAux.classList.add("col-sm-12");
      colAux.classList.add("col-md-4");
      colAux.classList.add("col-lg-3");
      colAux.classList.add("col-xl-3");

      let card = document.createElement("div");
      card.className = "card";

      let card_body = document.createElement("div");
      card_body.className = "card-body";

      let image = document.createElement("img");
      image.classList.add("card-img-top");
      image.setAttribute("src", data[index].products[i].image);
      image.setAttribute("alt", data[index].products[i].name);

      let title = document.createElement("h6");
      title.className = "card-title";
      title.innerHTML = data[index].products[i].name;

      let text = document.createElement("p");
      text.className = "card-text";
      text.innerHTML =
        data[index].products[i].description.substring(0, 30) + "...";

      let num = document.createElement("p");
      num.className = "card-text";
      num.innerHTML = "$" + data[index].products[i].price;

      let btn = document.createElement("button");
      btn.classList.add("btn");
      btn.classList.add("btn-warning");
      btn.innerHTML = "Comprar";

      card_body.classList.add("text-center");

      card_body.appendChild(image);
      card_body.appendChild(title);
      card_body.appendChild(text);
      card_body.appendChild(num);
      card_body.appendChild(btn);
      card.appendChild(card_body);
      colAux.appendChild(card);
      filaDatos.appendChild(colAux);

      // Le agrego a cada botón el evento para que agregue el producto al carrito
      btn.onclick = () => {
        // Lo primero es recuperar el valor que tiene el carrito
        let numArts = document.getElementById("numArticulos");
        let numArts2 = document.getElementById("numArticulos2");
        let valores = numArts.innerText.split(" ");

        if (valores[0] > 0) {
          numArts.innerText = parseInt(valores[0]) + 1;
          numArts.innerText = numArts.innerText + " items";
          numArts2.innerText = parseInt(valores[0]) + 1;
          numArts2.innerText = numArts2.innerText + " items";
        } else {
          numArts.innerText = "1 item";
          numArts2.innerText = "1 item";
        }

        let encontrado = false;
        // Reviso si ya lo agregué
        for (let j = 0; j < productosPedidos.length; j++) {
          if (productosPedidos[j][0].name === data[index].products[i].name) {
            productosPedidos[j][1]++;
            encontrado = true;
          }
        }

        if (!encontrado) {
          productosPedidos.push([data[index].products[i], 1]);
        }
      };
    }
  }

  // Hacemos la misma función pero para la versión móvil
  let lis = document.getElementsByTagName("li");

  for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
      // Inicialmente lo que está cargado son las hamburguesas
      let colAuxMobile = document.createElement("div");
      colAuxMobile.classList.add("col-2");
      colAuxMobile.appendChild(document.createTextNode(lis[i].innerText));
      mostrarPlatos(colAuxMobile);
    };
  }

  // Inicialmente lo que está cargado son las hamburguesas
  let colInicial = document.createElement("div");
  colInicial.classList.add("col-2");
  colInicial.appendChild(document.createTextNode("Burguers"));
  row.appendChild(colAux);
  mostrarPlatos(colInicial);

  // Siguiente funcionalidad: si presiono el carrito de compras, entonces tengo que mostrar la nueva tabla

  let carrito = document.getElementById("shoppingCart");
  let carrito2 = document.getElementById("shoppingCart2");

  carrito.onclick = () => {
    if (filaDespliegue.childNodes.length > 0) {
      for (let i = 0; i < filaDespliegue.childNodes.length; i++) {
        filaDespliegue.removeChild(filaDespliegue.childNodes[i]);
      }
    }
    let eliminada = document.getElementById("filaDatos");
    eliminada.parentNode.remove(eliminada.parentNode.lastChild);

    // Ahora, debo mostrar la información relevante

    titC = document.createElement("h3");
    titC.appendChild(document.createTextNode("ORDER DETAIL"));
    colTit.appendChild(titC);
    colTit.appendChild(document.createElement("hr"));
    filaTit.appendChild(colTit);
    filaDespliegue.appendChild(filaTit);

    titC.parentNode.removeChild(titC.parentNode.firstChild);
    titC.parentNode.removeChild(titC.parentNode.firstChild);

    let filaAux = document.createElement("div");
    filaAux.classList.add("row");
    filaAux.setAttribute("id", "filaCarrito");
    mainDiv.appendChild(filaAux);

    // Creo la columna que me va a dar el padding
    let colPadding2 = document.createElement("div");
    colPadding2.classList.add("col-2");
    filaAux.appendChild(colPadding2);

    let colDatos = document.createElement("div");
    colDatos.classList.add("col-8");
    filaAux.appendChild(colDatos);

    // Y en la columna de datos meto la fila final
    let filaDatos = document.createElement("div");
    filaDatos.setAttribute("id", "filaDatos");
    filaDatos.classList.add("row");
    colDatos.appendChild(filaDatos);

    let tablaCarrito = document.createElement("table");
    tablaCarrito.className = "table table-striped";
    tablaCarrito.id = "tablitaCarroCompra";
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    let headers = document.createElement("tr");
    tablaCarrito.appendChild(tbody);

    let ths = [];

    ths[0] = document.createElement("th");
    ths[0].appendChild(document.createTextNode("Item"));

    ths[1] = document.createElement("th");
    ths[1].appendChild(document.createTextNode("Qty"));

    ths[2] = document.createElement("th");
    ths[2].appendChild(document.createTextNode("Description"));

    ths[3] = document.createElement("th");
    ths[3].appendChild(document.createTextNode("Unit Price"));

    ths[4] = document.createElement("th");
    ths[4].appendChild(document.createTextNode("Ammount"));

    ths[5] = document.createElement("th");
    ths[5].appendChild(document.createTextNode("Modify"));

    headers.appendChild(ths[0]);
    headers.appendChild(ths[1]);
    headers.appendChild(ths[2]);
    headers.appendChild(ths[3]);
    headers.appendChild(ths[4]);
    headers.appendChild(ths[5]);

    thead.appendChild(headers);
    tablaCarrito.appendChild(thead);

    filaDatos.appendChild(tablaCarrito);

    // Ahora, meto los datos dentro de la tabla

    for (let i = 0; i < productosPedidos.length; i++) {
      filaTablitaCarrito = document.createElement("tr");

      let td = [];

      td[0] = document.createElement("td");
      td[1] = document.createElement("td");
      td[2] = document.createElement("td");
      td[3] = document.createElement("td");
      td[4] = document.createElement("td");
      td[5] = document.createElement("td");

      td[0].classList.add("font-weight-bold");
      td[0].appendChild(document.createTextNode(i + 1));
      td[1].appendChild(document.createTextNode(productosPedidos[i][1]));
      td[2].appendChild(document.createTextNode(productosPedidos[i][0].name));
      td[3].appendChild(
        document.createTextNode(
          Math.round(productosPedidos[i][0].price * 100) / 100,
        ),
      );
      td[4].appendChild(
        document.createTextNode(
          Math.round(
            productosPedidos[i][0].price * productosPedidos[i][1] * 100,
          ) / 100,
        ),
      );

      let btnMas = document.createElement("button");
      let btnMenos = document.createElement("button");
      btnMas.classList.add("btn");
      btnMas.classList.add("btn-warning");
      btnMenos.classList.add("btn");
      btnMenos.classList.add("btn-warning");
      btnMas.appendChild(document.createTextNode("+"));
      btnMenos.appendChild(document.createTextNode("-"));

      td[5].appendChild(btnMas);
      td[5].appendChild(btnMenos);

      filaTablitaCarrito.appendChild(td[0]);
      filaTablitaCarrito.appendChild(td[1]);
      filaTablitaCarrito.appendChild(td[2]);
      filaTablitaCarrito.appendChild(td[3]);
      filaTablitaCarrito.appendChild(td[4]);
      filaTablitaCarrito.appendChild(td[5]);
      tbody.appendChild(filaTablitaCarrito);

      btnMas.onclick = () => {
        // Actualizo la cantidad
        td[1].innerText++;
        td[4].innerText = td[1].innerText * td[3].innerText;

        // Actualizo el valor de la lista
        productosPedidos[i][1]++;

        let numArts = document.getElementById("numArticulos");
        let numArts2 = document.getElementById("numArticulos2");
        let valores = numArts.innerText.split(" ");

        numArts.innerText = parseInt(valores[0]) + 1;
        numArts.innerText = numArts.innerText + " items";
        numArts2.innerText = numArts.innerText;
        updateTotal();
      };

      btnMenos.onclick = () => {
        // Actualizo la cantidad
        td[1].innerText--;
        td[4].innerText = td[1].innerText * td[3].innerText;

        // Actualizo el valor de la lista
        productosPedidos[i][1]--;

        let numArts = document.getElementById("numArticulos");
        let valores = numArts.innerText.split(" ");

        numArts.innerText = parseInt(valores[0]) - 1;
        numArts.innerText = numArts.innerText + " items";
        updateTotal();
      };
    }

    // Calculo el valor total
    numTotal = 0;

    for (let i = 0; i < productosPedidos.length; i++) {
      numTotal += productosPedidos[i][1] * productosPedidos[i][0].price;
    }

    // Ahora pongo el total:
    let filaBotones = document.createElement("div");
    filaBotones.classList.add("row");

    // Creo las columnas para cada uno de los datos

    let colIzq = document.createElement("div");
    colIzq.classList.add("col-6");

    let valorTotal = document.createElement("h6");
    valorTotal.setAttribute("id", "valorTotal");
    valorTotal.appendChild(document.createTextNode("Total: $" + numTotal));
    colIzq.appendChild(valorTotal);

    let colDer = document.createElement("div");
    colDer.classList.add("col-6");
    colDer.classList.add("derecha");

    filaBotones.appendChild(colIzq);
    filaBotones.appendChild(colDer);
    filaDatos.appendChild(filaBotones);

    // Ahora, vamos a los botones de las órdenes
    btnAceptar = document.createElement("button");
    btnAceptar.appendChild(document.createTextNode("Confirm Order"));
    btnAceptar.classList.add("btn");
    btnAceptar.classList.add("btn-success");
    btnCancelar = document.createElement("button");
    btnCancelar.appendChild(document.createTextNode("Cancel"));
    btnCancelar.classList.add("btn");
    btnCancelar.classList.add("btn-danger");

    colDer.appendChild(btnCancelar);
    colDer.appendChild(btnAceptar);

    btnAceptar.onclick = () => {
      let arregloFinal = [];
      for (let i = 0; i < productosPedidos.length; i++) {
        if (productosPedidos[i][1] > 0) {
          let dict = {};
          dict["item"] = i + 1;
          dict["quantity"] = productosPedidos[i][1];
          dict["description"] = productosPedidos[i][0].name;
          dict["unitPrice"] = productosPedidos[i][0].price;
          arregloFinal.push(dict);
        }
      }
      console.log(arregloFinal);
    };

    btnCancelar.onclick = function () {
      modal.style.display = "block";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  };

  // Usamos los botones para definitivamente cancelar la orden y para seguir comprando
  let btnCancelarOrden = document.getElementById("btnCancelarOrden");
  let btnSeguirComprando = document.getElementById("btnSeguirComprando");

  btnSeguirComprando.onclick = () => {
    modal.style.display = "none";
  };

  btnCancelarOrden.onclick = () => {
    // Tengo que reiniciar todas las cosas
    let numArts = document.getElementById("numArticulos");
    let numArts2 = document.getElementById("numArticulos2");
    numArts.innerText = "0 items";
    numArts2.innerText = "0 items";

    // Inicialmente lo que está cargado son las hamburguesas
    let colInicial = document.createElement("div");
    colInicial.classList.add("col-2");
    colInicial.appendChild(document.createTextNode("Burguers"));
    row.appendChild(colAux);
    mostrarPlatos(colInicial);

    productosPedidos = [];
    modal.style.display = "none";
  };

  carrito2.onclick = carrito.onclick;

  function updateTotal() {
    // Calculo el valor total
    numTotal = 0;

    for (let i = 0; i < productosPedidos.length; i++) {
      numTotal += productosPedidos[i][1] * productosPedidos[i][0].price;
    }

    let cadena = document.getElementById("valorTotal");
    cadena.innerText = "Total: $" + Math.round(numTotal * 100) / 100;
  }
});
