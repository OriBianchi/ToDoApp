window.addEventListener('load', function() {
    /* ---------------------- obtenemos variables globales ---------------------- */


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {

        // Capturamos los datos del formulario
        const nombre = document.querySelector('#inputNombre').value;
        const apellido = document.querySelector('#inputApellido').value;
        const email = document.querySelector('#inputEmail').value;
        const contrasenia = document.querySelector('#inputPassword').value;

        console.log(nombre);

        realizarRegister(nombre, apellido, email, contrasenia)
        event.preventDefault();
        // Llamamos a la API en realizarRegister
        // Si el registro se hizo ok, guardamos el token en 'localStorage'
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    const apiUrl = 'https://ctd-todo-api.herokuapp.com/v1/users';

    function realizarRegister(nom, ape, em, con) {

        const json = JSON.stringify({
            firstName: nom,
            lastName: ape,
            email: em,
            password: con
        });
        console.log(json);
        fetch(apiUrl, {
                method: 'POST',
                body: json,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })

    };

    document.querySelector('#inputNombre').addEventListener('keypress', (e) => {
        if (!validarNombre(e.key)) {
            if (!this.document.querySelector('#errorNombre')) {
                const error = mostrarMensajeEnElemento('El campo nombre no se admiten números.');
                error.setAttribute("id", "errorNombre")
                e.target.parentNode.appendChild(error);
            }
            e.preventDefault();
        } else {
            if (this.document.querySelector('#errorNombre')) {
                e.target.parentNode.removeChild(document.querySelector("#errorNombre"));
            }
        }
    });


    document.querySelector('#inputApellido').addEventListener('keypress', (e) => {

        if (!validarNombre(e.key)) {
            if (!this.document.querySelector('#errorApellido')) {
                const error = mostrarMensajeEnElemento('El campo apellido no se admiten números.');
                error.setAttribute("id", "errorApellido")
                e.target.parentNode.appendChild(error);
            }
            e.preventDefault();
        } else {
            if (this.document.querySelector('#errorApellido')) {
                e.target.parentNode.removeChild(document.querySelector("#errorApellido"));
            }
        }
    });

    document.querySelector('#inputEmail').addEventListener('blur', (e) => {
        if (!this.document.querySelector('#errorEmail')) {
            if (validarEmail(e.target.value) == false) {
                // TODO - falta quitar el mensaje cuando esta bien
                const error = mostrarMensajeEnElemento('El campo email no tiene el formato correcto.');
                error.setAttribute("id", "errorEmail")
                e.target.parentNode.appendChild(error);
                e.preventDefault();
            }

        } else {
            if (this.document.querySelector('#errorEmail'))
                e.target.parentNode.removeChild(document.querySelector("#errorEmail"));
        }

    });

    function validatePass(e) {
        if (validarContrasenia(e.target.value) == false) {
            const error =
                mostrarMensajeEnElemento('La contraseña debe tener mas de 3 dígitos y no puede contener " " ni  "-".');

            e.target.parentNode.appendChild(error);
            e.preventDefault();
        }
    }

    const pass1 = document.querySelector('#inputPassword');
    const pass2 = document.querySelector('#inputPasswordRepetida');

    pass1.addEventListener('keypress', (e) => {
        validatePass(e);
    });

    pass2.addEventListener('keypress', (e) => {
        validatePass(e);
    });

    pass1.addEventListener('blur', (e) => {
        if (validarMinimoContraseña(pass1.value) == false && compararContrasenias(pass1.value, pass2.value) == false) {
            const error = mostrarMensajeEnElemento('La contraseñas debe tener un mínimo de 3 dígitos y deben coincidir.');
            e.target.parentNode.appendChild(error);
        }
    });

    pass2.addEventListener('blur', (e) => {
        if (validarMinimoContraseña(pass2.value) == false && compararContrasenias(pass1.value, pass2.value) == false) {
            const error = mostrarMensajeEnElemento('La contraseñas debe tener un mínimo de 3 dígitos y deben coincidir.');
            e.target.parentNode.appendChild(error);
        }
    });

});