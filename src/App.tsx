import React, { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";
import { GET_TICKETS_URL } from "./constants";
import { loadGrid, mapUsersByUserId } from "./utils";
import { Ticket, User } from "./interfaces";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userData, setUserData] = useState<Record<string, User>>({});
  const [gridData, setGridData] = useState<Record<string, Ticket[]>>({});
  const [grouping, setGrouping] = useState<string>("status");
  const [ordering, setOrdering] = useState<string>("priority");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
    fetch(GET_TICKETS_URL)
      .then((resp) => resp.json())
      .then((res) => {
        const { tickets, users } = res;
        console.log("Fetched tickets:", tickets); // Debugging log
        setTickets(tickets);
        setUserData(mapUsersByUserId(users));
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err); // Log any errors
      });
  }, []);

  useEffect(() => {
    if (!tickets.length) return;

    // Log current grouping and ordering
    console.log("Grouping:", grouping);
    console.log("Ordering:", ordering);

    const updatedGridData = loadGrid(tickets, grouping, ordering);
    console.log("Updated grid data:", updatedGridData); // Debugging log

    setGridData(updatedGridData);
    setLoading(false); // Ensure this is called
  }, [grouping, ordering, tickets]);

  const onSetGrouping = useCallback((value: string) => {
    setLoading(true);
    setGrouping(value);
    saveSettings({ grouping: value });
  }, []);

  const onSetOrdering = useCallback((value: string) => {
    setLoading(true);
    setOrdering(value);
    saveSettings({ ordering: value });
  }, []);

  const saveSettings = useCallback((data: Record<string, string>) => {
    for (let key in data) localStorage.setItem(key, data[key]);
  }, []);

  const loadSettings = useCallback(() => {
    setGrouping(localStorage.getItem("grouping") || "status");
    setOrdering(localStorage.getItem("ordering") || "priority");
  }, []);

  return (
    <div className="App">
      <Header
        grouping={grouping}
        setGrouping={onSetGrouping}
        ordering={ordering}
        setOrdering={onSetOrdering}
      />
      {loading ? (
        <Loader />
      ) : (
        <Grid gridData={gridData} grouping={grouping} userIdToData={userData} />
      )}
    </div>
  );
}

export default App;
