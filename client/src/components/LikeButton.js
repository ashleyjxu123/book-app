import React, { useState } from 'react';

const Liked = (props) => {
    const listing = props.listing;
    // onclick={props.setLikedState(!props.liked)}
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512">
            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
            <circle id="like-circle" r="250" cx="256" cy="256" onClick={props.clicked}/>
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
        console.log("Clicked!");
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