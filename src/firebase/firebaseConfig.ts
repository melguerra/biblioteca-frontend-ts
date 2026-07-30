import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDxdjT_M3E73eiXuNZI48Z38ThNAjh8gmc",
  authDomain: "biblioteca-mdw.firebaseapp.com",
  projectId: "biblioteca-mdw",
  storageBucket: "biblioteca-mdw.firebasestorage.app",
  messagingSenderId: "347245355230",
  appId: "1:347245355230:web:833574f79d4ad20c22224f",
};

// Inicializa Firebase con la configuración del proyecto
export const app = initializeApp(firebaseConfig);