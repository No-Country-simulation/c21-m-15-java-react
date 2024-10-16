import { Navigate } from "react-router-dom";

export default function ProtectedCall({ children }) {
  const isAuthenticated = sessionStorage.getItem(location.href) === "true";

  console.log(
    "location href en prot",
    location.href,
    isAuthenticated,
    sessionStorage.getItem(location.href)
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  // return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}
