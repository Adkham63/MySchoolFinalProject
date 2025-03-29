import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      axios
        .get("/api/profile", { withCredentials: true })
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setReady(true);
        });
    }
  }, [ready]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
