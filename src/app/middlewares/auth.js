import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth";

export default async (req, res, next) => {
  //authHeaders recebe Bearer Token
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({
      message: "Faça o login para acessar!",
    });
  }

  //Extraio o token do header
  const token = authHeaders.split(" ")[1];

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
};
