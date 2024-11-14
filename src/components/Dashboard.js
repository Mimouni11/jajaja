import React from "react";
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
import UserList from "./UserList";
import AddUserForm from "./AddUserForm";

const Dashboard = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Box my={4}>
        <UserList />
      </Box>
      <Box my={4}>
        <AddUserForm />
      </Box>
    </Container>
  );
};

export default Dashboard;
