import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import app from "./app.js";

connectDB();
app.listen(PORT);

console.log("Servidor iniciado en el puerto", PORT);
