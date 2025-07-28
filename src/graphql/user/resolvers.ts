import UserService, { CreateUserPayLoad } from "../../services/user"


const queries = {

}

const Mutation = {
    createUser:async(_:any,payload:CreateUserPayLoad) =>{
        const res = await UserService.createUser(payload)
        return res.id;
    }

}


export const resolvers = {queries,Mutation}