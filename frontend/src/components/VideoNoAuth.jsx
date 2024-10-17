export default function VideoNoAuth() {
  // Borramos los datos de auth para que si vuelve a entrar a un enlace de
  // sala, tenga que autenticarse nuevamente
  sessionStorage.setItem("isAuthenticated", "false");
  sessionStorage.setItem("user", "");
  sessionStorage.setItem("rol", "");
  return (
    <div>
      <h1>No tiene permisos para ingresar a la sala solcitada.</h1>
    </div>
  );
}
