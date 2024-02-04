import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
  constructor(private mensajesServices: MensajesService) {}
  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto, @Res() res) {
    this.mensajesServices
      .createMensaje(createMensajeDto)
      .then((mensaje) => {
        res.status(HttpStatus.CREATED).json(mensaje);
      })
      .catch((error) => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error al crear mensaje' });
      });
  }

  @Get()
  getAll(@Res() res) {
    this.mensajesServices
      .getAll()
      .then((mensajesList) => {
        res.status(HttpStatus.OK).json(mensajesList);
      })
      .catch((error) => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error al crear mensaje' });
      });
  }

  @Put(':id')
  update(
    @Body() updateMensajeDto: CreateMensajeDto,
    @Res() res,
    @Param('id') id,
  ) {
    this.mensajesServices
      .updateMensaje(id, updateMensajeDto)
      .then((mensaje) => {
        res.status(HttpStatus.OK).json(mensaje);
      })
      .catch((error) => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error al crear mensaje' });
      });
  }

  @Delete(':id')
  delete(@Res() res, @Param('id') id) {
    this.mensajesServices
      .deleteMensaje(id)
      .then((response) => {
        res.status(HttpStatus.OK).json(response);
      })
      .catch((error) => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error al crear mensaje' });
      });
  }
}
