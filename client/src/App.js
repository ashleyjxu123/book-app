import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './components/Header';


function App() {
  return (
    <div className="wrapper">
      <h1>Title</h1>
      <Header />
      {/* <Routes>
        <Route path="/" element={<Header />} />
      </Routes> */}
    </div>
  );
}

export default App;
