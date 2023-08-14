import React, { createContext, useContext, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://apimocha.com/quicksell/data");
        const data = await response.json();

        const userMap = {};
        data.users.forEach((user) => {
          userMap[user.id] = user;
        });

        const uTickets = data.tickets.map((ticket) => ({
          ...ticket,
          user: userMap[ticket.userId],
        }));
        setData(uTickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {data.length > 0 ? (
        children
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="primary" size={80} thickness={5} />{" "}
        </div>
      )}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
