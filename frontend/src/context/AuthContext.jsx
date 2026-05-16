import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext =
  createContext();

export const AuthProvider =
  ({ children }) => {

    const [user,
      setUser] =
        useState(null);

    // 🔥 LOAD USER
    useEffect(() => {

      try {

        const stored =
          JSON.parse(

            localStorage.getItem(
              "user"
            )
          );

        if (stored) {

          setUser(stored);
        }

      } catch (err) {

        console.error(
          "Invalid user data ❌"
        );

        localStorage.removeItem(
          "user"
        );
      }

    }, []);

    // 🔥 LOGIN
    const login = (data) => {

      const userData = {

        _id:
          data._id,

        name:
          data.name,

        email:
          data.email,

        phone:
          data.phone || "",

        token:
          data.token || "",

        role:
          data.role || "patient",
      };

      // ✅ SAVE
      localStorage.setItem(

        "user",

        JSON.stringify(
          userData
        )
      );

      // ✅ UPDATE STATE
      setUser(userData);

      // ✅ TRIGGER
      window.dispatchEvent(
        new Event(
          "userChanged"
        )
      );
    };

    // 🔥 LOGOUT
    const logout = () => {

      localStorage.removeItem(
        "user"
      );

      setUser(null);
    };

    // 🔥 UPDATE USER
    const updateUser =
      (newData) => {

        const updated = {

          ...user,

          ...newData,
        };

        localStorage.setItem(

          "user",

          JSON.stringify(
            updated
          )
        );

        setUser(updated);
      };

    return (

      <AuthContext.Provider
        value={{

          user,

          login,

          logout,

          updateUser,
        }}
      >

        {children}

      </AuthContext.Provider>
    );
  };