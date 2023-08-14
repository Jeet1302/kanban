import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person"; 

const Ticket = (props) => {
  const { id, title, tag, status, priority, username } = props;

  const getInitials = (name) => {
    if (username === undefined) return null
    const nameParts = name.split(" ");
    return nameParts.map((part) => part[0]).join("").toUpperCase();
  };

  const initials = getInitials(username);

  const card = (
    <CardContent>
      <Box
        sx={{
          position: "relative",
          marginBottom: 2,
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          ID: {id}
        </Typography>
        {username &&  (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center", 
          }}
        >
          <Avatar sx={{ width: 30, height: 30 , background:"#1976D2"}}> 
          {initials || <PersonIcon />} 
          </Avatar>
          <Typography variant="body2" color="textSecondary" ml={1}>
             {username}
          </Typography>
        </Box>
      )}
      </Box>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {tag}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {status === undefined ? "": "Status: " + status}
      </Typography>
      <Typography variant="body2" color="textSecondary">
      {priority === undefined ? "": "Priority: " + priority}
      </Typography>
    </CardContent>
  );

  return (
    <Box sx={{ position: "relative", boxShadow: 1 , marginBottom: 2, overflowX : "auto", borderRadius : 1.5}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default Ticket;
