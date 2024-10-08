import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the profile data
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/social-media/profile"
      );
      setProfile(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {profile ? (
        <div>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
          {/* Add more profile details here */}
        </div>
      ) : (
        <p>No profile found</p>
      )}
    </div>
  );
};

export default Profile;
