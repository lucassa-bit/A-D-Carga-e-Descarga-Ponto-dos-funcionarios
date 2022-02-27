const mes = document.querySelector(".month");

function getMesTamanho() {
  const splitDate = mes.value.split("-");
  const novaData = new Date(splitDate[0], splitDate[1], 0);
  return novaData;
}

async function criaDias() {
  const final = getMesTamanho().getDate();

  const calendario = document.querySelector(".calendario");

  calendario.innerHTML = "";
  const splitDate = mes.value.split("-");
  const status = await pegaStatus(
    "01",
    String(final).padStart(2, "0"),
    String(splitDate[1]).padStart(2, "0"),
    splitDate[0]
  );
  for (let index = 0; index < status.length; index++) {
    var statusIndex = status[index];
    var mudaCor = "#ebebeb";
    if (statusIndex.status == "APROVADO") {
      mudaCor = "#60f768";
    } else if (statusIndex.status == "REVISAO") {
      mudaCor = "#f76060";
    } else if (statusIndex.status == "CADASTRADO") {
      mudaCor = "#f2f760";
    }

    calendario.innerHTML += `
    <div class="divDatas" style="background-color: ${mudaCor};" style="cursor: pointer;" onclick="novoHref(${
      index + 1
    })">
        <a>${index + 1}</a>
    </div>
`;
  }
}

function novoHref(novaData) {
  const data = mes.value.split("-");
  let dia = novaData + "";
  if (Number(novaData) < 10) {
    dia = "0" + dia;
  }

  window.location.href =
    "./registro de atividade/index.html?data=" +
    dia +
    "/" +
    data[1] +
    "/" +
    data[0];
  console.log(novaData);
}

async function pegaStatus(diaInicial, diaFinal, mes, ano) {
  return fetch(
    "https://aed-cargo-ponto.herokuapp.com/api/revisao_ponto/range?dataInicial=" +
      diaInicial +
      "/" +
      mes +
      "/" +
      ano +
      "&dataFinal=" +
      diaFinal +
      "/" +
      mes +
      "/" +
      ano,
    {
      method: "Get",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  )
    .then((response) => response.json())
    .then((status) => status);
}

mes.addEventListener("change", (e) => {
  criaDias();
});
