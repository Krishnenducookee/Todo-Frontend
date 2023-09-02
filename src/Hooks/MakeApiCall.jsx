import axios from "axios"




export async function MakeApiCall({url,method,requestBody}){
    try {

  return await axios[method](`http://localhost:2000/router/${url}`,requestBody)
    
    
    } catch (error) {
        
    }
            
            
        
}
