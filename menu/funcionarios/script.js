const cadastrarBTN = document.querySelector(".cadastrarBTN");

cadastrarBTN.addEventListener("click", (e) => {
  cadastrarBTN.setAttribute("href", "./cadastrar");
});

function deleteFuncionarioById(id) {
  fetch("https://aed-ponto.herokuapp.com/api/funcionario/delete?id=" + id, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((e) => loadFuncionarios());
}

function loadFuncionarios() {
  document.querySelector(".listaFuncionarios").innerHTML = "";
  fetch("https://aed-ponto.herokuapp.com/api/funcionario", {
    method: "Get",
    headers: {
      mode: "no-cors",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((usuarios) => {
      usuarios.map((val) => {
        document.querySelector(".listaFuncionarios").innerHTML +=
          `
        <div class="containerFuncionarios">
            <ul class="lista_funcionarios">
              <li class="funcionario" > Nome: ` +
          val.nome +
          ` - Cargo: ` +
          val.cargo +
          `</li> 
                     <input class="deletarInput" type="submit" value="Editar" onclick="handleSubmit(` +
          val.id +
          `)"/> 
                    <input class="deletarInput" type="submit" value="Deletar" onclick="deleteFuncionarioById(` +
          val.id +
          `)"/>  
            </ul> 
        </div>    

        `;
      });
    });
}

function handleSubmit(id) {
  sessionStorage.setItem("ID", id);
  window.location.href = "./editar";

  return;
}

loadFuncionarios();
