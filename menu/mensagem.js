const mensagem = document.querySelector("#mensagemEntrada");

fetch("https://aed-ponto.herokuapp.com/api/usuario/me", {
  method: "Get",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
  .then((response) => response.json())
  .then(async (usuario) => {
    mensagem.innerHTML = "Bem vindo, " + usuario.nome;
  });
