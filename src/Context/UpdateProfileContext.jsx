import { createContext, useState, useEffect } from "react";
import { handleFetchMyprofile } from "../services/Handleapi";

export const LoggedinUserProfileData = createContext();

export const UpdateProfileContextProvider = ({ children }) => {
  const [loggedinUserprofileData, setLoggedinUserProfileData] = useState({
    bio: "",
    countryCode: "",
    dob: "",
    firstName: "",
    lastName: "",
    location: "",
    phoneNumber: "",
    coverImage: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await handleFetchMyprofile();
        setLoggedinUserProfileData(response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <LoggedinUserProfileData.Provider
      value={{ loggedinUserprofileData, setLoggedinUserProfileData }}
    >
      {children}
    </LoggedinUserProfileData.Provider>
  );
};
