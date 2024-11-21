import { createContext, useState, useEffect } from "react";
import { handleFetchMyprofile } from "../services/Handleapi";

export const UpdatedataContext = createContext();

export const UpdateProfileContextProvider = ({ children }) => {
  const [UserprofileData, setUserProfileData] = useState({
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

        setUserProfileData(response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <UpdatedataContext.Provider value={{ UserprofileData, setUserProfileData }}>
      {children}
    </UpdatedataContext.Provider>
  );
};
