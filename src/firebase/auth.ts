import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

// Obtiene el servicio de autenticación de Firebase
// utilizando la aplicación inicializada anteriormente.

export const auth = getAuth(app);