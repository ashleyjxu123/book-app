import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import './index.css';

const Listing = (props) => {
    const book = props.book;
    const user = props.user;
    return (
        <div className='booklisting-container'>
            <img 
                src={book.img}
                alt={book.title}
                height={200}
            />

            <h1>{book.title}</h1>
            <h3>{book.author}</h3>
            <p>{book.desc}</p>

        </div>

    );
    
} 

export default function BookListing() {
    const [listing, setListing] = useState([]);
    const [book, setBook] = useState([]);
    const [user, setUser] = useState([]);
    const params = useParams();

    // This method fetches the records from the database.
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
            console.log(id);

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
            console.log(id);

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

    return (
        <div>
          <h3>Book</h3>
          <div className="listing-component">
            <Listing
                listing={listing}
                book={book}
                user={user}
            />
          </div>
        </div>
      );


      
}