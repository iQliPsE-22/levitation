import { createContext, useContext, useState, useEffect } from "react";

interface UserData {
  profilePicture: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      return storedUserData
        ? JSON.parse(storedUserData)
        : {
            profilePicture: null,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
          };
    } else {
      return {
        profilePicture: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      };
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    console.log(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

