import { urlImagenes } from "../../assets/urlImagenes";
import "./style.css"
const BannerFooter = () => {
  return (
    <>
      <div className="bannerFooter">
        <ul>
          <li>
            <a href="https://www.facebook.com" target="_blank">
              <img src={urlImagenes.facebook} alt="Logo Facebook" />
              Facebook
            </a>
          </li>
          <li>
            <a href="https://www.discord.com" target="_blank">
              <img src={urlImagenes.discord} alt="Logo Discord" />
              Discord
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com" target="_blank">
              <img src={urlImagenes.youtube} alt="Logo Youtube" />
              Youtube
            </a>
          </li>
          <li>
            <a href="https://www.threads.com" target="_blank">
              <img src={urlImagenes.threads} alt="Logo Threads" />
              Threads
            </a>
          </li>
          <li>
            <a href="https://www.x.com" target="_blank">
              <img src={urlImagenes.twitter} alt="Logo Twitter" />X
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank">
              <img src={urlImagenes.instagram} alt="Logo Instagram" />
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export { BannerFooter };
