import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Usuario {
  nombre: string;
  email: string;
}

interface UsuarioState {
  usuario: Usuario | null;
  token: string | null;
}

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

export const { iniciarSesion, cerrarSesion } = usuarioSlice.actions;

export default usuarioSlice.reducer;