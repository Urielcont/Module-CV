import { loadEnv } from "./config/env";
loadEnv()
import express from "express";
import cvRoutes from "./routes/profesorRoutes";
import { testConnection } from "./config/configDb";
// import morgan from "morgan";
import cors from 'cors';

// servidor de express
const app = express();

app.use(
  cors({
    origin: "*", // URL de frontend
    credentials: true, // Permite cookies y tokens en las solicitudes
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  })
);

// Middleware del servidor
app.use(express.json());

// Rutas
app.use("/api/profesor", cvRoutes);
// PRUEBA
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});



// Funcion para inicar el servidor en el puerto establecido
const startServerExpress = async () => {
  await testConnection();
  try {
    app.listen(process.env.PORT, () => {
      console.log("Servidor listo en el puerto: ",process.env.PORT);
    });

  } catch (error) {
    console.error("Error al conectar el servidor", error);
    process.exit(1); //Terminar el proceso
  }
};

//Iniciar el servidor y configuraciones iniciales
startServerExpress();

