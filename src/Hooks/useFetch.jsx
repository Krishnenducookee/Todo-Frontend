
import { useEffect, useState } from "react";
import { MakeApiCall } from "./MakeApiCall";

const useFetch=({
    url,method,handleResponse
})=>{
    const [fetchedData,setFetchedData]=useState([])
 
    useEffect(()=>{      
        
   MakeApiCall({url,method}).then((response)=>{
        
        setFetchedData(response.data.data)
        handleResponse(response.data.data)
        
   }) 
    
    
     },[])
  
}
export default useFetch;








