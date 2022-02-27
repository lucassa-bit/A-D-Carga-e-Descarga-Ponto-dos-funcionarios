const selecionarBTN = document.querySelector(".selecionarBTN");
const exportarBTN = document.querySelector(".exportarBTN");

const dataInicialInput = document.querySelector(".dataInicialInput");

selecionarBTN.addEventListener("click", (e) => onSelectAll());
exportarBTN.addEventListener("click", (e) => exportar());

function exportar() {
  if (selectedIds.length == 0) {
    alert("Selecione ao menos um funcionário!");
    return;
  }

  fetch("https://aed-cargo-ponto.herokuapp.com/api/relatorio/token", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.text())
    .then(async (token) => {
      var dataInicialValue = dataInicialInput.value;

      var data = dataInicialValue.split("-");
      var dataInicial = "";
      var dataFinal = "";
      var diaFinal = new Date(Number(data[0]), Number(data[1]), 0).getDate();
      data = data.reverse().join("/");

      if (document.querySelector(".selectQuinzena").value === "primeira") {
        dataInicial = "01/" + data;
        dataFinal = "15/" + data;
      } else {
        dataInicial = "16/" + data;
        dataFinal = diaFinal + "/" + data;
      }

      var url = `https://aed-cargo-ponto.herokuapp.com/api/relatorio`;
      url += `?data_inicial=${dataInicial}`;
      url += `&data_final=${dataFinal}`;
      url += `&temporaryToken=${token}`;
      selectedIds.forEach((id) => {
        url += `&ids=${id}`;
      });
      window.open(url, "_blank");

      console.log(url);
    });
}

var allFuncionarios = [];
var selectedIds = [];

function onSelectAll() {
  selectedIds = [];
  allFuncionarios.forEach((f) => selectedIds.push(f.id));
  buildFuncionarios(true);
}

function onClickFuncionarioCheckbox(id, element) {
  if (element.checked) {
    selectedIds.push(id);
  } else {
    selectedIds = selectedIds.filter((e) => e !== id);
  }
}

function buildFuncionarios(selectAll) {
  document.querySelector(".funcionarios").innerHTML = "";
  var selectAtt = "";
  if (selectAll) {
    selectAtt = "checked = true";
  }
  allFuncionarios.map((f) => {
    document.querySelector(".funcionarios").innerHTML +=
      `
        <div class="containerFuncionarios">
            <ul class="lista_funcionarios">
                <input class="checkbox" type="checkbox" ` +
      selectAtt +
      ` onclick="onClickFuncionarioCheckbox(${f.id}, this);">
                <h2 class="nome_funcionario">${f.nome}</h2>
            </ul> 
        </div>
        `;
  });
}

function loadFuncionarios() {
  fetch("https://aed-cargo-ponto.herokuapp.com/api/funcionario", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((funcionarios) => {
      allFuncionarios = funcionarios;
      buildFuncionarios(false);
    });
}

loadFuncionarios();
