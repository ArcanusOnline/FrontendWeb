import { urlImagenes } from "../../assets/urlImagenes";
import "./style.css";
const BannerFooter = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-social-label">SEGUINOS</div>
        <div className="footer-social-icons">
          <a
            href="https://instagram.com/arcanusonline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={urlImagenes.instagram} alt="Instagram" />
          </a>
          <a
            href="https://www.threads.com/@arcanusonline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={urlImagenes.threads} alt="Threads" />
          </a>
          <a
            href="https://www.facebook.com/ArcanusOnline/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={urlImagenes.facebook} alt="Facebook" />
          </a>
          <a
            href="https://x.com/ArcanusOnline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={urlImagenes.twitter} alt="Twitter" />
          </a>
          <a
            href="https://www.youtube.com/@ArcanusOnline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={urlImagenes.youtube} alt="YouTube" />
          </a>
          <a
            href="https://www.twitch.tv/arcanusonline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={urlImagenes.twitch} alt="Twitch" />
          </a>
          <a
            href="https://www.tiktok.com/@arcanusonline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={urlImagenes.tiktok} alt="Tiktok" />
          </a>
          <a
            href="https://discord.arcanusonline.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={urlImagenes.discord} alt="Discord" />
          </a>
        </div>

        <div className="footer-links">
          <a href="#">Soporte</a>
          <span>/</span>
          <a href="#">Staff</a>
          <span>/</span>
          <a href="#">Seguridad</a>
          <span>/</span>
          <a href="#">Términos del Servicio</a>
          <span>/</span>
          <a href="#">Política de Privacidad</a>
          <span>/</span>
          <a href="#">Lista de Cambios</a>
        </div>

        <div className="footer-bottom">
          Copyright © 2025 Arcanus Online.
          <br />
          Todos los derechos reservados - All rights reserved.
        </div>
      </div>
    </>
  );
};

export { BannerFooter };
