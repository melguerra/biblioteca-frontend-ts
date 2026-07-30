import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

/*Inicializa el servicio de autenticación de Firebase
 para dejar configurado el login
 mediante Firebase Authentication */

export const auth = getAuth(app);