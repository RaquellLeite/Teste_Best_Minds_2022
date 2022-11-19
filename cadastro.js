const nomeRegEl = document.getElementById("nomeReg");
const emailRegEl = document.getElementById("emailReg");
const senhaRegEl = document.getElementById("senhaReg");
const confirmarSenhaRegEl = document.getElementById("confirmarSenhaReg");
const regFormEl = document.getElementById("regForm");

function validarErros(nome, email, senha, confirmarSenha) {
    const erros = [];
    
    if (nome.length < 5 || nome.length > 100)
        erros.push("Seu nome precisa ter entre 5 e 100 caracteres");

    if (!/^[A-Za-z\s]*$/.test(nome))
        erros.push("Campo nome pode conter apenas letras e espaços")

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

    if (!emailRegex.test(email))
        erros.push("Precisa inserir um email válido");

    if (senha !== confirmarSenha) 
        erros.push("As senhas não estão iguais");

    if (senha.length < 5 || senha.length > 50)
        erros.push("A senha precisa ter entre 5 e 50 caracteres");

    if (!/[0-9]/.test(senha) || !/[A-Z]/.test(senha))
        erros.push("A senha precisa conter letras maisculas e números");

    if (/ /.test(senha))
        erros.push("A senha não pode conter espaços")

    return erros;
}

function criarAviso (erro, ind, isError) {
    document.querySelectorAll(".aviso").forEach(el => el.remove());

    const divErro = document.createElement("div");
    divErro.classList.add("aviso")
    divErro.classList.add(isError ? "erro-card" : "acerto-card")
    divErro.style.top = `${12*(ind+1) + ind*42}px`;
    spanErro = document.createElement("span");
    spanErro.innerText = erro;
    divErro.append(spanErro);

    setTimeout(() => {
        if (divErro)
            divErro.remove();
    } ,2000 + ind*100)

    setTimeout(() => {
        document.body.append(divErro);
    }, ind*100)
}

function mostrarErros(erros) {
    erros.forEach((erro, ind) => {
        criarAviso(erro, ind, true)
    });
}

function register () {
    const nome = nomeRegEl.value.trim();
    const email = emailRegEl.value.trim();
    const senha = senhaRegEl.value;
    const confirmarSenha = confirmarSenhaRegEl.value;

    const erros = validarErros(nome, email, senha, confirmarSenha);
    
    if (erros.length === 0) {
        let users = JSON.parse(localStorage.getItem("users"))

        if (typeof users === 'object') {
            users = Array.from(users);
        }

        const user = users.find(user => user.email === email);

        if (user) {
            criarAviso("E-mail já em uso", 0, true)
            return 
        }

        if (users) {
            users.push({nome, email, senha});
            localStorage.setItem("users", JSON.stringify(users));
        } else {
            localStorage.setItem("users", JSON.stringify([{nome, email, senha}]));
        }
        criarAviso("Usuário cadastrado!", 0, false);

        setInterval(() => {
            const href = window.location.href.split("cadastro");

            window.location.href = href[0].concat('login', href[1] ?? "");
        }, 1000)
    } else {
        mostrarErros(erros);
    }
}

regFormEl.addEventListener("submit", (e) => {
    e.preventDefault();

    register();
})