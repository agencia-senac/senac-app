$(document).ready(function () {

    $(".button-collapse").sideNav();
    $('.modal').modal();
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 3
    });
});

$("#salvarBtn").click(function () {

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

        adicionarProfessorNaTabela(professor);
        Materialize.toast("Professor cadastrado!", 5000);
        $("#modalAdicionar").modal("close");
        $("#cadastroProfessor").trigger("reset");
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

function adicionarProfessorNaTabela(professor) {

    $("#corpoTabela").append("<tr>" + 
                                "<td></td>" +
                                "<td>" + professor.nome + "</td>" +
                                "<td>" + professor.idade + "</td>" +
                                "<td>" + professor.genero + "</td>" +
                                "<td>" + professor.formacao + "</td>" +
                                "<td>" + professor.areaAtuacao + "</td>" +
                                "<td>" + professor.disponibilidadeInicio + "</td>" +
                                "<td>" + professor.disponibilidadeFim + "</td>" +
                             "</tr>");
}