const logout = document.querySelector("#logout");

logout.addEventListener('click', (data) => {
    Confirm.open({
        title: 'Logout',
        message: 'Você tem certeza que gostaria de fazer logout?',
        okText: 'logout',
        cancelText: 'exit',
        onOk: () => {
            localStorage.removeItem("token");
            window.location.href = '../index.html'
        },
        oncancel: () => {}
    });
});
