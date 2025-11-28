import React, { Suspense, useEffect } from "react";
const Canvas = React.lazy(() => import("canvas/App"));
//const ControlsPanel = React.lazy(() => import('controlApp/ControlsPanel'));
import eventBus from "core/eventBus";
import { CORE, LENS, SHELL } from "core/events";
import { useGetAllSets } from "./services/common";

export default function SuperApp() {
  const params = new URLSearchParams(window.location.search);
  const value = params.get("set");

  const { data: allData } = useGetAllSets(value);
  const setAllData = allData?.data;

  useEffect(() => {
    if (value) {
      eventBus.emit(CORE.IS_READY, "LENS");
    }
  }, [value]);

  useEffect(() => {
    if (!value) return;
    // if (!setAllData) return;

    eventBus.on(SHELL.PARAMS_INIT, (data) => {
      console.log("data11", data);
    });

    eventBus.emit(LENS.SET_INIT, { set: setAllData });
  }, [value, setAllData]);

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
