import UserService, { CreateUserPayLoad } from "../../services/user";

const queries = {
  hello: () => "Hello from GraphQL!",
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    });
    return token
  },
};

const Mutation = {
  createUser: async (_: any, payload: CreateUserPayLoad) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, Mutation };
