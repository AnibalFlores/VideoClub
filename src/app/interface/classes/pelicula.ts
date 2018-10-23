export class Pelicula {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    genero: string;
    alquilada: boolean;
    valoracion: number;
    cantidadAlquileres: number;

    constructor(id: number,
        titulo: string,
        descripcion: string,
        imagen: string,
        genero: string,
        alquilada: boolean,
        valoración: number,
        cantidadAlquileres: number) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.genero = genero;
        this.valoracion = valoración;
        this.cantidadAlquileres = cantidadAlquileres;
    }
}
