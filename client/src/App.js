import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="wrapper">
      <NavBar />
      {/* <Routes>
        <Route path="/" element={<Header />} />
      </Routes> */}
    </div>
  );
}

export default App;
