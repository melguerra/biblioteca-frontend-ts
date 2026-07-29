import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cerrarSesion as cerrarSesionRedux } from "../store/slices/usuarioSlice";


function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usuario = useSelector(
  (state: any) => state.usuario.usuario
);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    dispatch(cerrarSesionRedux());

    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>📚 Biblioteca</h2>

      {usuario && <p>Bienvenido, {usuario.nombre}</p>}

      <div className="nav-links">
        <Link to="/">Inicio</Link>

        <Link to="/login">Login</Link>

        <Link to="/registro">Registrarse</Link>

        <button onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;