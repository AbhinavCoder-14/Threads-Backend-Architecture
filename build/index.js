"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./graphql/index"));
const express5_1 = require("@as-integrations/express5");
// import cors from 'cors';
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = Number(8000);
        app.use(express_1.default.json());
        const gqlServer = yield (0, index_1.default)();
        app.use("/graphql", (0, express5_1.expressMiddleware)(gqlServer));
        app.get("/", (req, res) => {
            res.json({
                message: "server is up and running",
            });
        });
        app.listen(PORT, () => console.log("Server started at", PORT));
    });
}
init();
