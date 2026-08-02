import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


//define como es un usuario dentro de la aplicacion.
interface Usuario {
  nombre: string;
  email: string;
}

//define estructura del estado global del usuario.
interface UsuarioState {
  usuario: Usuario | null;
  token: string | null;
}

// Estado inicial de Redux.
// Al comenzar la aplicación no hay ningún usuario autenticado.
const initialState: UsuarioState = {
  usuario: null,
  token: null,
};

interface LoginPayload {
  usuario: Usuario;
  token: string;
}

const usuarioSlice = createSlice({
  name: "usuario",

  initialState,

  reducers: {
    iniciarSesion: (state, action: PayloadAction<LoginPayload>) => {
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
    },

    cerrarSesion: (state) => {
      state.usuario = null;
      state.token = null;
    },
  },
});

//Exportamos las acciones para utilizarlas desde otros componentes.
export const { iniciarSesion, cerrarSesion } = usuarioSlice.actions;

//// Exportamos el reducer para agregarlo al Store de Redux.
export default usuarioSlice.reducer;