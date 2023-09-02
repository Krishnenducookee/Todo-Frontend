
import { useEffect, useRef, useState } from "react";
import { MakeApiCall } from "./MakeApiCall";

const useFetch=({
    url,method,handleResponse,istyping
})=>{
    const [fetchedData,setFetchedData]=useState([])
 
    useEffect(()=>{      
        if(!istyping)
   MakeApiCall({url,method}).then((response)=>{
        
        setFetchedData(response.data.data )
         handleResponse(response.data.data)
   }) 
    
    
     },[])
  
}
export default useFetch;








