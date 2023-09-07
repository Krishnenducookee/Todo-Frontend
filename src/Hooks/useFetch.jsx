
import { useEffect, useState } from "react";
import { MakeApiCall } from "./MakeApiCall";

const useFetch=(
                     {url,method,handleResponse,skipFlag=false}
               )=>{
    const [fetchedData,setFetchedData]=useState([])

    
    useEffect(()=>{      
      if(!skipFlag){
           MakeApiCall({url,method}).then((response)=>{
                   setFetchedData((pre)=>{
                        handleResponse(pre)   
                        return response.data.data})
                     
            }) 
     
      }
     
     },[skipFlag])
  
}
export default useFetch;   








