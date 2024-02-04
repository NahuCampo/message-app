import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>,
    ) {}
    async getAll(){
        return await this.mensajeRepository.find();
    }
    async createMensaje(mensajeNuevo: CreateMensajeDto){
        const nuevo  = new Mensaje();
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;

        return this.mensajeRepository.save(nuevo); //Await seguramente
    }

    async updateMensaje(idMensaje: number, mensajeActualizar: CreateMensajeDto){
        const mensajeUpdate = await this.mensajeRepository.findOne(idMensaje)//Revisar
        mensajeUpdate.nick = mensajeActualizar.nick;
        mensajeUpdate.mensaje = mensajeActualizar.mensaje;

        return this.mensajeRepository.save(mensajeUpdate)
    }

    async deleteMensaje(idMensaje: number){
        return this.mensajeRepository.delete(idMensaje);
    }

}
