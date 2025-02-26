"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
app.use('/tasks', taskRoutes_1.default);
var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
