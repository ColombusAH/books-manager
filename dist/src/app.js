"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./products/routes");
// import { productsRouter } from './products/routes';
const app = (0, express_1.default)();
const jsonParser = express_1.default.json();
const port = 3001;
app.use(jsonParser);
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/products', routes_1.router);
app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
});
