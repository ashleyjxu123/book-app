import React, { useState, useEffect } from 'react';
import "../styles/LikeButton.css";

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
    const listing = props.listing;
    const listing_id = listing._id;

    // Initial state for rendering - if not in database, the listing has not been liked
    // *****will be changed when login / auth is implemented
    useEffect(() => {
        async function getLikedState(listing_id) {
            const response = await fetch(`http://localhost:5050/likes/listing/${listing_id}`);
            if (!response.ok) {
                const message = `An error occurred, Like: ${response.statusText}`;
                    window.alert(message);
                    return;
            }
    
            const like = await response.json();
            if (like.length === 0) {
                setLiked(false);
            } else {
                setLiked(true);
            }
            return like;
        }

        getLikedState(listing_id);

    }, [listing_id]);

    async function setLikedState() {
        // If listing already exists in db, and liked is true, remove from DB and set liked to false.
        const response = await fetch(`http://localhost:5050/likes/listing/${listing._id}`);

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }
            
        const likes = await response.json();
        if (likes.length != 0) {
            deleteLikedBook(likes[0]._id);

        } else {
            addLikedBook();
        }
        return likes;
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
                toggleLike={() => setLikedState(props.listing_id, props.book_id, props.user_id)}
            />
        </div>
    );

};