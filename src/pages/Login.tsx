import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../store/slices/usuarioSlice";
import Swal from "sweetalert2";

//import { auth } from "../firebase/auth";
//import { signInWithEmailAndPassword } from "firebase/auth";


interface Usuario {
  nombre: string;
  email: string;
}

interface LoginResponse {
  mensaje: string;
  token: string;
  usuario: Usuario;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Funcion que se ejecuta cuando el usuario envía el formulario.
  const manejarLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();  //Evita que el formulario recargue la pagina. 


  //Aca se verifica que el usuario haya completado ambos campos 
    if (email.trim() === "" || password.trim() === "") {
Swal.fire({
  icon: "warning",
  title: "Campos incompletos",
  text: "Complete todos los campos.",
});      return;
    }

    try {
      const respuesta = await fetch(
        "https://biblioteca-backend-psi.vercel.app/api/usuarios/login",
        {
          method: "POST",  //POST porque enviamos info al servidor. 
          headers: {       //El backend espera los datos en formato JSON. 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            email,
            password,
          }),
        }
      );

      //Esperamos rta del servidor y la convertimos a JSON.
      const datos: LoginResponse = await respuesta.json();

      if (!respuesta.ok) {  //si falla la rta mosntramos un mensaje de error.
Swal.fire({
  icon: "error",
  title: "Error",
  text: datos.mensaje,
});        return;
      }

      //Guardamos el token para mantener la sesion iniciada. 
      localStorage.setItem("token", datos.token);
      localStorage.setItem("usuario", JSON.stringify(datos.usuario));

      dispatch(  //guarda el usuario autenticado en Redux.
        iniciarSesion({
          usuario: datos.usuario,
          token: datos.token,
        })
      );

    await  Swal.fire({
  icon: "success",
  title: "Bienvenido",
  text: datos.mensaje,
  timer: 1500,
  showConfirmButton: false,
});

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      Swal.fire({
  icon: "error",
  title: "Error",
  text: "No se pudo conectar con el servidor.",
});
    }
  };

  return (
    <div className="home">
      <h1>Iniciar sesión</h1>

      <form onSubmit={manejarLogin}>
        <div>
          <label>Email</label>
          <br />

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Contraseña</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;