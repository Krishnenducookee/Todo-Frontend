import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Addpage from "./Components/Addpage";
import ViewAllTasks from "./Components/ViewAllTasks";
import History from "./Components/History";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addnew" element={<Addpage />} />
          <Route path="/viewtask" element={<ViewAllTasks />} />
          <Route path="/completedtasks" element={<History />} />
          <Route path="/editTask/:id" element={<Addpage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
