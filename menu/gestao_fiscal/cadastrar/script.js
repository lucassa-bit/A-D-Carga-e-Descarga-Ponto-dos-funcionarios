const select = document.querySelector("#select");
const cadastrar = document.querySelector(".botaoCadastrar");

cadastrar.addEventListener("click", (e) => {
    const novoLogin = document.querySelector(".novoLogin").value;
    const novaSenha = document.querySelector(".novaSenha").value;
    const novoNome = document.querySelector(".novoNome").value;
    const novoCargo = select.options[select.selectedIndex].value;

    try {
        if (novaSenha == "") { throw "senha está vazia" }
        Confirm.open({
            title: 'Confirmação de cadastro de Usuário',
            message: 'As informações passadas estão de acordo?',
            okText: 'Sim',
            cancelText: 'Vou revisar',
            onOk: () => {
                fetch("https://aed-cargo-ponto.herokuapp.com/api/usuario", {
                        method: "Post",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                        body: JSON.stringify({
                            login: novoLogin,
                            senha: novaSenha,
                            nome: novoNome,
                            cargo: novoCargo,
                        }),
                    })
                    .then(async (e) => {
                        if (e.status != 200 && e.status != 201) {
                            throw "usuario não cadastrado devido a um error nas informações";
                        }
                    })
                    .then(async() => {
                        window.location.href = "../index.html";
                    })
                    .catch(e => retornarError(e))
            },
            onCancel: () => {}
        });
    } catch (e) {
        retornarError(e)
    }
});



function retornarError(msg) {
    Confirm.open({
        title: 'Error Usuário',
        message: 'Usuário que deseja ser editador retornou o seguinte error: ' + msg,
        okText: '',
        cancelText: 'OK',
        onOk: () => {},
        onCancel: () => {}
    });
}