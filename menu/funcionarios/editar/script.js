const select = document.querySelector(".select");
const contaPagamento = document.querySelector(".contaPagamento");

const nome = document.querySelector(".nome");
const cargo = document.querySelector(".cargo");
const vinculo = document.querySelector(".selectVinculo");
const valor = document.querySelector(".valor");
const RG = document.querySelector(".RG");
const CPF = document.querySelector(".CPF");
const celular = document.querySelector(".celular");
const pis = document.querySelector(".pis");
const pix = document.querySelector(".pix");
const banco = document.querySelector(".banco");
const agencia = document.querySelector(".agencia");
const conta = document.querySelector(".conta");
const operacao = document.querySelector(".operacao");

const cadastrarBTN = document.querySelector(".cadastrarBTN");

window.addEventListener('load', () => {
    var id = sessionStorage.getItem('ID');

    fetch("https://flash-point-app.herokuapp.com/api/funcionario/find?idEmpregado=" + id, {
            method: "Get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(async(e) => e.json())
        .then((objeto) => {
            const vinculo = document.getElementsByClassName("selectVinculo");
            const tipoPagamento = document.getElementsByClassName("select");

            nome.value = objeto.nome;
            cargo.value = objeto.cargo;
            select.value = objeto.vinculo;
            valor.value = objeto.valorPago;
            RG.value = objeto.rg;
            CPF.value = objeto.cpf;
            celular.value = objeto.celular;
            pis.value = objeto.pis;
            vinculo.item(0).value = objeto.vinculo;

            const contaPagamento = document.querySelector(".contaPagamento");
            const pagamentoPix = document.querySelector("#pagamentoPix");


            if (objeto.tipoPagamento === "CONTA") {
                tipoPagamento.item(0).value = "CONTA";
                contaPagamento.setAttribute("style", "display: flex");
                pagamentoPix.setAttribute("style", "display: none");
                banco.value = objeto.banco;
                agencia.value = objeto.agencia;
                conta.value = objeto.conta;
                operacao.value = objeto.operacao;
            }
            else if (objeto.tipoPagamento === "PIX") {
                tipoPagamento.item(0).value = "PIX";
                contaPagamento.setAttribute("style", "display:none");
                pagamentoPix.setAttribute("style", "display: flex");
                pix.value = objeto.pix;
            }
        })
        .catch((e) => alert(e))
})

select.addEventListener("change", (e) => {
    if (e.target.value === "CONTA") {
        const contaPagamento = document.querySelector(".contaPagamento");
        const pagamentoPix = document.querySelector("#pagamentoPix");
        contaPagamento.setAttribute("style", "display: flex");
        pagamentoPix.setAttribute("style", "display: none");
        return;
    }
    if (e.target.value === "PIX") {
        const contaPagamento = document.querySelector(".contaPagamento");
        const pagamentoPix = document.querySelector("#pagamentoPix");
        contaPagamento.setAttribute("style", "display:none");
        pagamentoPix.setAttribute("style", "display: flex");
        return;
    }
});

cadastrarBTN.addEventListener("click", (e) => {
    fetch("https://flash-point-app.herokuapp.com/api/funcionario/edit", {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                id: sessionStorage.getItem('ID'),
                nome: nome.value,
                cargo: cargo.value,
                vinculo: document.getElementsByClassName("selectVinculo").item(0).value,
                valor: valor.value,
                rg: RG.value,
                cpf: CPF.value,
                celular: celular.value,
                pis: pis.value,
                pagamento:  document.getElementsByClassName("select").item(0).value,
                pix: pix.value,
                banco: banco.value,
                agencia: agencia.value,
                conta: conta.value,
                operacao: operacao.value,
            })
        })
        .then(async () => {
            sessionStorage.removeItem("ID");
            window.location.href = '../index.html';
        });
});