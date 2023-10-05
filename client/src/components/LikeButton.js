import React, { useState } from 'react';
import "../styles/LikeButton.css";

const Liked = (props) => {
    const listing = props.listing;
    const liked = props.liked;
    const computedClassName = liked ? "active" : "unactive";
    // onclick={props.setLikedState(!props.liked)}
    return (
        <svg className = {computedClassName}
        xmlns="http://www.w3.org/2000/svg"
        height="18"
        width="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000" strokeWidth="2px" strokeLinecap='round' strokeLinejoin='round'
        onClick={props.clicked}>
            {/* <circle fill="#000000" id="like-circle" r="18" cx="9" cy="9" onClick={props.clicked}/> */}
            
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>

        </svg>

    );

};

export default function LikeButton(props) {
    const [totalLikes, setTotalLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const listing_id = props.listing_id;

    // Initial state for rendering - if not in database, the listing has not been liked
    // *****will be changed when login / auth is implemented
    async function getLikedState(listing_id) {
        const response = await fetch(`http://localhost:5050/likes/listing/${listing_id}`);

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }
            
        const like = await response.json();
        if (!like) {
            setLiked(false);
        } else {
            setLiked(true);
        }
    
        return liked;
    }

    async function setLikedState(listing_id) {
        // If listing already exists in db, and liked is true, remove from DB and set liked to false.
        const response = await fetch(`http://localhost:5050/likes/listing/${listing_id}`);

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }
            
        const like = await response.json();
        if (like && liked === true) {
            setLiked(false);
            deleteLikedBook(like.id);

        } else {
            setLiked(true);
            addLikedBook();
        }
    
        return liked;
    }

    async function deleteLikedBook(id) {
        const response = await fetch(`http://localhost:5050/likes/${id}`, {method: "DELETE"});

        if (!response.ok) {
            const message = `An error occurred, Like: ${response.statusText}`;
                window.alert(message);
                return;
        }

    }

    function LikeButtonClick() {
        setLiked(!liked);
        console.log("CLikced")
    }


    async function addLikedBook(id) {
        // const data
        // const response = await fetch(`http://localhost:5050/likes/${id}`,{
        //     method: "POST",
        //     body: data;
        // });

        // if (!response.ok) {
        //     const message = `An error occurred, Like: ${response.statusText}`;
        //         window.alert(message);
        //         return;
        // }

    }

    return (
        <div className="like-button">            
            <Liked
                listing={listing_id}
                liked={liked}
                clicked={() => LikeButtonClick()}
            />
        </div>
    );

};