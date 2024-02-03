import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';

@Controller('mensajes')
export class MensajesController {
    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto){
        return "mensaje Creado";
    }

    @Get()
    getAll(){
        return "Lista de mensajes";
    }

    @Put(":id")
    update(@Body() updateMensajeDto: CreateMensajeDto){
        return "mensaje Actualizado";
    }

    @Delete(":id")
    delete(){
        return "mensaje Eliminado";
    
    }
}
