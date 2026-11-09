const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    btnMenu.setAttribute("aria-expanded", aberto);
});

menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("aberto");
    });
});

const btnTema = document.getElementById("btn-tema");

function aplicarTema(escuro) {
    document.body.classList.toggle("escuro", escuro);
    btnTema.textContent = escuro ? "☀️" : "🌙";
}

aplicarTema(localStorage.getItem("tema") === "escuro");

btnTema.addEventListener("click", function () {
    const escuro = !document.body.classList.contains("escuro");
    aplicarTema(escuro);
    localStorage.setItem("tema", escuro ? "escuro" : "claro"); 
});

const form = document.getElementById("form-contato");
const modal = document.getElementById("modal");
const btnFechar = document.getElementById("btn-fechar");


function mostrarErro(idCampo, mensagem) {
    const campo = document.getElementById(idCampo);
    campo.parentElement.classList.toggle("invalido", mensagem !== "");
    document.getElementById("erro-" + idCampo).textContent = mensagem;
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault(); 

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();
    let valido = true;

    if (nome === "") {
        mostrarErro("nome", "Informe seu nome.");
        valido = false;
    } else {
        mostrarErro("nome", "");
    }

    if (email === "") {
        mostrarErro("email", "Informe seu e-mail.");
        valido = false;
    } else if (!emailValido(email)) {
        mostrarErro("email", "Digite um e-mail válido (ex.: usuario@dominio.com).");
        valido = false;
    } else {
        mostrarErro("email", "");
    }

  
    if (mensagem === "") {
        mostrarErro("mensagem", "Escreva sua mensagem.");
        valido = false;
    } else {
        mostrarErro("mensagem", "");
    }

    if (valido) {
        form.reset();
        modal.hidden = false;
    }
});

btnFechar.addEventListener("click", function () {
    modal.hidden = true;
});
