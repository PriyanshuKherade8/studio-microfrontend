import { useEffect, useState } from "react";
import eventBus from "core/eventBus";
import { SHELL } from "core/events";

const useReceivedParams = (params, isAllAppsReady) => {
  const [slug, setSlug] = useState();
  const [meta, setMeta] = useState()
  const [isNewSet, setIsNewSet] = useState(false)
  useEffect(() => {
    
    if (!params || !isAllAppsReady) return
      console.log('SHELL', SHELL)
      const meta=JSON.parse(params.get("meta"))
      const slug = params.get("set");
      let isNewSet = false
      if(!slug || slug === "new") {
        isNewSet = true
      } else {
        setSlug(slug);
      }
      console.log("sending hello data", SHELL)
      eventBus.emit(SHELL.PARAMS_INIT, {
        slug: slug
      })
      setIsNewSet(isNewSet)
      setMeta(meta)
    
  }, [params, isAllAppsReady]);
 
  return { slug, meta, isNewSet };
};



export default useReceivedParams;
