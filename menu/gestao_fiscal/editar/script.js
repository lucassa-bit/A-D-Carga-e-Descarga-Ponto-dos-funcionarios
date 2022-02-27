const select = document.querySelector("#select");
const cadastrar = document.querySelector(".botaoCadastrar");

const novoLogin = document.querySelector(".novoLogin");
const novaSenha = document.querySelector(".novaSenha");
const novoNome = document.querySelector(".novoNome");
const novoCargo = document.querySelector("#select");

window.addEventListener('load', () => {
    var id = sessionStorage.getItem('ID');

    fetch("https://flash-point-app.herokuapp.com/api/usuario/find?id=" + id, {
            method: "Get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(async(e) => e.json())
        .then((objeto) => {
            novoLogin.value = objeto.login;
            novoNome.value = objeto.nome;
            novoCargo.value = objeto.cargo;
        });
});

cadastrar.addEventListener("click", (e) => {

    fetch("https://flash-point-app.herokuapp.com/api/usuario/edit", {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
            login: novoLogin.value,
            senha: novaSenha.value,
            nome: novoNome.value,
            cargo: novoCargo.value,
        }),
    }).then((response) => response.json());
}).then(async() => {
    sessionStorage.removeItem("ID");
    window.location.href = '../index.html';
});