import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  BannerInicio,
  BannerFooter,
  CambiarPassPanel,
  CambiarEmailPanel,
  RecuperarCuenta,
  RecuperarPersonaje,
} from "./components/index.js";
import {
  Inicio,
  RenderReglas,
  Staff,
  Cuenta,
  Register,
  TablaRanking,
  PaginaDescarga,
  PanelUsuario,
  Ranking,
  MiniEstadisticas,
  CalculadoraVida,
  Noticias,
  ListadoPersonajes,
  ConfigPanelCuenta,
  PanelPorPersonaje,
  ActivarCuenta,
  RecuperarContrasenas,
  CambiarPwRecu,
  ConfirmacionEliminadoPersonaje,
  ConfirmarCambioEmailCuenta,
  CambiarPwRecuPersonaje,
  ConfirmarAgregarPersonaje,
  PaginaSoportes,
  SoporteInfo,
  NuevoSoporte,
} from "./pages/index.js";

import { ProtectedRoute, PrivateRoute } from "./assets/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <BannerInicio />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/reglas" element={<RenderReglas />} />
          <Route path="/staff" element={<Staff />} />
          <Route element={<ProtectedRoute redirectTo="/panel-usuario" />}>
            <Route path="/cuenta" element={<Cuenta />} />
          </Route>
          <Route element={<PrivateRoute redirectTo="/cuenta" />}>
            <Route path="/panel-usuario" element={<PanelUsuario />}>
              <Route
                path="listaMisPersonajes/:usuario"
                element={<ListadoPersonajes />}
              />

              <Route
                path="listaMisPersonajes/:usuario/infoPersonaje"
                element={<PanelPorPersonaje />}
              />
              <Route path="configuracion" element={<ConfigPanelCuenta />}>
                <Route path="cambiarPassword" element={<CambiarPassPanel />} />
                <Route path="cambiarEmail" element={<CambiarEmailPanel />} />
              </Route>
              <Route path="historialDeSoportes" element={<PaginaSoportes />} />
              <Route path="soporte" element={<SoporteInfo />} />
              <Route path="nuevoSoporte" element={<NuevoSoporte />} />
            </Route>
          </Route>
          ;
          <Route path="/register" element={<Register />} />
          <Route path="/top100" element={<TablaRanking />} />
          <Route path="/esperandoDescarga" element={<PaginaDescarga />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/showInfoPersonaje" element={<MiniEstadisticas />} />
          <Route path="/calculadoraVida" element={<CalculadoraVida />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/activarCuenta/:token" element={<ActivarCuenta />} />
          <Route path="/recoveryPasswords" element={<RecuperarContrasenas />}>
            <Route path="recuperarCuenta" element={<RecuperarCuenta />}>
              <Route path=":token" element={<CambiarPwRecu />} />
            </Route>
            <Route path="recuperarPersonaje" element={<RecuperarPersonaje />}>
              <Route path=":token" element={<CambiarPwRecuPersonaje />} />
            </Route>
          </Route>
          <Route
            path="/eliminarPersonajeEnCuenta/:token"
            element={<ConfirmacionEliminadoPersonaje />}
          />
          <Route
            path="/confirmarCambioDeMail/:token"
            element={<ConfirmarCambioEmailCuenta />}
          />
          <Route
            path="/agregarPersonajeEnCuenta/:token"
            element={<ConfirmarAgregarPersonaje />}
          />
        </Routes>
        <BannerFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
