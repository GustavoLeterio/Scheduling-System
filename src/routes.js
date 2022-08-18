import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/fileController";
import CollaboratorsController from "./app/controllers/CollaboratorController";
import AppointmentController from "./app/controllers/CollaboratorController";
import authMiddleware from "./app/middlewares/auth";
import multer from "multer";
import multerConfig from "./config/multer";
import AppointmentController from "./app/controllers/AppointmentController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

//A partir do comando routes.use(authMiddleware); todas as próximas linhas mostram rotas que necessitam de autenticação.
routes.use(authMiddleware);
routes.put("/users", UserController.update);

//Agendamentos
routes.post("/appointments", AppointmentController.store);

//Listagens
routes.get("/collaborators", CollaboratorsController.index);

//Upload de arquivos
routes.post("/files", upload.single("file"), FileController.store);

export default routes;
