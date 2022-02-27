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
  if (vinculo.options[vinculo.selectedIndex].value === "LIDER") {
    var resultado = "LIDER";
  } else if (vinculo.options[vinculo.selectedIndex].value === "CLT") {
    var resultado = "CLT";
  } else if (vinculo.options[vinculo.selectedIndex].value === "MEI") {
    var resultado = "MEI";
  } else if (vinculo.options[vinculo.selectedIndex].value === "FLUTUANTE") {
    var resultado = "FLUTUANTE";
  } else if (vinculo.options[vinculo.selectedIndex].value === "DIARISTA") {
    var resultado = "DIARISTA";
  }
  const pagamento = select.options[select.selectedIndex].value;
  fetch("https://aed-ponto.herokuapp.com/api/funcionario", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      nome: nome.value,
      cargo: cargo.value,
      vinculo: resultado,
      valor: valor.value,
      rg: RG.value,
      cpf: CPF.value,
      celular: celular.value,
      pis: pis.value,
      pagamento: pagamento,
      pix: pix.value,
      banco: banco.value,
      agencia: agencia.value,
      conta: conta.value,
      operacao: operacao.value,
    }),
  }).then((e) => {
    if (e.status == 201) {
      alert("Criado");
      window.location.href = "./../index.html";
    } else {
      alert("Ocorreu um erro ao cadastrar o funcionário");
    }
  });
});
