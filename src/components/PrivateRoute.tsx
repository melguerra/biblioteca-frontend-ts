import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem("token"); //verifica si existe JWT.

  if (!token) {  //Si no existe token, redirige al login.
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;//devuelve componente protegido, que seria el dashboard.
}

export default PrivateRoute;