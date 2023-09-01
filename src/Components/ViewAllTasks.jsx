import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../Hooks/useFetch"
 import { useState } from "react"


const ViewAllTasks = () => {
   const navigate=useNavigate()
   const [upcomingTasks, setUpcomingTasks] = useState([])

   useFetch({ url: 'viewallTask',method:'get',handleResponse:(response)=>{
           setUpcomingTasks(response)
   }  })
    
   
  const edit=(id)=>{
    navigate(`/editTask/${id}`)

  }
 const theadarray=["Sl.No","Task","Workspace","Due Date","Description","Issued From","Action"]

  const done=(id)=>{
      debugger;
      setUpcomingTasks(upcomingTasks.filter((t)=>t._id!==id))
    axios.post(`http://localhost:2000/router/done/${id}`).then(()=>{
    })
}
  return ( 
    <div className='bg-green-300 h-screen'>
        <div className=' mx-96'>
    <table className='border boredr-slate-200 border-separate border-spacing-2'>
  <thead>
     <tr>  
  {theadarray.map((data1,index)=>(
    
    <th className='border border-green-900'>{data1}</th>
   
   ))}
   </tr>
  </thead>
  <tbody>
    {upcomingTasks.map((data,index)=>{ 
      const mapdata=[index+1,data.taskName,data.isPersonal,data.dueDate,data.taskDescription,data.createdAt]
    return (<tr>
     {mapdata.map((data2,index)=>(
    <td className='border border-green-900'>{data2}</td>
    ))}
  <td className='border border-green-900'>
    <button class="px-4 py-1 text-sm text-green-900 font-semibold rounded-full border border-green-200 hover:bg-green-600 hover:border-transparent"
    onClick={()=>{done(data._id)}}>Done</button>
    <button class="px-4 py-1 text-sm text-green-900 font-semibold rounded-full border border-green-200 hover:bg-green-600 hover:border-transparent"
    onClick={()=>{edit(data._id)}}>Edit</button></td></tr>)
    })}
  </tbody></table></div>
  <div>
            <button className=' mt-8 mx-96 px-4 py-1 border font-semibold rounded-full text-sm bg-green-500 bord hover:bg-green-900'>
             <a href=" "> <Link to={'/'}>Home</Link></a> </button>
            </div> </div>
  )
}

export default ViewAllTasks
