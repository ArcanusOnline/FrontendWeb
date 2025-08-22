import { ReglasIndice, ReglasDesc } from "../../components/index";
import "./style.css";

const RenderReglas = () => {
  return (
    <>
      <div className="reglasContainer">
        <ReglasIndice />
        <ReglasDesc />
      </div>
    </>
  );
};

export { RenderReglas };
