import { useEffect, useState } from "react";

interface Libro {
  _id: string;
  titulo: string;
  autor: string;
}

function Dashboard() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idEditar, setIdEditar] = useState<string | null>(null);

  useEffect(() => {
    obtenerLibros();
  }, []);

  const obtenerLibros = async () => {
    try {
      const respuesta = await fetch(
        "https://biblioteca-backend-psi.vercel.app/api/libros"
      );

      const datos: Libro[] = await respuesta.json();

      setLibros(datos);
    } catch (error) {
      console.error(error);
    }
  };

  const guardarLibro = async () => {
    if (titulo.trim() === "" || autor.trim() === "") {
      alert("Complete todos los campos.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const url = idEditar
        ? `https://biblioteca-backend-psi.vercel.app/api/libros/${idEditar}`
        : "https://biblioteca-backend-psi.vercel.app/api/libros";

      const metodo = idEditar ? "PUT" : "POST";

      const respuesta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          autor,
        }),
      });

      if (!respuesta.ok) {
        alert("Error al guardar el libro.");
        return;
      }

      setTitulo("");
      setAutor("");
      setIdEditar(null);

      obtenerLibros();
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarLibro = async (id: string) => {
    const confirmar = window.confirm(
      "¿Está seguro que desea eliminar este libro?"
    );

    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");

      const respuesta = await fetch(
        `https://biblioteca-backend-psi.vercel.app/api/libros/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!respuesta.ok) {
        alert("Error al eliminar el libro.");
        return;
      }

      obtenerLibros();
    } catch (error) {
      console.error(error);
    }
  };

  const editarLibro = (libro: Libro) => {
    setTitulo(libro.titulo);
    setAutor(libro.autor);
    setIdEditar(libro._id);
  };

  return (
    <div className="home">
      <h1>Panel de Administración</h1>

      <p>Desde esta pantalla se administrarán los libros.</p>

      <div>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={guardarLibro}>
          {idEditar ? "Actualizar libro" : "Agregar libro"}
        </button>
      </div>

      <hr />

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {libros.map((libro) => (
            <tr key={libro._id}>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>

              <td>
                <button onClick={() => editarLibro(libro)}>
                  Editar
                </button>

                <button onClick={() => eliminarLibro(libro._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;