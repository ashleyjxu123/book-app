import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";
import '../styles/UserProfile.css';
import Cookies from "js-cookie";


const ProfileBookElement = (props) => {
  const id = props.listing; 
  const user = props.user;
  const userToken = props.userToken;
  // const user = props.user;

  const [book, setBook] = useState([]);
  const [listing, setListing] = useState([]);

  useEffect(() => {
    async function getListing() {
      const response = await fetch(`http://localhost:5050/listings/${id}`);

      if (!response.ok) {
        const message = `An error occurred, Listing: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const listing = await response.json();
      if (!listing) {
          window.alert(`Listing not found. Id: ${id}`);
          return;
      }

      return listing;
    }

    async function getBook(id) {

      const response = await fetch(`http://localhost:5050/books/${id}`);

      if (!response.ok) {
          const message = `An error occurred, Book: ${response.statusText}`;
          window.alert(message);
          return;
      }

      const book = await response.json();
      if (!book) {
          window.alert(`Book with id ${id} not found`);
          return;
      }

      return book;
    }

    async function getAll() {
      // console.log("book listing", listing.book_id);
      const tempLoadedListing = await getListing();
      const tempLoadedBook = await getBook(tempLoadedListing.book_id);
      setListing(tempLoadedListing);
      setBook(tempLoadedBook);
    }

    getAll();
    return;
  }, [id]);

  return (
    <div className="userProfile-single-listing">
      <div className="profile-left-container">
        <div className="image-container">
          <img src={book.volumeInfo?.imageLinks.thumbnail} alt={"Book cover of " + book.volumeInfo?.title + " by " + book.volumeInfo?.authors[0]}/>
          <h3>{listing.type}</h3>
        </div>
        
        <div className="feed-like-button"> 
          {/* the heart icon */}
          {(userToken !== user._id) &&  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
        }
        </div>
      </div>
      <div className="profile-right-container">
          <h4 className="">{book.volumeInfo?.title}</h4>
            {/* <h3>{book.volumeInfo?.authors[0]}</h3> */}
      </div>
    </div>

    // <h2>{book.volumeInfo?.title}</h2>
  );
}


// UI for profile in this function
const Profile = (props) => {
  const user = props.user; //user value passed in from clicking on the nav bar
  const userToken = Cookies.get("token");
  var userID = ''; //user id that is from the logged in user cookies

  // userToken.split('.')[1] -- middle piece of token
  if (((typeof userToken) !== "undefined") && (userToken !== "undefined")) {
    userID = (JSON.parse(atob(userToken.split('.')[1]))['id']);
  }  

  const userListings = user.books_listed;
  console.log("listings", userListings);

  let bookList = userListings?.map((listing, index) => {
    return <ProfileBookElement user={user} listing={listing} userToken={userID}/>
  });

  return (
    <div className="userProfile-container">
      <div className="userProfile-user-info">
        <div className="user-pfp">
          {/* eventually need to pull from user's own pfp  */}
          <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" alt="silhouette of a person" height={100} />
        </div>
        <div className="userProfile-names">
          <h2>{user.full_name}</h2>
          <h3>@{user.username}</h3>
          <div className="userProfile-location-container">
                <img className="location-icon" src="https://cdn-icons-png.flaticon.com/512/2838/2838912.png" alt="location pin"/>
                <h3>{user.zip_code}</h3>
              </div>
        </div>
      </div>
      <h3>active listings:</h3>
      <div className="userProfile-listings">
          {bookList}
      </div>
    </div>
  );
}


export default function UserProfile() {
  const [user, setUser] = useState([]);
  const params = useParams();

  useEffect(() => {
    // gets user from DB
    async function getUser() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/users/${id}`);

      if (!response.ok) {
          const message = `An error occurred, User: ${response.statusText}`;
          window.alert(message);
          return;
      }

      const user = await response.json();
      if (!user) {
          window.alert(`User with id ${id} not found`);
          return;
      }

      return user;
    }

    async function getAll() {
      const tempLoadedUser = await getUser();
      setUser(tempLoadedUser);
    }

    getAll();
  }, [params.id])
  


  return (
    <div>
      <Profile user={user}/>
    </div>
  );
}

