import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface RegistroResponse {
  mensaje: string;
}

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const manejarRegistro = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Complete todos los campos.");
      return;
    }

    try {
      const respuesta = await fetch(
        "https://biblioteca-backend-psi.vercel.app/api/usuarios/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            email,
            password,
          }),
        }
      );

      const datos: RegistroResponse = await respuesta.json();

      if (!respuesta.ok) {
        alert(datos.mensaje);
        return;
      }

      alert("Usuario registrado correctamente");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="home">
      <h1>Registro de usuario</h1>

      <form onSubmit={manejarRegistro}>
        <div>
          <label>Nombre completo</label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Contraseña</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Registro;