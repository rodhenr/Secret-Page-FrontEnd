import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../store/slices/tokenSlice";

function VerificarAuth() {
  const location = useLocation();
  const token = useSelector(selectToken);

  return token ? (
    <Navigate to="/secret" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default VerificarAuth;
