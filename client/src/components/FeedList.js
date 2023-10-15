import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import LikeButton from './LikeButton.js';
import '../styles/FeedList.css'
import '../styles/LikeButton.css'

// Feeds the listing information back into server to get individual info about that listing's book and user
const FeedElement = (props) => {
  const listing = props.listing;
  const { state } = useLocation();
  const loggedInUser = localStorage.getItem("id");
  const [book, setBook] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getBook(id) {
      // console.log("get book", id);

      const response = await fetch(`http://localhost:5050/books/${id}`);

      // console.log("book id", id);

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
    // console.log("feed element firing");
    return;
  }, [listing]);

  // if ((typeof book.volumeInfo) === "undefined") {
  //   return;
  // } else return (

  return (
    <div className="feed-single">
      <Link className="clickable-feed-single" to={"/listings/" + listing._id}>
        <div className="image-container">
          <img src={book.volumeInfo?.imageLinks.thumbnail} alt={"Book cover of " + book.volumeInfo?.title + " by " + book.volumeInfo?.authors[0]}/>
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
                <h2 className="book-info-title">{book.volumeInfo?.title}</h2>
              {/* </Link> */}
              <h3>{book.volumeInfo?.authors[0]}</h3>
              <div className="location-container">
                <img className="location-icon" src="https://cdn-icons-png.flaticon.com/512/2838/2838912.png" alt="location pin"/>
                <h3>{user.zip_code}</h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <LikeButton
        listing = {listing}
        user_id = {loggedInUser || ""}/>
    </div>

  );
}

// takes the list of listings, loop through and display a FeedElement component for each
const FeedElements = (props) => {
  const listings = props.listings;

  let itemList = listings.map((listing, index) => {
    return <FeedElement listing={listing} key={index}/>
  });
  console.log("feed elements, about to call feed element")
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

  useEffect(() => {
    getAll();
  }, []); 

  return (
    <FeedElements listings={listings}/>
  );
}
