const ingresaTotalYEnvio = () => (checkEnvio.is(':checked')) ? {

    totalAPagar: calculaTotalAPagar(totalCarrito) + 350,
    envioDomicilio: "con envío"

} : {

    totalAPagar: calculaTotalAPagar(totalCarrito),
    envioDomicilio: "sin envío"
};

const mostrarImporteEnvio = () => (checkEnvio.is(':checked')) ? importeEnvio.show('slow') : importeEnvio.hide('slow');

function borrarFiltradoProductos() {
    $(".listadoProductos").html("");
    $(".listadoProductos").append(iniProductos);
}