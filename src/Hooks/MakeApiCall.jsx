import axios from "axios"




export async function MakeApiCall({url,method}){
    try {

   const response=await axios[method](`http://localhost:2000/router/${url}`)
        
    return response

        
    } catch (error) {
        
    }
            
            
        
}