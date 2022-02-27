const logout = document.querySelector("#logout");

logout.addEventListener('click', (data) => {
    localStorage.removeItem("token");
    window.location.href = '../index.html';
});