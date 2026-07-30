import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

    // Verifica que los campos no estén vacíos
  if (titulo.trim() === "" || autor.trim() === "") {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Complete todos los campos.",
    });
    return;
    }

    try {
      const token = localStorage.getItem("token");

  // Si idEditar tiene valor, significa que estamos editando.
  // Si es null, significa que estamos agregando un libro nuevo.
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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el libro.",
      });
      return;
    }

     // Si el libro se guardó correctamente,
    // mostramos un mensaje distinto según la acción realizada.
    
     if (idEditar) {
      await Swal.fire({
        icon: "success",
        title: "Libro actualizado",
        text: "Los datos del libro se actualizaron correctamente.",
        timer: 1800,
        showConfirmButton: false,
      });
    } else {
      await Swal.fire({
        icon: "success",
        title: "Libro agregado",
        text: "El libro se agregó correctamente.",
        timer: 1800,
        showConfirmButton: false,
      });
    }

     // Limpiamos el formulario para volver a dejarlo vacío.
      setTitulo("");
      setAutor("");
      setIdEditar(null);

    // Volvemos a consultar los libros para actualizar la tabla.
      obtenerLibros();
    } catch (error) {
      console.error(error);

      Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error inesperado.",
    });
    }
  };

  const eliminarLibro = async (id: string) => {
    const resultado = await Swal.fire({
    title: "¿Está seguro?",
    text: "Esta acción eliminará el libro definitivamente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (!resultado.isConfirmed) {
    return;
  }

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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el libro.",
      });
      return;
    }

      obtenerLibros();

Swal.fire({
  icon: "success",
  title: "Libro eliminado",
  text: "El libro fue eliminado correctamente.",
  timer: 1800,
  showConfirmButton: false,
});
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