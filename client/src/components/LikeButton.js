import React, { useState, useEffect } from 'react';
import "../styles/LikeButton.css";

// CHANGE FOR AUTH -- add liked book to users collection, add liked_by user to liked books model

const Liked = (props) => {
    const liked = props.liked;
    const computedClassName = liked ? "active" : "unactive";
    
    return (
        <svg className = {computedClassName}
        xmlns="http://www.w3.org/2000/svg"
        height="18"
        width="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000" strokeWidth="2px" strokeLinecap='round' strokeLinejoin='round'
        onClick={props.toggleLike}>
            {/* <circle fill="#000000" id="like-circle" r="18" cx="9" cy="9" onClick={props.clicked}/> */}
            
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>

        </svg>

    );

};

export default function LikeButton(props) {
    const [totalLikes, setTotalLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const user_id = props.user_id;
    const listing = props.listing;
    const listing_id = listing._id;

    // Initial state for rendering - if not in database, the listing has not been liked
    // *****will be changed when login / auth is implemented
    useEffect(() => {
        async function getLikedState(listing_id) {
            const response = await fetch(`http://localhost:5050/users/${user_id}`);
            if (!response.ok) {
                const message = `An error occurred, Like: ${response.statusText}`;
                    window.alert(message);
                    return;
            }
    
            const user = await response.json();
            if (user.books_liked.indexOf(listing_id) < 0) {
                setLiked(false);
            } else {
                setLiked(true);
            }
            return user;
        }

        getLikedState(listing_id);

    }, [listing_id]);

    async function setLikedState() {
        // If listing already exists in books_liked of the user, remove from DB and set liked to false.
        const response = await fetch(`http://localhost:5050/likes/listing/${listing_id}`);

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }
            
        const like = await response.json();
        const books = await getUserLikedBooks();
        console.log(books);
        if (books.indexOf(listing_id) > -1) {
            deleteLikedBook(like._id);
            addToUser(false);

        } else {
            addLikedBook();
            addToUser(true);
        }
        return like;
    }

    async function getUserLikedBooks() {
        const response = await fetch(`http://localhost:5050/users/${user_id}`);

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }

        const user = await response.json();
        return user.books_liked; 
    }

    async function deleteLikedBook(id) {
        const response = await fetch(`http://localhost:5050/likes/${id}`, {method: "DELETE"});

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }

        setLiked(!liked);

    }

    async function addLikedBook() {
        const data = {
            "book_id": listing.book_id,
            "user_id": listing.user_id,
            "listing_id": listing._id,
            "liked_by": user_id,
            "date_created": Date.now(),
        }
        const response = await fetch(`http://localhost:5050/likes/`,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }

        setLiked(!liked);

    }

    async function addToUser(flag) {
        const booksArray = await updateLikedArray(listing_id, flag);

        const data = {
            "books_liked": booksArray,
        }

        const response = await fetch(`http://localhost:5050/users/${user_id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }
    }

    async function updateLikedArray(listing, flag) {
        const response = await fetch(`http://localhost:5050/users/${user_id}`);

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }

        const user = await response.json();
        const books = await user.books_liked;
        if (flag) {
            books.push(listing);
        } else {
            const index = books.indexOf(listing);
            if (index > -1) {
                books.splice(index, 1);
            }
        }
        return books;
    }

    function LikeButtonClick() {
        setLiked(!liked);
        console.log("CLikced")
    }

    return (
        <div className="like-button">            
            <Liked
                listing={listing._id}
                book_id={listing.book_id}
                user_id = {listing.user_id}
                liked={liked}
                clicked={() => LikeButtonClick()}
                toggleLike={() => setLikedState()}
            />
        </div>
    );

};