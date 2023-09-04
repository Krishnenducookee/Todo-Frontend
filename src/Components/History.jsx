
import { Link } from "react-router-dom"
import useFetch from "../Hooks/useFetch"
import { useRef, useState } from "react"



const History = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([])
  const toScroll=useRef(null)
  const [isBottom,setIsBottom]=useState(true)
   
  useFetch({url:'viewCompletedTask',method:'get',handleResponse:(response)=>{
    setUpcomingTasks(response)
}})

const scrolling=()=>{

   setIsBottom(!isBottom)
   toScroll.current.scrollIntoView()

}
 const theadarray=["Sl.No","Task","Workspace","Due Date","Description" ,"Issued From",]

  return (
    <div className='bg-green-300 h-screen'>
      <div className="mx-96">
      <center>
        <h1 ref={isBottom?null:toScroll} > History</h1>
      </center>
          <button onClick={()=>{scrolling()}} 
           className={isBottom?`absolute top-0 right-5`:`absolute bottom-0 right-5`}
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
      {upcomingTasks?.map((data,index)=>{
      const mapdata=[index+1,data.taskName,data.isPersonal,data.dueDate,data.taskDescription,data.createdAt]
      return (<tr>
        {mapdata.map((data2,index)=>(
    <td className='border border-green-900'>{data2}</td>
    ))}
        </tr>)
      })}</tbody></table></div>  <div>
        
    <button ref={isBottom?toScroll:null} className=' mt-8 mx-96 px-4 py-1 border font-semibold rounded-full text-sm bg-green-500 bord hover:bg-green-900'>
     <a href=' '> <Link to={'/'}>Home</Link></a> </button>

    </div ></div>
  )
}

export default History
