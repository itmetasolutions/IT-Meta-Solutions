import TechMeshBg from "./TechMeshBg";
import globeIcon from "../assets/img/globe.png";

export default function SubpageVisualLayer() {
  return (
    <>
      <div className="itms-subpage-mesh" aria-hidden="true">
        <TechMeshBg variant="full" iconColor="#1D4ED8" iconOpacityBase={0.026} />
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

