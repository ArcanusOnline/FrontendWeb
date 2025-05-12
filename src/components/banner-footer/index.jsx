import { urlImagenes } from "../../assets/urlImagenes";
import "./style.css"
const BannerFooter = () => {
  return (
    <>
      <div className="bannerFooter">
        <ul>
          <li>
            <a href="https://www.facebook.com/ArcanusOnline/" target="_blank">
              <img src={urlImagenes.facebook} alt="Logo Facebook" />
            </a>
          </li>
          <li>
            <a href="https://discord.com/invite/Eqg7zmVj2f" target="_blank">
              <img src={urlImagenes.discord} alt="Logo Discord" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@ArcanusOnline" target="_blank">
              <img src={urlImagenes.youtube} alt="Logo Youtube" />
            </a>
          </li>
          <li>
            <a href="https://www.threads.com/@arcanusonline" target="_blank">
              <img src={urlImagenes.threads} alt="Logo Threads" />
            </a>
          </li>
          <li>
            <a href="https://x.com/ArcanusOnline_" target="_blank">
              <img src={urlImagenes.twitter} alt="Logo Twitter" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/arcanusonline" target="_blank">
              <img src={urlImagenes.instagram} alt="Logo Instagram" />
            </a>
          </li>
          <li>
            <a href="https://www.twitch.tv/arcanusonline" target="_blank">
              <img src={urlImagenes.twitch} alt="Logo Twitch" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export { BannerFooter };
