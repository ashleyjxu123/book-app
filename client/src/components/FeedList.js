import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
// import { useParams } from "react-router";
import '../styles/FeedList.css'

// Feeds the listing information back into server to get individual info about that listing's book and user
const FeedElement = (props) => {
  const listing = props.listing;
  const [book, setBook] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getBook(id) {
      // console.log("get book", id);

      const response = await fetch(`http://localhost:5050/books/${id}`);

      console.log("book id", id);

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

    async function getUser(id) {
      // console.log("get user", id);

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
      const tempLoadedBook = await getBook(listing.book_id);
      const tempLoadedUser = await getUser(listing.user_id);

      setBook(tempLoadedBook);
      setUser(tempLoadedUser);
    }

    getAll();
    return;
  }, [listing]);

  if ((typeof book.volumeInfo) === "undefined") {
    return;
  } else return (

    <Link className="clickable-feed" to={"/listings/" + listing._id}>
      <div className="feed-single">
        <div className="image-container">
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={"Book cover of " + book.volumeInfo.title + " by " + book.volumeInfo.authors[0]}/>
          <h3>{listing.type}</h3>
        </div>
        <div className="feed-right-container">
          <div className="feed-text-container">
            <div className="user-info">
              <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" alt="Silhouette of a person"/>
              <h3>@{user.username}</h3>
            </div>
            <div className="book-info-container">
              {/* <Link to={"/listings/" + listing._id}> */}
                <h2 className="book-info-title">{book.volumeInfo.title}</h2>
              {/* </Link> */}
              <h3>{book.volumeInfo.authors[0]}</h3>
              <h3><img className="location-icon" src="https://cdn-icons-png.flaticon.com/512/2838/2838912.png" alt="location pin"/>{user.zip_code}</h3>
            </div>
          </div>
          
          <div className="feed-like-button"> 
            {/* the heart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
          </div>
        </div>
      </div>
    </Link>

  );
}

// takes the list of listings, loop through and display a FeedElement component for each
const FeedElements = (props) => {
  const listings = props.listings;

  let itemList = listings.map((listing, index) => {
    return <FeedElement listing={listing}/>
  });
  return (
    <div>
      <h2 className="wrapper-feed">current listings</h2>
      <div className="feed-container"> 
      {/* will contain all of the feed blocks below */}
        <div>
          {itemList}
        </div>
      </div>
    </div>
  );
}


//FeedList retrieves all listings from server
export default function FeedList() {
  const [listings, setListings] = useState([]);

  //Fetches all listings from db - this will need to change for a logged in user
  useEffect(() => {
    async function getListings() {
        const response = await fetch(`http://localhost:5050/listings/all`);
    
        if (!response.ok) {
            const message = `An error occurred, Listing: ${response.statusText}`;
            window.alert(message);
            return;
        }
    
        const listings = await response.json();
        if (!listings) {
            window.alert(`Listings not found`);
            return;
        }

        return listings;
    }
    async function getAll() {
      const tempLoadedListings = await getListings();
      setListings(tempLoadedListings);
    }
    getAll();
    // console.log("length: " , listings.length);
    return;
  }, [listings.length]); //this might also just need to be listings (rn it's checking that the length of the listings array didn't change before firing useEffect again)

  return (
    <FeedElements listings={listings}/>
  );
}
