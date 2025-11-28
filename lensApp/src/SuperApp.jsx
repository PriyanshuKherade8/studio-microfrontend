import React, { Suspense, useEffect } from "react";
const Canvas = React.lazy(() => import("canvas/App"));
//const ControlsPanel = React.lazy(() => import('controlApp/ControlsPanel'));
import eventBus from "core/eventBus";
import { CORE, LENS } from "core/events";
import { useGetAllSets } from "./services/common";

export default function SuperApp() {
  // const { setObject } = useSet("micro")
  const { data: allData } = useGetAllSets("micro");
  const setAllData = allData?.data;
  console.log("insideSuperApp", allData);

  useEffect(() => {
    eventBus.emit(CORE.IS_READY, "LENS");
  }, []);

  useEffect(() => {
    eventBus.emit(LENS.SET_INIT, { set: setAllData });
  }, []);

  return (
    <div style={{ display: "flex", fontFamily: "Arial" }}>
      <Suspense
        fallback={
          <div style={{ backgroundColor: "yellow" }}>Loading 3D app...</div>
        }
      >
        hello from lens app
        <div
          style={{ width: "50%", height: "50%", border: 1, borderColor: "red" }}
        >
          <Canvas />
        </div>
      </Suspense>
    </div>
  );
}
