import axios from "axios"
import { useEffect, useState } from "react"


const useInsert=(e,inputData,invalidData,url)=>{

   
  const [isSubmit, setisSubmit] = useState(false)
  const [toast, settoast] = useState({
    isActive: false
    , toastmessege: false
  })
  useEffect(async (e)=>{  
     
    e.preventDefault();
        setisSubmit(true)
        if (Object.keys(invalidData).length === 0 && isSubmit) {
          try {
            const response = await axios.post('http://localhost:2000/router/'+url, inputData)
            settoast({ isActive: true, toastmessege: response.status === 200 })
    
            setTimeout(() => {
            //   navigate('/viewtask')
            }, 2000);
    
          } catch (error) {
            settoast({ isActive: true, toastmessege:false })
            setTimeout(() => {
            //   navigate('/')
            }, 2000);
          }
    
          
        }
    
    
      })
      return {toast}
}
export default useInsert