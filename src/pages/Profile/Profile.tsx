import React from "react";
import {Avatar, Box, Card, CardContent, MenuItem, TextareaAutosize, TextField, Typography} from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Gallery from "./components/Gallery";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { Navigate,  useNavigate } from "react-router-dom";
  
const CardContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-around",
}


function Profile():JSX.Element {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser)
    UserService.getUserBoard().then(
        response => {
          console.log(response)
        },
        error => {
         navigate("/logint")
         return(
            <></>
         );
        }
      );
    return (
      <Card sx={{minWidth: "400px", height: 650, overflowY: "scroll"}}>
          <CardContent sx={CardContentStyle}>
              <Avatar
                  alt="Remy Sharp"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"
                  sx={{ width: 100, height: 100 }}
              />
              <TextField
                  label="name"
                  id="name"
                  defaultValue={currentUser.user.name}
                  size="small"
              />
              <TextField
                  label="age"
                  id="age"
                  defaultValue={currentUser.user.age}
                  size="small"
              />
              <TextField
                  label="Location"
                  id="age"
                  defaultValue={currentUser.user.location}
                  size="small"
              />
              <TextField
                  label="sex"
                  id="sex"
                  defaultValue={currentUser.user.sex}
                  size="small"
                  select
                  sx={{width: "28ch"}}
              >
                  <MenuItem  value="man">
                      man
                  </MenuItem>
                  <MenuItem value="woman" sx={{width: "25ch"}}>
                      woman
                  </MenuItem>
                  <MenuItem value="other">
                      other
                  </MenuItem>
              </TextField>
              <TextField
                  label="sex-preference"
                  id="sex-preference"
                  defaultValue={currentUser.user.sexpreference}
                  size="small"
                  select
                  sx={{width: "28ch"}}
              >
                  <MenuItem  value="man">
                      man
                  </MenuItem>
                  <MenuItem value="woman" sx={{width: "25ch"}}>
                      woman
                  </MenuItem>
                  <MenuItem value="other">
                      other
                  </MenuItem>
              </TextField>
              <TextField
                  id="about-me"
                  label="About me"
                  multiline
                  rows={3}
                  defaultValue="netflix & chill"
                  sx={{width: "80%"}}
              />
          </CardContent>
          <Typography
              variant="h5"
              sx={{textAlign: "center"}}
          >
              Your Gallery
          </Typography>
          <Gallery/>
      </Card>
    );
}

export default Profile;