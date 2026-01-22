class Imagen {
    constructor(url) {
        this.direccion = url;
    }

    mostrar() {
        return `
        <div class="card">
            <img src="${this.direccion}" alt="Imagen">
        </div>
        `;
    }
}

const renderImagenes = (imagenes) => {
    const contenedor = document.getElementById("galeria");
    contenedor.innerHTML = imagenes.map(i => i.mostrar()).join("");
}

const obtenerImagenes = async (cantidad = 6) => {
    try {
        const res = await fetch(`https://picsum.photos/v2/list?page=2&limit=${cantidad}`);
        const datos = await res.json();

        // Crear lista de objetos Imagen
        let listImagenes = datos.map(img => new Imagen(img.download_url));

        // Renderizar
        renderImagenes(listImagenes);
    } catch (error) {
        console.error("Error al obtener imágenes:", error);
    }
}

let button = document.getElementById("btnAction");
button.addEventListener("click", () => obtenerImagenes(6));


