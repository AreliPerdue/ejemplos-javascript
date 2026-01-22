class Usuario {
    constructor(nombre, email, foto, rol = null) {
        this.nombre = nombre;
        this.email = email;
        this.foto = foto;
        this.rol = rol; 
    }

    mostrar() {
        return `
        <div class="card">
            <img src="${this.foto}" alt="${this.nombre}">
            <h3>${this.nombre}</h3>
            ${this.rol ? `<h4>${this.rol}</h4>` : ""}
            <p>${this.email}</p>
        </div>
        `;
    }
}

class UsuarioConRol extends Usuario {
    constructor(nombre, email, foto, rol) {
        super(nombre, email, foto, rol);
    }
}

// Función flecha para renderizar
const renderUsuarios = (usuarios) => {
    const contenedor = document.getElementById("usuarios");
    contenedor.innerHTML = usuarios.map(u => u.mostrar()).join("");
};

// Promesa con async / await para consumir API
const obtenerUsuarios = async (cantidad = 5) => {
    try {
        const respuesta = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
        const datos = await respuesta.json();
        const roles = ["Admin", "Editor", "Viewer"];

        let listaUsuarios = [];

        datos.results.forEach((u, i) => {
            if (i % 2 === 0) {
                // Usuario normal
                listaUsuarios.push(new Usuario(
                    `${u.name.first} ${u.name.last}`,
                    u.email,
                    u.picture.medium
                ));
            } else {
                // Usuario con rol
                listaUsuarios.push(new UsuarioConRol(
                    `${u.name.first} ${u.name.last}`,
                    u.email,
                    u.picture.medium,
                    roles[i % roles.length]
                ));
            }
        });

        renderUsuarios(listaUsuarios);
    } catch (error) {
        console.error("Ocurrió un error al obtener los datos de usuario", error);
    }
};

// Evento de botón
const boton = document.getElementById("btnCargar");
boton.addEventListener("click", () => obtenerUsuarios(10));
