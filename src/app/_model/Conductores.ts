export class Conductores {
    idUsuario: number;
    documento: string;
    nombre: string;
    apellido: string;
    nick: string;
    clave: string;
    estado: boolean;
    cambioContrasena: boolean;
    nombreEmpresa: string;
    direccion: string;
    cargo: string;
    telefono: string;
    celular: string;
    celularAux: string;
    correo: string;
    tipoDocumento: {
        idTipoDocumento: 1,
        nombre: "Cédula"
    };
    rol: {
        "idRol": 4,
        "nombre": "Conductor",
        "descripcion": "Conductor usuaario App"
    };
    ciudad: {
        "idCiudad": 20,
        "nombre": "Alejandria",
        "departamento": {
            "idDepartamento": 5,
            "nombre": "ANTIOQUIA"
        }
    };  
}