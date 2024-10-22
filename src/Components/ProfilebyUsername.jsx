import { useState } from "react";
import axios from "../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetProfileByUsername = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/social-media/profile/u/${username}`);
      setProfile(response?.data?.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Profile not found or an error occurred");
      toast("Profile not found or an error occurred");
      setProfile(null);
    }
  };

  return (
    <div>
      {/* <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by username"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>} */}

      {profile && (
        <div>
          <h1>{profile.name}</h1>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <p>Bio: {profile.bio}</p>
        </div>
      )}
    </div>
  );
};

export default GetProfileByUsername;
