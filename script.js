const botao = document.querySelector(".botao");
const login = document.querySelector(".inputLogin");
const senha = document.querySelector(".inputSenha");
senha.setAttribute("type", "password");

botao.addEventListener("click", (e) => {
  const login = document.querySelector(".inputLogin");
  const senha = document.querySelector(".inputSenha");
  senha.setAttribute("type", "password");

  const data = {
    login: login.value,
    password: senha.value,
  };

  var fetchData = {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  };

  fetch("https://aed-ponto.herokuapp.com/login", fetchData)
    .then(async (resp) => {
      if (!resp.ok) {
        throw new Error("Usuario ou senha incorretos!");
      }
      return resp.text();
    })
    .then((token) => localStorage.setItem("token", token))
    .then(async () => {
      window.location.href = "./menu";
    })
    .catch((e) => alert(e));
});
