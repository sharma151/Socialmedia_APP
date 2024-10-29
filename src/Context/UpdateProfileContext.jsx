import { createContext, useState, useEffect } from "react";
import axios from "../services/Api";

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
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/social-media/profile");
        setUserProfileData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
  // console.log(UserprofileData?.data?.data);
  return (
    <UpdatedataContext.Provider value={{ UserprofileData, setUserProfileData }}>
      {children}
    </UpdatedataContext.Provider>
  );
};
