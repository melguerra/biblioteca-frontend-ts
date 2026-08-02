import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./slices/usuarioSlice";

// Configuración del Store de Redux, aca se almacena el estado global. 
export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
  },
});

// Tipos de Redux para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;