/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function ProtectedCall({ children }) {
  const isAuthenticated = localStorage.getItem(location.href) === "true";

  console.log("location en prot", location);
  console.log(
    "location href en prot",
    location.href,
    isAuthenticated,
    localStorage.getItem(location.href)
  );

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
          origin: location.origin,
        }}
        replace
      />
    );
  }
  // return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}
