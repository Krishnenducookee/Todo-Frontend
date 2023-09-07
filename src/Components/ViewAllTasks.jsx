import { Link, useNavigate } from "react-router-dom"
import useFetch from "../Hooks/useFetch"
 import { useRef, useState } from "react"
import { MakeApiCall } from "../Hooks/MakeApiCall"


const ViewAllTasks = () => {
   const navigate=useNavigate()
   const [upcomingTasks, setUpcomingTasks] = useState([])
   const toScroll=useRef(null)
  const [isBottom,setIsBottom]=useState(true)

   useFetch({ url: 'viewallTask',
              method:'get',
              handleResponse:(response)=>{
               setUpcomingTasks(response)
   }  })
    
   const scrolling=()=>{

    setIsBottom(!isBottom)
    toScroll.current.scrollIntoView()
 
 }
 const scrollingButtonPosition=`${isBottom?`top-0 right-5`:`bottom-0 right-5`}`
 
  const edit=(id)=>{
    navigate(`/editTask/${id}`)

  }
 const theadarray=["Sl.No","Task","Workspace","Due Date","Description","Issued From","Action"]

  const done=(id)=>{
      setUpcomingTasks(upcomingTasks.filter((t)=>t._id!==id))
      MakeApiCall({url:`done/${id}`,method:'post'})
    // axios.post(`http://localhost:2000/router/done/${id}`)
}
  return ( 
    <div className='bg-green-300 min-h-screen h-full' style={{position:'relative'}}>
        <div className=' mx-96'>
        <center>
        <h1 ref={isBottom?null:toScroll} > UP coming Tasks</h1>
      </center>
          <button onClick={()=>{scrolling()}} 
          
           className={`absolute rounded-full text-sm bg-green-500 bord hover:bg-green-900 ${scrollingButtonPosition}`}
          >
              {isBottom?<b>Bottom</b>:<b>Top</b>} 
      </button> 
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
      const mapdata=[index+1,data.taskName,data.workSpace,data.dueDate,data.taskDescription,data.createdAt]
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
            <button ref={isBottom?toScroll:null} className=' mt-8 mx-96 px-4 py-1 border font-semibold rounded-full text-sm bg-green-500 bord hover:bg-green-900'>
             <a href=" "> <Link to={'/'}>Home</Link></a> </button>
            </div> </div>
  )
}

export default ViewAllTasks
