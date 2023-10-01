import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import './BookListing.css';

// A single element for a listing.
function ListingElement (props) {
    const book = props.book;
    const info = book.volumeInfo;
    const user = props.user;
    const listing = props.listing;
    const [showMore, setShowMore] = useState(false);

    return (
        <div className='booklisting-container'>

            <div className="leftblock">
                <img 
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    height={350}
                />
                <h3>{listing.type}</h3>
            </div>
            <div className='rightblock'>
                <div className='userinfo-container'>
                    <img 
                            src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                            alt="profile pic"
                            height={80}
                        />
                    <div className='profile'>
                        <h2>@{user.username}</h2>
                        <p>{user.zip_code}</p>
                        </div>
                </div>

                <div className="bookinfo-container">
                    <h1>{book.volumeInfo.title}</h1>
                    <h3>{book.volumeInfo.author}</h3>

                    <div className="desc">
                        {showMore ? book.volumeInfo.description : `${book.volumeInfo.description?.substr(0,300)}...`}
                        <button className="btn" onClick={() => setShowMore(!showMore)}>
                        {showMore ? "Show less" : "  Show more"}
                        </button>
                    </div>

                </div> 
            </div>

        </div>

    );
    
} 

// Fetches user and book information from specified listing using URl parameter
export default function BookListing() {
    const [listing, setListing] = useState([]);
    const [book, setBook] = useState([]);
    const [user, setUser] = useState([]);
    const params = useParams();

    // This method fetches the listing, book, and user information from the database.
    // It will execute after rendering.
    useEffect(() => {
        async function getListing() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5050/listings/${id}`);
        
            if (!response.ok) {
                const message = `An error occurred, Listing: ${response.statusText}`;
                window.alert(message);
                return;
            }
        
            const listing = await response.json();
            if (!listing) {
                window.alert(`Listing with id ${id} not found`);
                return;
            }

            return listing;
        }

        async function getBook(id) {
            console.log("book id", id);

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

        async function getUser(id) {
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
            const tempLoadedListing = await getListing();
            const tempLoadedBook = await getBook(tempLoadedListing.book_id);
            const tempLoadedUser = await getUser(tempLoadedListing.user_id);
            setListing(tempLoadedListing);
            setBook(tempLoadedBook);
            setUser(tempLoadedUser);
        }
    
         getAll();
    
        return;
    }, [params.id]);

    if ((typeof book.volumeInfo) === "undefined") {
        return;
    }

    else return (
        <div>
          <div className="listing-component">            
            <ListingElement
                listing={listing}
                book={book}
                user={user}
            />
          </div>
        </div>
      );


      
}