import React, { Component } from "react";
import { useState, useEffect } from "react";
import Ticket from "./Ticket";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { useData } from "../Context/DataContext";

const UserDisplay = () => {
  const [typeColumns, setTypeColumns] = useState(new Map());
  const apiData = useData();

  useEffect(() => {
    if (apiData) {
      setTypeColumns(processApiData(apiData));
    }
  }, [apiData]);

  const processApiData = (data) => {
    const newTypeColumns = new Map();
    data.forEach((ticket) => {
      if (!newTypeColumns.has(ticket.user.name)) {
        newTypeColumns.set(ticket.user.name, []);
      }
      newTypeColumns.get(ticket.user.name).push(ticket);
    });
    return newTypeColumns;
  };

  const prioritySorter = () => {
    const newTypeColumns = new Map(typeColumns);
    newTypeColumns.forEach((ticketsArray) => {
      ticketsArray.sort((a, b) => {
        return b.priority - a.priority;
      });
    });
    setTypeColumns(newTypeColumns);
  };

  const nameSorter = () => {
    const newTypeColumns = new Map(typeColumns);
    newTypeColumns.forEach((ticketsArray) => {
      ticketsArray.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    });
    setTypeColumns(newTypeColumns);
  };

  const reset = () => {
    if (apiData) {
      setTypeColumns(processApiData(apiData));
    }
  }

  const getInitials = (name) => {
    if (name == undefined) return null;
    const nameParts = name.split(" ");
    return nameParts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div style={{ background: "#F0F0F0" }}>
      <div className="container-fluid">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
            <Typography
              variant="h2"
              align="right"
              sx={{ fontFamily: "Arial, sans-serif" }}
            >
              Kanban
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            lg={5}
            xl={5}
            container
            justifyContent="flex-end"
            style={{ paddingRight: "1.75%" }}
          >
            <Button onClick={nameSorter}>Sort by Title</Button>
            <Button onClick={prioritySorter}>Sort by Priority</Button>
            <Button onClick={reset}>Reset</Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0.5}
          style={{ justifyContent: "space-around" }}
        >
          {[...typeColumns.keys()].map((key) => (
            <Grid item xs={12} sm={6} md={2} key={key}>
              <Box sx={{ marginBottom: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar sx={{ width: 30, height: 30, background: "#1976D2" }}>
                    {getInitials(key)}
                  </Avatar>
                  <Typography variant="h6" sx={{ m: 1 }}>
                    {key}
                  </Typography>
                  <Typography color="textSecondary">
                    {typeColumns.get(key).length}
                  </Typography>
                </Box>
                {typeColumns.get(key).map((element) => (
                  <div key={element.id}>
                    <Ticket
                      id={element.id}
                      title={element.title}
                      tag={element.tag[0]}
                      // username = {element.user.name}
                      status={element.status}
                      priority={element.priority}
                    />
                  </div>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default UserDisplay;
