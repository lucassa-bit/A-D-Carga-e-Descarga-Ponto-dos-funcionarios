if (localStorage.getItem('token') != null) {
    fetch("https://aed-ponto.herokuapp.com/api/usuario/me", {
            method: "Get",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            if (response.status != 200) throw "token invalido";
        })
        .then(() => {
            window.location.href = './menu/index.html';
        });

}