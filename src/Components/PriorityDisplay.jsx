import React from "react";
import { useState, useEffect } from "react";
import Ticket from "./Ticket";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useData } from "../Context/DataContext";

const PriorityDisplay = () => {
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
      if (!newTypeColumns.has(ticket.priority)) {
        newTypeColumns.set(ticket.priority, []);
      }
      newTypeColumns.get(ticket.priority).push(ticket);
    });
    const unsortedArray = Array.from(newTypeColumns);
    unsortedArray.sort((a, b) => b[0] - a[0]); 
    const sortedMap = new Map(unsortedArray);
    return sortedMap;
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
  };

  const PriorityInfo = {
    4: { name: "Urgent", icon: <PriorityHighIcon /> },
    3: { name: "High", icon: <SignalCellularAltIcon /> },
    2: { name: "Medium", icon: <SignalCellularAlt2BarIcon /> },
    1: { name: "Low", icon: <SignalCellularAlt1BarIcon /> },
    0: { name: "No priority", icon: <MoreHorizIcon /> },
  };

  const PriorityComponent = ({ priority }) => {
    const priorityInfo = PriorityInfo[priority] || PriorityInfo[0];

    return (
      <span>
        {priorityInfo.icon}
        {priorityInfo.name}
      </span>
    );
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
                  <Typography variant="h6" sx={{ m: 1 }}>
                    <PriorityComponent priority={parseInt(key)} />
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
                      status={element.status}
                      // priority={element.priority}
                      username={element.user.name}
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

export default PriorityDisplay;
