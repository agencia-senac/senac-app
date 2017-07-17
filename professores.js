$(document).ready(function () {

    $(".button-collapse").sideNav();
    $('.modal').modal();
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 3
    });

    inicializarDados();
});

$(window).load(function () {
    
    $(".loading").fadeOut("slow");
})

$("#salvarBtn").click(function (event) {

    event.preventDefault();

    var professor = {
        nome: $("#nome").val().trim(),
        idade: parseInt($("#idade").val().trim()),
        genero: $("input[name=genero]:checked").val(),
        formacao: $("#formacao").val(),
        areaAtuacao: $("#areaAtuacao").val(),
        disponibilidadeInicio: $("#dataInicio").val(),
        disponibilidadeFim: $("#dataFim").val()
    };

    var valido = validar(professor);

    if (valido) {

        //chamar o back-end
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/professor",
            data: JSON.stringify(professor),
            contentType: "application/json",
            dataType: "text",
            success: function () {

                adicionarProfessorNaTabela(professor);
                Materialize.toast("Professor cadastrado!", 5000);
                $("#modalAdicionar").modal("close");
                $("#cadastroProfessor").trigger("reset");
            },
            error: function () {

                Materialize.toast("Ocorreu um erro ao tentar salvar. Tente novamente mais tarde.", 5000);
            }
        });

    } else {

        Materialize.toast("Preencha os campos obrigatórios!", 5000);
    }
});

function validar(professor) {

    // false, 0, "", undefined, null
    if (professor.nome &&
        professor.idade &&
        professor.genero &&
        professor.formacao &&
        professor.areaAtuacao) {

        return true;
    } else {
        return false;
    }
}

var contador = 0;

function adicionarProfessorNaTabela(professor) {

    contador++;
    var idValue = "row" + contador;

    $("#corpoTabela").append("<tr>" +
        "<td>" +
        "<input type='radio' name='edicao' id='" + idValue + "' value='" + idValue + "'>" +
        "<label for='" + idValue + "'></label>" +
        "</td>" +
        "<td>" + professor.nome + "</td>" +
        "<td>" + professor.idade + "</td>" +
        "<td>" + professor.genero + "</td>" +
        "<td>" + professor.formacao + "</td>" +
        "<td>" + professor.areaAtuacao + "</td>" +
        "<td>" + professor.disponibilidadeInicio + "</td>" +
        "<td>" + professor.disponibilidadeFim + "</td>" +
        "</tr>");
}

$("#removerBtn").click(function () {

    var selecionado = $("input[name=edicao]:checked");

    if (selecionado.val()) {
        //logica pra remover
        selecionado.parent().parent().remove();
        Materialize.toast("Removido com sucesso!", 5000);
    } else {
        Materialize.toast("Selecione um registro para remover!", 5000);
    }
});

function inicializarDados() {

    $.get("http://localhost:3000/professor", function (dados) {

        var listaProfessores = dados;

        listaProfessores.forEach(function (professor) {

            adicionarProfessorNaTabela(professor);
        });

        $(".loading").fadeOut("slow");
    });

}