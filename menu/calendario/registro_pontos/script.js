const queryString = window.location.search;

const dataTitulo = document.querySelector(".titulo");
const salvarBTN = document.querySelector(".salvarBTN");

var data = "";

var funcionariosPontos = [];
var selecionados = [];

carregamentoInicial();

async function retornCargo() {
    fetch("https://aed-cargo-ponto.herokuapp.com/api/usuario/me", {
            method: "Get",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => response.json())
        .then((usuario) => {
            var cargo = "";
            if (usuario.cargo === "ADMIN") {
                cargo = "ADMIN";
            } else if (usuario.cargo === "LIDER") {
                cargo = "LIDER";
            } else if (usuario.cargo === "APONTADOR") {
                cargo = "APONTADOR";
            }
        });
}

function tabelaPontos() {

    fetch("https://aed-cargo-ponto.herokuapp.com/api/ponto?data=" + data, {
            method: "Get",
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => response.json())
        .then(async(funcionarios) => {
            document.querySelector(".innerHTML").innerHTML = "";
            const main2 = document.createElement("div");
            main2.setAttribute("class", "main2");
            main2.innerHTML = `
                <div class="titulos">
                    <h3 class="h3_1">Hora extra<span>50%</span></h3>
                    <h3 class="h3_2">Hora extra<span>100%</span></h3>
                </div>`;
            funcionarios.map((val) => {

                const listaFuncionarios = document.createElement("ul");
                listaFuncionarios.setAttribute("class", "lista_funcionarios");

                const input50 = document.createElement("input");
                input50.setAttribute("class", "valor50");
                input50.setAttribute("type", "text");
                input50.setAttribute("placeholder", "Hora extra 50%");
                input50.setAttribute("value", val.hora_extra_50);

                const input100 = document.createElement("input");
                input100.setAttribute("class", "valor100");
                input100.setAttribute("type", "text");
                input100.setAttribute("placeholder", "Hora extra 100%");
                input100.setAttribute("value", val.hora_extra_100);

                main2.setAttribute("class", "main2");

                main2.appendChild(listaFuncionarios);

                const nomeFuncionario = document.createElement("div");
                nomeFuncionario.setAttribute("class", "nome_funcionario");
                nomeFuncionario.setAttribute("style", "cursor:pointer;");

                const checkbox = document.createElement("input");
                checkbox.setAttribute("class", "checkbox");
                checkbox.setAttribute("type", "checkbox");
                checkbox.setAttribute(
                    "onclick",
                    `onClickFuncionarioCheckbox(${val.empregado.id}, this)`
                );
                if (val.presente == true) {
                    selecionados.push(val.empregado.id);
                    checkbox.setAttribute("checked", "true");
                }

                nomeFuncionario.appendChild(checkbox);
                listaFuncionarios.appendChild(nomeFuncionario);

                listaFuncionarios.appendChild(input50);
                listaFuncionarios.appendChild(input100);
                var nome = val.empregado.nome.split(" ")
                nomeFuncionario.innerHTML +=
                    (nome.length >= 2 ? nome[0] + " " + nome[1] : nome[0]) + 
                    `
                <div class="informacoesExtras" style="display: none;">
                    <h4>Nome: ` +
                        val.empregado.nome +
                    `</h4>
                    <h4>Cargo: ` +
                        val.empregado.cargo +
                    `</h4>
                </div>`;
                document.querySelector(".innerHTML").appendChild(main2);
                funcionariosPontos.push({
                    idFuncionario: val.empregado.id,
                    horaExtra50Element: input50,
                    horaExtra100Element: input100,
                    checkboxElement: checkbox,
                });

            });
            const valor1 = document.querySelectorAll(".valor50");
            const valor2 = document.querySelectorAll(".valor100");

            var timepicker = new TimePicker(valor1.item(0), {
                theme: 'cyan',
                lang: 'pt',
            });
            for (let index = 1; index < valor1.length; index++) {
                const element = valor1.item(index);
                timepicker.setTarget(element);
                timepicker.on('change', function(evt) {
                    var value = (evt.hour || '00') + ':' + (evt.minute || '00');
                    evt.element.value = value;
                });
            }
            for (let index = 0; index < valor2.length; index++) {
                const element = valor2.item(index);
                timepicker.setTarget(element);
                timepicker.on('change', function(evt) {
                    var value = (evt.hour || '00') + ':' + (evt.minute % 15 == 0 ? evt.minute : '00' || '00');
                    evt.element.value = value;
                });
            }

            var nomesFuncionarios = document.querySelectorAll(".nome_funcionario");
            for (var i = 0; i < nomesFuncionarios.length; i++) {
                nomesFuncionarios[i].addEventListener("click", (e) => {
                    if (
                        e.target.querySelector(".informacoesExtras").style.display == "none"
                    ) {
                        e.target.querySelector(".informacoesExtras").style.display =
                            "block";
                    } else {
                        e.target.querySelector(".informacoesExtras").style.display = "none";
                    }
                });
            } // for
        })
        .then(async function() {
            fetch("https://aed-cargo-ponto.herokuapp.com/api/usuario/me", {
                    method: "Get",
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) => response.json())
                .then(async(usuario) => {
                    sessionStorage.setItem("ACESSO", usuario.cargo);
                    const aprovarCheckbox = document.querySelector(".aprovarCheckbox");
                    const revisarCheckbox = document.querySelector(".revisarCheckbox");
                    const presente = document.querySelectorAll(".checkbox");
                    const input50 = document.querySelectorAll(".horaExtra50");
                    const input100 = document.querySelectorAll(".horaExtra100");
                    const texto = document.querySelector("#texto");

                    if (usuario.cargo === "LIDER") {
                        aprovarCheckbox.setAttribute("disabled", "true");
                        revisarCheckbox.setAttribute("disabled", "true");
                        texto.setAttribute("disabled", "true");
                    } else if (usuario.cargo === "APONTADOR") {
                        for (let index = 0; index < input50.length; index++) {
                            presente.item(index).setAttribute("disabled", true);
                            input50.item(index).setAttribute("disabled", "true");
                            input100.item(index).setAttribute("disabled", "true");
                        }
                    }
                });
        });
}

function carregamentoInicial() {
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("data")) {
        data = urlParams.get("data");
        dataTitulo.innerHTML = ` <h2>A data selecionada foi: ` + data + `</h2>`;
        sessionStorage.setItem("DATA", data);

        fetch("https://aed-cargo-ponto.herokuapp.com/api/revisao_ponto?data=" + data, {
                method: "Get",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((e) => e.json())
            .then(async(object) => {
                if (object.status == "APROVADO") {
                    document.querySelector(".aprovarCheckbox").setAttribute("checked", "true");
                } else if (object.status == "REVISAO") {
                    document.querySelector(".revisarCheckbox").setAttribute("checked", "true");
                }
                texto.value = object.observacao;
            });

        tabelaPontos();
    } else {
        window.location.href = "../index.html";
    }
}

salvarBTN.addEventListener("click", (e) => {
    if (sessionStorage.getItem("ACESSO") == "LIDER") {
        addPontos();
        addRevisao();
    } else if (sessionStorage.getItem("ACESSO") == "APONTADOR") {
        addRevisao();
    } else if (sessionStorage.getItem("ACESSO") == "ADMIN") {
        addPontos();
        addRevisao();
    }
});

function addPontos() {
    var body = [];

    funcionariosPontos.forEach((element) => {
        var hora50 = element.horaExtra50Element.value.split(":");
        var hora100 = element.horaExtra100Element.value.split(":");

        if ((hora50.length > 1 && Number(hora50[1]) % 15 != 0) || (hora100.length > 1 && Number(hora100[1] % 15 != 0))) {
            const msg = "Horário extra necessita ser multiplo de 15";
            alert(msg);
            throw msg;
        }

        hora50 = hora50.join(":");
        hora100 = hora100.join(":");

        body.push({
            idFuncionario: element.idFuncionario,
            hora_extra_50: hora50,
            hora_extra_100: hora100,
            presente: selecionados.some((id) => id == element.idFuncionario),
        });
    });

    fetch("https://aed-cargo-ponto.herokuapp.com/api/ponto?data=" + data, {
        method: "Post",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    }).then((response) => response);
}

function addRevisao() {
    var checkAprovado = document.querySelector(".aprovarCheckbox").checked;
    var checkRevisao = document.querySelector(".revisarCheckbox").checked;
    var status = "";

    if (sessionStorage.getItem("ACESSO") == "APONTADOR" && (!checkAprovado && !checkRevisao)) {
        const msg = "Selecionar uma das duas opções para salvar";
        alert(msg);
        throw "Selecionar uma das duas opções para salvar";
    }

    if (checkAprovado) {
        status = "APROVADO";
    } else if (checkRevisao) {
        status = "REVISAO";
    } else {
        status = "CADASTRADO";
    }

    fetch("https://aed-cargo-ponto.herokuapp.com/api/revisao_ponto", {
        method: "Post",
        body: JSON.stringify({
            data: sessionStorage.getItem("DATA"),
            status: status,
            observacao: document.querySelector("#texto").value
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    }).then(async() => { alert("Informações salvas") });
}

function onClickFuncionarioCheckbox(id, element) {
    console.log(element.checked);
    if (element.checked) {
        selecionados.push(id);
    } else {
        selecionados = selecionados.filter((e) => e !== id);
    }
}