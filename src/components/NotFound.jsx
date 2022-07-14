import { useLocation, Navigate } from "react-router-dom";

function NotFound() {
  const location = useLocation();

  return <Navigate to="/" state={{ from: location }} replace />;
}

export default NotFound;
