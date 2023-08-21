import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  // const [donetask, isDone] = useState({id:true})
  const [pendingTask, setpendingTask] = useState([])
  useEffect(()=>{
       axios.get('http://localhost:2000/router/viewalltask').then((response)=>{
        setpendingTask(response.data.data);
        
       })
  },[])

  const done=(id)=>{
      setpendingTask(pendingTask.filter((t)=>t._id!==id))
      axios.post(`http://localhost:2000/router/done/${id}`).then((response)=>{
        console.log("ok");
      })
  }
  return (
    <div className='bg-green-300 h-screen' >
    <div  className='w-full bg-green-200  h-48'>
    <button className=' mt-11 ml-44 px-4 py-1 border font-semibold rounded-full text-sm bg-green-500 bord hover:bg-green-900'>
         <a href=' '> <Link to={'/viewtask'}>All Upcoming Tasks</Link></a> </button> 
    <button className=' mt-10 ml-96 mr-40 px-4 py-1 border font-semibold rounded-full text-sm bg-green-500 bord hover:bg-green-900'>
          <a href=' '> <Link to={'/completedtasks'}>Completed Tasks</Link></a> </button>          
    </div>
    {/* {done ?( */}
    {pendingTask?.map((data,key)=>(
    
   <div className='p-6 ml-10 mt-5 max-w-sm  bg-white rounded-xl shadow-lg flex items-center space-x-4'>     
  <div class="text-center space-y-2 sm:text-left">
    <div class="space-y-0.5">
      <p class="text-lg text-black font-semibold">
        {data.taskName}
      </p>
      <p class="text-black font-medium">
        {data.dueDate}
      </p>
    </div>
    <button class="px-4 py-1 text-sm text-green-900 font-semibold rounded-full border border-green-200 hover:bg-green-600 hover:border-transparent"
    onClick={()=>{done(data._id)}}>Done</button>
  </div>
    
  
          </div>
          ))}
           {/* ):"none"}
          {done ?( */}
   
          <div>
            <button className=' mt-8 mx-96 px-4 py-1 border font-semibold rounded-full text-sm bg-green-500 bord hover:bg-green-900'>
             <a href=' '> <Link to={'/addnew'}>New Task</Link></a> </button>
            </div> 
    </div>
  )
}

export default Home