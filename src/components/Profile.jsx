import React from "react";
import { useHistory } from "react-router-dom";
import { AUTH_TOKEN, getUserSnippet } from "../helper";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem(AUTH_TOKEN));
  console.log("user", user);
  const history = useHistory();

  return (
    <div className="container">
      <div className="profile-container">
        <div className="user-snippet">
          <h1>{getUserSnippet(user.user.name)}</h1>
        </div>
        <h2>{user.user.name}</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            localStorage.removeItem(AUTH_TOKEN);
            history.push("/");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
