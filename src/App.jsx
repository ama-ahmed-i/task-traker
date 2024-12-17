import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UpdateTask from "./pages/UpdateTask";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
}

export default App;
