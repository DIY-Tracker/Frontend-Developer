import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = (props) => {
  console.log(props);
  return (
    <div>
      <h1>My Projects</h1>
      <Link to={`${props.match.url}/add`}>
        <button>Create New Project</button>
      </Link>
    </div>
  )
}

export default UserProfile;