import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  StaffCard,
  ListadoPersonajes,
  PanelPorPersonaje,
  CambiarEmailPanel,
  CambiarPassPanel,
  BannerInicio,
  BannerFooter,
  SoporteInfo,
  NuevoSoporte,
  RegisterPanel,
  Ranking,
  RankingPorClases,
  PanelMiniStats,
  NoticiasCompletas,
  RecuperarCuenta,
  FormularioCambiarPasswordRecu,
  RecuperarPersonaje,
  FormularioCambiarPasswordRecuPersonaje,
  NoticiaIndividual,
} from "./components/index.js";
import {
  Inicio,
  RenderReglas,
  Cuenta,
  PanelUsuario,
  PaginaSoportes,
  PaginaDescarga,
  CalculadoraVida,
  ActivarCuenta,
  ConfirmacionEliminadoPersonaje,
  ConfirmarCambioEmailCuenta,
  ConfirmarAgregarPersonaje,
  Manual,
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
          <Route path="/staff" element={<StaffCard />} />
          <Route element={<ProtectedRoute redirectTo="/panel-de-usuario" />}>
            <Route path="/cuenta" element={<Cuenta />} />
          </Route>
          <Route element={<PrivateRoute redirectTo="/cuenta" />}>
            <Route path="/panel-de-usuario" element={<PanelUsuario />}>
              <Route
                path="lista-de-mis-personajes/:usuario"
                element={<ListadoPersonajes />}
              />

              <Route
                path="lista-de-mis-personajes/:usuario/infoPersonaje"
                element={<PanelPorPersonaje />}
              />
              <Route path="change-password" element={<CambiarPassPanel />} />
              <Route path="change-email" element={<CambiarEmailPanel />} />

              <Route
                path="historial-de-soportes"
                element={<PaginaSoportes />}
              />
              <Route path="soporte" element={<SoporteInfo />} />
              <Route path="nuevo-soporte" element={<NuevoSoporte />} />
            </Route>
          </Route>
          ;
          <Route path="/registrarse" element={<RegisterPanel />} />
          <Route path="/top100" element={<Ranking />} />
          <Route path="/lista-de-descargas" element={<PaginaDescarga />} />
          <Route path="/ranking" element={<RankingPorClases />} />
          <Route path="/ver-personaje" element={<PanelMiniStats />} />
          <Route path="/calculadora-de-vida" element={<CalculadoraVida />} />
          <Route path="/noticias" element={<NoticiasCompletas />} />
          <Route path="/activar-cuenta/:token" element={<ActivarCuenta />} />
          <Route path="/recuperar-cuenta" element={<RecuperarCuenta />}>
            <Route path=":token" element={<FormularioCambiarPasswordRecu />} />
          </Route>
          <Route path="/recuperar-personaje" element={<RecuperarPersonaje />}>
            <Route
              path=":token"
              element={<FormularioCambiarPasswordRecuPersonaje />}
            />
          </Route>
          <Route
            path="/confirmacion-eliminar-personaje/:token"
            element={<ConfirmacionEliminadoPersonaje />}
          />
          <Route
            path="/confirmacion-cambio-email/:token"
            element={<ConfirmarCambioEmailCuenta />}
          />
          <Route
            path="/confirmacion-agregar-personaje/:token"
            element={<ConfirmarAgregarPersonaje />}
          />
          <Route
            path="/ver-informacion-completa-noticia/noticia"
            element={<NoticiaIndividual />}
          />
          <Route path="/manual-del-juego" element={<Manual />} />
        </Routes>
        <BannerFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
