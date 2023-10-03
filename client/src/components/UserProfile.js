import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useParams } from "react-router";
import '../styles/UserProfile.css'

// UI for profile in this function
const Profile = (props) => {
  const user = props.user;


  return (
    <div>
      
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
      const tempLoadedUser = getUser();
      setUser(tempLoadedUser);
    }

    getAll();
  }, [params.id])
  


  return (
    <div>
      <Profile />
    </div>
  );
}

