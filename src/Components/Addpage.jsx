import {useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Toast from './Toast'
import { MakeApiCall } from '../Hooks/MakeApiCall'
import useFetch from '../Hooks/useFetch'


const Addpage = () => {
  const {id}=useParams()
  const [inputData, setinputData] = useState({ taskName: " ", dueDate: " ", isPersonal: " ",taskDescription:" " })
  const [invalidData, setInvalidData] = useState({})
  const [isSubmit, setisSubmit] = useState(false)
  const [toast, settoast] = useState({
    isActive: false
    , toastmessege: false
  })
    // const focusTaskName=useRef(null)

    // useEffect(()=>{
    //   focusTaskName.current.focus();
    // },[])

    //  const Fetchcall=()=>{

    useFetch({ url: `editTaskOld/${id}`,
    method:'get',editTaskId:id,
    handleResponse:(response)=>{
     setinputData(response)
  }  })

//  }
//    if(id){Fetchcall()}

      function showtoast(response){
        if(response){
          settoast({ isActive: true, toastmessege: response.status===200 })
        setTimeout(() => {
          navigate('/viewtask')
        }, 2000);
        }
       else{ 
        settoast({ isActive: true, toastmessege:false })
        setTimeout(() => {
          navigate('/')
        }, 2000);
      } 
      }
    
  const navigate = useNavigate()

  const validation = (values) => {
    let error = {}
    if (values.taskName === " ") {
      error.taskName = "Enter Task Title"
    }

    if (values.dueDate === " ") {
      error.dueDate = "Enter Valid Due Date for Your Task"
    }
    if (values.isPersonal === " ") {
      error.isPersonal = "Select Task Workspace"
    }
    return error;
  }
  const saveData = async (e) => {
    e.preventDefault();
    setInvalidData(validation(inputData))
    setisSubmit(true)
    if (Object.keys(invalidData).length === 0 && isSubmit) {
      if(id){
       MakeApiCall({url:'editTask',method:'post',requestBody:inputData}).then((response)=>{
        showtoast(response)
           })}
  else{
      MakeApiCall({url:'addTask',method:'post',requestBody:inputData}).then((response)=>{
        showtoast(response)
            } )}}
  }

  const inputFields = [{label:"Task",name:"taskName",type:"text", 
                           placeholder:"Name of Task", elementDiv:"md:w-1/2 md:mb-0"},
                      {label:"Due Date",name:"dueDate",type:"date",
                              placeholder:"", elementDiv:"md:w-1/2"},
                      {label:"Decription",name:"taskDescription",
                               placeholder:"Decription of Task",elementDiv:"",type:"textarea"},
                     {label:"Workspace",name:"isPersonal",
                               placeholder:"",elementDiv:"",type:"select"},
                      ];

  return (
    <div className='bg-green-300 h-screen'>

      {toast.isActive ? <Toast toast={toast.toastmessege} /> : null}
      <div className='pt-16 pl-96'>

        <form className="w-full max-w-lg" onSubmit={saveData}>
        
          
          <div className="flex flex-wrap -mx-3 mb-6 " >
          {inputFields.map((data,index)=>(
            <div className={`w-full px-3 ${data.elementDiv}`}>                
              <label
                className="block uppercase tracking-wide text-black text-xs font-bold mb-2 mt-8">
                  {data.label}
              </label>
              <span style={{ color: "red" }}>{invalidData[data.name] ? invalidData[data.name] : ""}</span>
              {data.type==='select'?
              <select 
              className='appearance-none block w-full mb-3 text-black border border-green-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-900'
              onChange={(e)=>{setinputData({...inputData,[data.name]:e.target.value})}}>
                <option defaultChecked> Select Task's Workspace</option>
                  <option value="Personal" >Personal</option>
                  <option value="Official">Official</option>
                </select>
                :data.type==='textarea'?
                <textarea className='appearance-none block w-full mb-3 text-black border border-green-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-900'
                value={inputData[data.name]}
                onChange={(e)=>{setinputData({...inputData,[data.name]:e.target.value})}}
                placeholder={data.placeholder}>
                </textarea>
                :<input
                className="appearance-none block w-full mb-3 text-black border border-green-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-900"
                autoFocus={index===0}
                type={data.type}
                value={inputData[data.name]}
                onChange={(e)=>{setinputData({...inputData,[data.name]:e.target.value})}}
                placeholder={data.placeholder}
              />}  
            </div>
            ))}
          </div>
           <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
            </div></div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="px-3 md:w-1/2 ">
              <button className=' mt-8 px-4 py-1 border rounded-full text-sm bg-green-500 hover:bg-green-800'>
               {id?"Update Task":"Add Task"}  </button>
              </div>
            <div className="w-full px-3"> 
        <button className=' mt-8 ml-42  px-4 py-1 border rounded-full text-sm bg-green-500 hover:bg-green-800'>
          <a href=' '> <Link to={'/'}>Home</Link></a> </button>
           </div>
         </div>
        </form>
      </div>   
    </div>
  )}
export default Addpage
