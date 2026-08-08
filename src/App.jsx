import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import EditStudent from "./pages/EditStudent.jsx";
import {Routes, Route} from "react-router-dom";

import "./App.css";

function App(){
  return(
  <>
  
   
    <Routes>
      <Route path="/" element ={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/addstudent" element={<AddStudent />}/>
      <Route path="/editstudent/:id" element={<EditStudent />}/>
      
    </Routes>
    </>
  )
}
export default App;