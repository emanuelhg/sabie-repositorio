function validaCorreoElectronico(email) {

    let validaMail = /\S+@\S+\.\S+/;
    return validaMail.test(email);

}

function validarNumeros(string) {
    let validaNumero = /[^a-zA-ZñÑ]+|(^$)/
    return validaNumero.test(string);
}

function faltanDatos() {

    avisoRegistro.text("No has ingresado todos los datos requeridos o el formato es incorrecto, verifica y vuelve a intentar.");
    btnVerificar.show();
    $("#modalAviso").modal("show");

}

function correoInvalido() {

    avisoRegistro.text("El formato del correo electrónico es incorrecto. Verifica y vuelve a intentar.");
    btnVerificar.show();
    $("#modalAviso").modal("show");

}

function registroExitoso() {

    avisoRegistro.text("Registro exitoso.");
    btnVerificar.hide();
    $("#modalAviso").modal("show");
    $("[id$=Registro]").val("");

}