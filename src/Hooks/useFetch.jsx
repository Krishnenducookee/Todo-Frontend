
import { useEffect, useState } from "react";
import { MakeApiCall } from "./MakeApiCall";

const useFetch=({
    url,method,handleResponse,editTaskId
})=>{
    const [fetchedData,setFetchedData]=useState([])
     const urlsplittedarray=url.split('/')
    useEffect(()=>{      
     if(editTaskId)  { 
   MakeApiCall({url,method}).then((response)=>{
        
         setFetchedData(response.data.data)
        handleResponse(response.data.data)
        
   }) 
     }else if(!urlsplittedarray[1]){
        MakeApiCall({url,method}).then((response)=>{
        
            setFetchedData(response.data.data)
           handleResponse(response.data.data)
           
      }) 
     }
     },[])
  
}
export default useFetch;








