const loginFormEl = document.getElementById("loginForm")
const emailLoginEl = document.getElementById("emailLogin")
const senhaLoginEl = document.getElementById("senhaLogin")

function fazerLogin() {
    const users = JSON.parse(localStorage.getItem("users"))
    if(!users) {
        alert("Não tem nenhum usuário cadastrado no sistema!");
        return;
    }
    
    const email = emailLoginEl.value;
    const senha = senhaLoginEl.value;

    const user = users.find(user => user.email === email && user.senha === senha)

    if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        const href = window.location.href.split("login");

        window.location.href = href[0].concat('bemvindo', href[1] ?? "");
    } else {
        alert("E-mail ou senha incorreto, tente novamente!")
    }
}

loginFormEl.addEventListener("submit", (e) => {
    e.preventDefault()

    fazerLogin()
})