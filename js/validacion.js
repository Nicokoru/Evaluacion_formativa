$(document).ready(function () {

   
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]+$/.test(value);
    }, "Solo se permiten letras");

    $.validator.addMethod("telefonoChile", function (value, element) {
        return this.optional(element) || /^(\+?56)?\s?9\s?\d{4}\s?\d{4}$/.test(value);
    }, "Ingresa un teléfono válido, ej: +56 9 1234 5678");

    $.validator.addMethod("mayorDeEdad", function (value, element) {
        if (!value) return true;
        var hoy = new Date();
        var nac = new Date(value);
        var edad = hoy.getFullYear() - nac.getFullYear();
        var m = hoy.getMonth() - nac.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
        return edad >= 18 && edad <= 100;
    }, "Debes ser mayor de 18 años");

    $.validator.addMethod("extensiones", function (value, element, permitidas) {
        if (!value) return true; // el archivo es opcional
        var ext = value.split(".").pop().toLowerCase();
        return permitidas.indexOf(ext) !== -1;
    }, "Formato no permitido (solo PDF, DOC o DOCX)");

    $.validator.addMethod("pesoMaximo", function (value, element, maxMB) {
        if (!element.files || element.files.length === 0) return true;
        return element.files[0].size <= maxMB * 1024 * 1024;
    }, "El archivo supera el tamaño máximo de 5 MB");



    $("#formInscripcion").validate({
        errorElement: "div",
        errorClass: "is-invalid",
        validClass: "is-valid",

        rules: {
            nombre:   { required: true, minlength: 2, soloLetras: true },
            apellido: { required: true, minlength: 2, soloLetras: true },
            email:    { required: true, email: true },
            telefono: { required: true, telefonoChile: true },
            nacimiento: { required: true, date: true, mayorDeEdad: true },
            region:   { required: true },
            "nivel-educativo": { required: true },
            carrera:  { required: true },
            mensaje:  { required: true, minlength: 10, maxlength: 500 },
            curriculum: { extensiones: ["pdf", "doc", "docx"], pesoMaximo: 5 }
        },

        messages: {
            nombre:   { required: "Ingresa tu nombre", minlength: "Debe tener al menos 2 letras" },
            apellido: { required: "Ingresa tu apellido", minlength: "Debe tener al menos 2 letras" },
            email:    { required: "Ingresa tu correo", email: "Ingresa un correo válido, ej: correo@ejemplo.com" },
            telefono: { required: "Ingresa tu teléfono" },
            nacimiento: { required: "Selecciona tu fecha de nacimiento", date: "Fecha no válida" },
            region:   { required: "Selecciona tu región" },
            "nivel-educativo": { required: "Selecciona tu nivel educacional" },
            carrera:  { required: "Selecciona una carrera" },
            mensaje:  {
                required: "Escribe tu mensaje",
                minlength: "Escribe al menos 10 caracteres",
                maxlength: "Máximo 500 caracteres"
            }
        },


        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback d-block");
            if (element.is(":radio")) {
                element.closest("fieldset").append(error);
            } else {
                error.insertAfter(element);
            }
        },

  
        submitHandler: function (form) {
            alert("Formulario enviado correctamente");
            form.submit();
        }
    });

   
    $("#formInscripcion").on("reset", function () {
        $(this).validate().resetForm();
        $(this).find(".is-valid, .is-invalid").removeClass("is-valid is-invalid");
    });
});