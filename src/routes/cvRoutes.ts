import { Router } from "express";
import { celebrate, Joi, Segments  } from "celebrate";
const router = Router();


// Definir rutas Para Modulo CV


router.get("/", (req, res) => {
  res.json({ message: "Ruta de CV funcionando" });
});

export default router;
