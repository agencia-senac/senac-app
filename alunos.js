document.getElementById("incluirBtn").addEventListener("click", incluirRegistro);
document.getElementById("alterarBtn").addEventListener("click", alterarRegistro);

var linhaEdicao = null;

function removerRegistro(elemento) {

    var linha = elemento.parentNode.parentNode;
    document.getElementById("corpoTabela").removeChild(linha);
}

function editarRegistro(elemento) {

    linhaEdicao = elemento.parentNode.parentNode;
    var colunas = linhaEdicao.children;

    document.getElementById("nome").value = colunas[0].innerText;
    document.getElementById("idade").value = colunas[1].innerText;
    document.getElementById("profissao").value = colunas[2].innerText;

    document.getElementById("profissao").focus();
    document.getElementById("idade").focus();
    document.getElementById("nome").focus();

    document.getElementById("incluirBtn").classList.add("hide");
    document.getElementById("alterarBtn").classList.remove("hide");

    var operacoes = document.getElementsByClassName("operacoes");

    for (var i = 0; i < operacoes.length; i++) {
        operacoes[i].classList.add("hide");
    }
}

function incluirRegistro() {

    var aluno = criarAluno();

    var alunoValido = validar(aluno);

    if (alunoValido == true) {
        adicionarAlunoNaTabela(aluno);
        limparFormulario();
        exibirMensagem("Aluno registrado com sucesso!");
    } else {
        exibirMensagem("Todos os campos são obrigatórios!");
    }
}

function validar(aluno) {

    if (aluno.nome == "" || aluno.profissao == "" || isNaN(aluno.idade)) {
        return false;
    } else {
        return true;
    }
}

function exibirMensagem(msg) {
    Materialize.toast(msg, 5000);
}

function adicionarAlunoNaTabela(aluno) {

    var linha = document.createElement("tr");
    var colunaNome = document.createElement("td");
    var colunaIdade = document.createElement("td");
    var colunaProfissao = document.createElement("td");
    var colunaEdicao = document.createElement("td");

    colunaNome.innerText = aluno.nome;
    colunaIdade.innerText = aluno.idade;
    colunaProfissao.innerText = aluno.profissao;
    colunaEdicao.innerHTML = '<a onclick="editarRegistro(this);" class="btn-floating waves-effect waves-light blue"><i class="material-icons">create</i></a> ' +
        '<a onclick="removerRegistro(this);" class="btn-floating waves-effect waves-light red"><i class="material-icons">delete</i></a>';

    colunaEdicao.classList.add("operacoes");

    linha.appendChild(colunaNome);
    linha.appendChild(colunaIdade);
    linha.appendChild(colunaProfissao);
    linha.appendChild(colunaEdicao);

    document.getElementById("corpoTabela").appendChild(linha);
}

function limparFormulario() {
    document.getElementById("formularioAluno").reset();
}

function alterarRegistro() {

    var aluno = criarAluno();
    var alunoValido = validar(aluno);

    if (alunoValido == true) {
        var colunas = linhaEdicao.children;

        colunas[0].innerText = aluno.nome;
        colunas[1].innerText = aluno.idade;
        colunas[2].innerText = aluno.profissao;

        limparFormulario();
        exibirMensagem("Aluno alterado com sucesso!");

        document.getElementById("incluirBtn").classList.remove("hide");
        document.getElementById("alterarBtn").classList.add("hide");

        var operacoes = document.getElementsByClassName("operacoes");

        for (var i = 0; i < operacoes.length; i++) {
            operacoes[i].classList.remove("hide");
        }
    } else {
        exibirMensagem("Todos os campos são obrigatórios!");
    }
}

function criarAluno() {

    var aluno = {
        nome: document.getElementById("nome").value.trim(),
        idade: parseInt(document.getElementById("idade").value),
        profissao: document.getElementById("profissao").value.trim()
    };

    return aluno;
}