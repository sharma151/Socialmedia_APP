import { useState, useEffect } from "react";
import { handleRandomusers } from "../services/Handleapi";
import "../Styles/Sass/Components/Suggestions.scss";
const Suggestions = ({className}) => {
  const [randomUsers, setrandomUsers] = useState([]);
  const fetchRandomUsers = async () => {
    try {
      const response = await handleRandomusers();
      setrandomUsers(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRandomUsers();
  }, []);
  return (
    <div className={`suggestions ${className}`}>
      <p>Suggestions</p>
      <div className="usertiles">
        {randomUsers?.map((user) => (
          <div key={user.id} className="user-tile">
            <div className="icons">
              {user?.picture?.medium && (
                <img src={user?.picture?.medium} alt={user?.picture?.medium} />
              )}
            </div>
            <div className="suggestionname">
              {user?.name?.first} {user?.name?.last}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
