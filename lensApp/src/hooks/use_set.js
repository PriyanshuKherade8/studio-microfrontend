import { useEffect, useState } from "react"
import fetchModel from "../util/fetch_model"
import useHttp from "./use_http";
//import eventBus from "../eventBus";

// import eventBus from "core/eventBus";
// import { OBJECTS } from "core/events";

const useSet = (slug) => {

const [setObject, setSetObject] = useState()
const [modelURLs, setModelURLs] = useState()
const [materialURLs, setMaterialURLs] = useState()
const [hotspotURLs, setHotspotURLs] = useState()
const [sizeURLs, setSizeURLs] = useState()
const [envURLs, setEnvURLs] = useState()
const [theme, setTheme] = useState()

const { isLoading, error, sendRequest: callAPI } = useHttp();

useEffect(()=>{
  console.log('Hello shell', slug)
    if(slug) {
        console.log('slug shell', slug)
        async function getCollection(slug) {
           console.log( "Shell /studio/set/get/" , slug)
            const response = await fetchModel(
              "/studio/set/get/" + slug,
              callAPI,
              "json"
            );
            console.log('shell response', response)
            return response;  
          }

          async function loadCollection() {
            const response = await getCollection(slug);
            return response;
          }

          loadCollection()
          .then((response) => {
            // console.log('OBJECTS 1', OBJECTS)
            // eventBus.emit(OBJECTS.SET_INIT, {
            //   set: response.set});
            setSetObject(response.set)
            setModelURLs(response.modelURLs)
            setMaterialURLs(response.materialURLs)
            setHotspotURLs(response.hotspotURLs)
            setSizeURLs(response.sizeURLs)
            setEnvURLs(response.envURLs) 
            //setTheme(response.collection.themes[0])           
          })
          .catch((err)=>console.log(err))

          
    }
}, [slug])


return {setObject, modelURLs, materialURLs, hotspotURLs, sizeURLs, envURLs, theme}

}

export default useSet