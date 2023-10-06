import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
// import Login from './pages/Login';
import FeedList from './components/FeedList'
import BookListing from './components/BookListing';
import { BrowserRouter } from "react-router-dom";
import UserProfile from './components/UserProfile'


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
        <Route path="/users/:id" element={<UserProfile />}/>
        <Route path="/listings/:id" element={
            <BookListing />
        } />
      </Routes>
    </BrowserRouter>
  )
  ;
}

export default App;
