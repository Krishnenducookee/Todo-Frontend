import axios from "axios";
import { useEffect, useState } from "react";
import { MakeApiCall } from "./MakeApiCall";

const useFetch=({
    url,method,handleResponse
})=>{
    const [fetchedData,setFetchedData]=useState([])

    useEffect(()=>{
   MakeApiCall({url,method}).then((response)=>{
    debugger;
    setFetchedData(response.data.data)
    handleResponse(fetchedData)})
   
        
     
            
        
    },[url,method,handleResponse])
  
}
export default useFetch;
