import { useEffect, useState } from "react";
import eventBus from "core/eventBus";
import { CORE } from "core/events";

function useAllAppsReady (allApps) {
    const [readyMap, setReadyMap] = useState({})

    useEffect(()=>{
        const handler = (appName) => {
            console.log("***** App", appName, " is ready ****** ")
      setReadyMap((prev) => ({
        ...prev,
        [appName]: true,
      }));
    };

    eventBus.on(CORE.IS_READY, handler);

    return () => {
      eventBus.off(CORE.IS_READY, handler);
    };

    }, [])

    const isAllAppsReady = allApps.every((app) => readyMap[app]);

    return {isAllAppsReady,  readyMap}

}

export default useAllAppsReady