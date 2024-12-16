import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditTask from "./pages/EditeTask";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EditTask />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
}

export default App;
