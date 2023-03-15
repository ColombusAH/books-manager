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
const routes_1 = require("./products/routes");
// import { productsRouter } from './products/routes';
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const jsonParser = express_1.default.json();
const port = 3001;
app.use(jsonParser);
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/products', routes_1.router);
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}.`);
    });
});
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb+srv://hattabavner:demo@cluster0.vp9ynou.mongodb.net/?retryWrites=true&w=majority', {});
            console.log('connected to the db');
        }
        catch (_a) {
            console.log('Error connecting to database');
        }
    });
}
