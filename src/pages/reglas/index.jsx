import {
    ReglasIndice,
    ReglasDesc,
  } from "../../components/index";
  
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