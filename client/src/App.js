import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
// import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import FeedList from './components/FeedList'
import BookListing from './components/BookListing';
import { BrowserRouter } from "react-router-dom";


function App() {
  // return <NavBar />;
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={ 
              <FeedList />

        }>
         
          <Route index element={<index />}/>
        </Route>
        <Route path="/listings/:id" element={
            <BookListing />
        } />
      </Routes>
    </BrowserRouter>
  )
  ;
}

export default App;
