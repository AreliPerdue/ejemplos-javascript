class Usuario {
    constructor(nombre, email, foto) {
        this.nombre = nombre;
        this.email = email;
        this.foto = foto;
    }


    mostrar() {
        return `
        <div class="card">
            <img src="${this.foto}" alt="${this.nombre}">
            <h3>${this.nombre}</h3>
            <p>${this.email}</p>
        </div>
        `;
    }
}

const renderUsuarios = (usuarios) => {
    const contenedor = document.getElementById("usuarios");
    contenedor.innerHTML = usuarios.map(u => u.mostrar()).join("");
};

// promesa con async / await para consumir API

const obtenerUsuarios = async (cantidad =5 ) => {
    try {
        const respuesta 
            = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
        const data = await respuesta.json();

        let listaUsuarios = [];
        data.results.forEach((u)=> {
            listaUsuarios.push(new Usuario(u.name.first, u.email, u.picture.medium))
        });

        renderUsuarios(listaUsuarios);
    }catch(error) { 
        console.error("occurrio un error al obtener los datos de usuario", error);
    }
}

//Evento de boton
const boton =document.getElementById("btnCargar");
boton.addEventListener("click", () => obtenerUsuarios(3));