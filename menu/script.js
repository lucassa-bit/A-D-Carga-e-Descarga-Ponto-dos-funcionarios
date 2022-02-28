const funcionariosBTN = document.querySelector(".funcionariosBTN");
const registroBTN = document.querySelector(".registroBTN");
const folhaBTN = document.querySelector(".folhaBTN");
const gestaoBTN = document.querySelector(".gestaoBTN");
const sairBTN = document.querySelector(".botaoSair");

if (localStorage.getItem("token") == null) {
  window.location.href = "../index.html";
}

funcionariosBTN.addEventListener("click", (e) => {
  window.location.href = "./funcionarios/index.html";
});

registroBTN.addEventListener("click", (e) => {
  window.location.href = "./calendario/index.html";
});

folhaBTN.addEventListener("click", (e) => {
  window.location.href = "./folha/index.html";
});

gestaoBTN.addEventListener("click", (e) => {
  window.location.href = "./gestao_fiscal/index.html";
});

function load() {
  const folhaBTN = document.querySelector(".folhaBTN");
  const gestaoBTN = document.querySelector(".gestaoBTN");

  folhaBTN.style.display = "none";
  gestaoBTN.style.display = "none";

  fetch("https://aed-cargo-ponto.herokuapp.com/api/usuario/me", {
    method: "Get",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((usuario) => {
      if (usuario.cargo == "ADMIN") {
        folhaBTN.style.display = "block";
        gestaoBTN.style.display = "block";
      } else if (usuario.cargo == "LIDER") {
        folhaBTN.style.display = "block";
      }
    });
}

load();
