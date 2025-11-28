import React, { Suspense, useEffect } from 'react';
import useReceivedParams from "./hooks/use_received_params";
const Lens = React.lazy(() => import('lens/App'));
//const Canvas = React.lazy(() => import('canvas/App'));
import eventBus from "core/eventBus";
import { SHELL, CORE } from "core/events";
import useAllAppsReady from './hooks/use_all_apps_ready';

export default function App() {
    const params = new URLSearchParams(window.location.search)
    const allApps = ['SHELL', 'CANVAS', 'LENS']
    const {isAllAppsReady,  readyMap} = useAllAppsReady(allApps)
    const { slug, meta, isNewSet } = useReceivedParams(params, isAllAppsReady)
    
    useEffect(()=>{
        eventBus.emit(CORE.IS_READY, 'SHELL')
         eventBus.on("*", (type, e) => console.log("received at shall", type, e) );
    }, [])

    useEffect(()=>{
        console.log("receivedParams", slug, isNewSet, meta)
    }, [slug, isNewSet, meta])

    
return (
<div style={{ display: 'flex', height: '100%', fontFamily: 'Arial' }}>
<Suspense fallback={<div>Loading 3D app...</div>}>

</Suspense>
<Suspense fallback={<div>Loading 3D app...</div>}>
<div style={{width: '100%'}}>
<Lens/>
</div>
</Suspense>

</div>
);
}