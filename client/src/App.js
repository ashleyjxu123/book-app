import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
// import "bootstrap/dist/css/bootstrap.min.css";
import FeedList from './components/FeedList'
import BookListing from './components/BookListing';
import Login from './components/Login';
import Register from './components/Register';
import AnonHome from './pages/AnonHome';
import { BrowserRouter } from "react-router-dom";
import UserProfile from './components/UserProfile'


function App() {
  // return <NavBar />;
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<AnonHome/>}>
          <Route index element={<index />}/>
        </Route>
        <Route path="/home" element={ 
              <FeedList />

        }/>
{/*          
          <Route index element={<index />}/>
        </Route> */}
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/listings/:id" element={
            <BookListing />
        } />
      </Routes>
    </BrowserRouter>
  )
  ;
}

export default App;
