import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
// import Login from './pages/Login';
import FeedList from './components/FeedList'
import { BrowserRouter } from "react-router-dom";


function App() {
  // return <NavBar />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ 
          <>
            <NavBar />,
            {/* <div className="feed-container"> */}
              <FeedList />
            {/* </div>  */}
          </>
        }>
         
          <Route index element={<index />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
  ;
}

export default App;
