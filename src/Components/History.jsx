
import { Link } from "react-router-dom"
import useFetch from "../Hooks/useFetch"
import { useRef, useState } from "react"



const History = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([])
  const scrollRef=useRef()
   
  useFetch({url:'viewCompletedTask',method:'get',handleResponse:(response)=>{
    setUpcomingTasks(response)
}})
 
 const theadarray=["Sl.No","Task","Workspace","Due Date","Description" ,"Issued From",]

  return (
    <div className='bg-green-300 h-screen'>
      <div className="mx-96">
        <button onClick={()=>{scrollRef.current.scrollIntoView({block:'end'})}}>top</button> 
      <table className='border boredr-slate-200 border-separate border-spacing-2'>
    <thead>
      <tr>
      {theadarray.map((data1,index)=>(
    
    <th className='border border-green-900'>{data1}</th>
   
   ))}
      </tr>
    </thead>
    <tbody>
      {upcomingTasks?.map((data,index)=>{
      const mapdata=[index+1,data.taskName,data.isPersonal,data.dueDate,data.taskDescription,data.createdAt]
      return (<tr>
        {mapdata.map((data2,index)=>(
    <td className='border border-green-900'>{data2}</td>
    ))}
        </tr>)
      })}</tbody></table></div>  <div>
    <button ref={scrollRef} className=' mt-8 mx-96 px-4 py-1 border font-semibold rounded-full text-sm bg-green-500 bord hover:bg-green-900'>
     <a href=' '> <Link to={'/'}>Home</Link></a> </button>
    </div ></div>
  )
}

export default History
