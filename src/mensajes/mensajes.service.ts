import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';
import { promises } from 'dns';

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>,
    ) {}

    async getAll():Promise<Mensaje[]>{
        return await this.mensajeRepository.find();
    }
    async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje>{
        const nuevo  = new Mensaje();
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;

        return this.mensajeRepository.save(nuevo); //Await seguramente
    }

    async updateMensaje(id: number, mensajeActualizar: CreateMensajeDto): Promise<Mensaje>{
        const mensajeUpdate = await this.mensajeRepository.findOne({
            where: {
                id:id
            }});
        mensajeUpdate.nick = mensajeActualizar.nick;
        mensajeUpdate.mensaje = mensajeActualizar.mensaje;

        return this.mensajeRepository.save(mensajeUpdate)
    }

    async deleteMensaje(idMensaje: number): Promise<any>{
        return this.mensajeRepository.delete(idMensaje);
    }

}
