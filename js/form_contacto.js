$(document).ready(function() {
    $('.formContenedor').on('submit', function(e){
      // validation code here
        e.preventDefault();
        $('.formContenedor').trigger("reset");
        $('.modalContacto').modal("show");
    });
  });