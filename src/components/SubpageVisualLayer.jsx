import TechMeshBg from "./TechMeshBg";
import codeIcon from "../assets/img/Code.png";
import rocketIcon from "../assets/img/Rocket.png";
import sparkleIcon from "../assets/img/sparkle.png";
import globeIcon from "../assets/img/globe.png";
import orbIcon from "../assets/img/orb.png";
import showcaseImage from "../assets/img/Banner Image.png";

export default function SubpageVisualLayer() {
  return (
    <>
      <div className="itms-subpage-mesh" aria-hidden="true">
        <TechMeshBg variant="full" iconColor="#5025d1" iconOpacityBase={0.026} />
      </div>
      <div className="itms-subpage-grid" aria-hidden="true" />

      <div className="itms-subpage-visuals" aria-hidden="true">
        <div className="itms-visual-globe">
          <div className="itms-globe-orbit itms-globe-orbit-a" />
          <div className="itms-globe-orbit itms-globe-orbit-b" />
          <div className="itms-globe-orbit itms-globe-orbit-c" />
          <img src={globeIcon} alt="" className="itms-globe-core" />
          <span className="itms-globe-node itms-globe-node-a" />
          <span className="itms-globe-node itms-globe-node-b" />
          <span className="itms-globe-node itms-globe-node-c" />
        </div>

        <img src={orbIcon} alt="" className="itms-visual-asset itms-visual-orb" />
        <img src={rocketIcon} alt="" className="itms-visual-asset itms-visual-rocket" />
        <img src={codeIcon} alt="" className="itms-visual-asset itms-visual-code" />
        <img src={sparkleIcon} alt="" className="itms-visual-asset itms-visual-sparkle" />

        <div className="itms-visual-screenshot">
          <img src={showcaseImage} alt="" />
        </div>

        <div className="itms-visual-panel itms-visual-panel-a">
          <span />
          <span />
          <span />
        </div>
        <div className="itms-visual-panel itms-visual-panel-b">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </>
  );
}
