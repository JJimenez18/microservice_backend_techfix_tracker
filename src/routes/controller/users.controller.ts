import { Response } from 'express';
import { exitoApi } from '@chtalent/apis-common';
import { IUsersPost } from '../models/users.models';
import { usersPostServices } from '../services/users.services';

export class UsersController {
  public userPost = async (solicitud: IUsersPost, respuesta: Response): Promise<Response> => {
    const user = await usersPostServices({ ...solicitud.body });
    return exitoApi.creado(respuesta, { user: user.resultado });
  };
}
