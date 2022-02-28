const select = document.querySelector("#select");
const cadastrar = document.querySelector(".botaoCadastrar");

const novoLogin = document.querySelector(".novoLogin");
const novaSenha = document.querySelector(".novaSenha");
const novoNome = document.querySelector(".novoNome");
const novoCargo = document.querySelector("#select");

window.addEventListener("load", () => {
    var id = sessionStorage.getItem("ID");

    fetch("https://aed-cargo-ponto.herokuapp.com/api/usuario/find?id=" + id, {
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
    try {
        if (novaSenha.value == "") { 
            throw "nova senha está vázia" 
        }
        Confirm.open({
            title: 'Editar Usuário',
            message: 'Gostaria mesmo de editar as informações deste usuário esse usuário?',
            okText: 'Sim',
            cancelText: 'Agora não',
            onOk: () => {
                fetch("https://aed-cargo-ponto.herokuapp.com/api/usuario/edit", {
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
                }).then(async() => {
                    sessionStorage.removeItem("ID");
                    window.location.href = "../index.html";
                })
                .catch((e) => retornarError(e));
            },
            onCancel: () => {}
        });
    } catch(err) {
        retornarError(err);
    }
});

function retornarError(msg) {
    Confirm.open({
        title: 'Error Usuário',
        message: 'Usuário que será editado retornou o seguinte error: ' + msg,
        okText: '',
        cancelText: 'OK',
        onOk: () => {},
        onCancel: () => {}
    });
}