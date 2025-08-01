import { error } from "node:console";
import { prismaClient } from "../lib/db";
import { createHash, hash, randomBytes } from "node:crypto";
import { User } from "../graphql/user";
import jwt from "jsonwebtoken";

export interface CreateUserPayLoad {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const SCT_KEY = "helloworld";

export interface GetUserTokenPayLoad {
  email: string;
  password: string;
}

class UserService {
  private static genHashPassword(salt: any, password: string) {
    const hashPassword = createHash("sha256", salt)
      .update(password)
      .digest("hex");
    return hashPassword;
  }
  public static createUser(payload: CreateUserPayLoad) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32);

    const hashPassword = UserService.genHashPassword(salt, password);
    const c = salt.toString();

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt: c,
        password: hashPassword,
      },
    });
  }

  public static async getUserToken(payload: GetUserTokenPayLoad) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new Error("user not found");
    }

    const userHashPassword = UserService.genHashPassword(user.salt, password);

    if (userHashPassword !== user.password) {
      throw new Error("incorrect password");
    }

    // Generater a token
    const token = jwt.sign({ id: user.id, email: user.email }, SCT_KEY);
    return token;
  }

  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }
}

export default UserService;
