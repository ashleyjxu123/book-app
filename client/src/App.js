import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './pages/Login';
import { BrowserRouter } from "react-router-dom";


function App() {
  // return <NavBar />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<index />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
  ;
}

export default App;
