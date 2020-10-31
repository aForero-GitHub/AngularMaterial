import { Rol } from './Rol';
import { TipoDocumento } from './TipoDocumento';
import { Ciudades } from './Ciudades';
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
    tipoDocumento = new TipoDocumento();
    rol = new Rol();
    ciudad: Ciudades;
}
