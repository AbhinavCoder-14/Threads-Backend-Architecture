import { prismaClient } from "../lib/db";
import {createHash,randomBytes} from 'node:crypto'

export interface CreateUserPayLoad {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

}

class UserService {
  public static createUser(payload: CreateUserPayLoad) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32)

    const hashPassword = createHash('sha256',salt).update(password).digest("hex")

    const c = salt.toString()

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt:c,
        password:hashPassword,
      },
    });
  }
}

export default UserService;