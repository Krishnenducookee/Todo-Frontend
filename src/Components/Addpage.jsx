import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Toast from "./Toast";
import { MakeApiCall } from "../Hooks/MakeApiCall";
import useFetch from "../Hooks/useFetch";

const Addpage = () => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    taskName: " ",
    dueDate: " ",
    workSpace: " ",
    taskDescription: " ",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [toast, setToast] = useState({
    isActive: false,
    toastMessage: false,
  });

  const dropDownMenu = ["Select Workspace of Task", "Personal", "Official"];

  // const isValidationSuccess = useMemo(() => {

  //   const error = {}

  //   const today=new Date()
  //   if (today< inputData.dueDate) {
  //     error.dueDate = "Enter Valid Due Date for Your Task"
  //   }

  //   if (inputData.workSpace==='Select Workspace of Task') {
  //     error.workSpace = "Select Task Workspace"
  //   }

  //     setErrorMessage(error)
  //     return ["dueDate","workSpace"].every((eachkey)=>{
  //       return !!error[eachkey]
  //     })

  // return Object.keys(error).length===0

  // },[inputData])

  const isValidationSuccess = (inputData) => {
    const error = {};
    if (inputData.taskName === " ") {
      error.taskName = "Enter Task Title";
    }
    if (inputData.dueDate === " ") {
      error.dueDate = "Enter Valid Due Date for Your Task";
    }
    if (
      inputData.workSpace === " " ||
      inputData.workSpace === "Select Workspace of Task"
    ) {
      error.workSpace = "Select Task Workspace";
    }
    setErrorMessage(error);
    console.log(error);

    return  !!(error.dueDate || error.taskName || error.workSpace)
  };
  // const [skipFlag,setSkipFlag]=useState(false)
  // const focusTaskName=useRef(null)

  // useEffect(()=>{
  //   focusTaskName.current.focus();
  // },[])

  useFetch({
    url: `editTaskOld/${id}`,
    method: "get",
    skipFlag: !id,
    handleResponse: (response) => {
      setInputData(response);
    },
  });

  const elementClass =
    "appearance-none block w-full mb-3 text-black border border-green-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-900";
  const labelClass =
    "block uppercase tracking-wide text-black text-xs font-bold mb-2 mt-8";

  function showtoast(response) {
    if (response) {
      setToast({ isActive: true, toastMessage: response.status === 200 });
      setTimeout(() => {
        navigate("/viewtask");
      }, 2000);
    } else {
      setToast({ isActive: true, toastMessage: false });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }

  const navigate = useNavigate();

  const saveData = async (e) => {
    e.preventDefault();
    const isInputempty = isValidationSuccess(inputData);
    console.log(isInputempty);
    if (!isInputempty) {
      MakeApiCall({
        url: id ? "editTask" : "addTask",
        method: "post",
        requestBody: inputData,
      }).then((response) => {
        showtoast(response);
      });
    }
  };
  const inputFields = [
    {
      label: "Task",
      name: "taskName",
      type: "text",
      placeholder: "Name of Task",
      elementDiv: "md:w-1/2 md:mb-0",
    },
    {
      label: "Due Date",
      name: "dueDate",
      type: "date",
      placeholder: "Date the Task to be completed",
      elementDiv: "md:w-1/2",
    },
    {
      label: "Decription",
      name: "taskDescription",
      placeholder: "Decription of Task",
      elementDiv: "",
      type: "textarea",
    },
    {
      label: "Workspace",
      name: "workSpace",
      placeholder: "Workspace of Task",
      elementDiv: "",
      type: "select",
    },
  ];

  return (
    <div className="bg-green-300 h-screen">
      {toast.isActive ? <Toast toast={toast.toastMessage} /> : null}
      <div className="pt-16 pl-96">
        <form className="w-full max-w-lg" onSubmit={saveData}>
          <div className="flex flex-wrap -mx-3 mb-6 ">
            {inputFields.map((data, index) => (
              <div className={`w-full px-3 ${data.elementDiv}`}>
                <label className={labelClass}>{data.label}</label>
                <span style={{ color: "red" }}>
                  {errorMessage[data.name] ? errorMessage[data.name] : ""}
                </span>
                {data.type === "select" ? (
                  <select
                    className={elementClass}
                    value={inputData.workSpace}
                    onChange={(e) => {
                      setInputData((preState) => {
                        const newStat = {
                          [data.name]: e.target.value,
                        };
                        isValidationSuccess(newStat);
                        return { ...preState, [data.name]: e.target.value };
                      });
                    }}
                  >
                    {dropDownMenu.map((menuitem, index) => (
                      <option defaultChecked={index === 0}>{menuitem}</option>
                    ))}
                  </select>
                ) : data.type === "textarea" ? (
                  <textarea
                    className={elementClass}
                    value={inputData[data.name]}
                    onChange={(e) => {
                      setInputData( { ...inputData, [data.name]: e.target.value })
                    }}
                    placeholder={data.placeholder}
                  ></textarea>
                ) : (
                  <input
                    className={elementClass}
                    autoFocus={index === 0}
                    type={data.type}
                    value={inputData[data.name]}
                    onChange={(e) => {
                      setInputData((preState) => {
                        const newStat = {
                          [data.name]: e.target.value,
                        };
                        isValidationSuccess(newStat);
                        return { ...preState, [data.name]: e.target.value };
                      });
                    }}
                    placeholder={data.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3"></div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="px-3 md:w-1/2 ">
              <button className=" mt-8 px-4 py-1 border rounded-full text-sm bg-green-500 hover:bg-green-800">
                {id ? "Update Task" : "Add Task"}{" "}
              </button>
            </div>
            <div className="w-full px-3">
              <button className=" mt-8 ml-42  px-4 py-1 border rounded-full text-sm bg-green-500 hover:bg-green-800">
                <Link to={"/"}>Home</Link>{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Addpage;
