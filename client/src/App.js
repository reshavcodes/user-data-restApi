import Form from "./components/form";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
