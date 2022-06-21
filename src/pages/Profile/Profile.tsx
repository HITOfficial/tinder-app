import React, { useEffect, useState } from "react";
import {Avatar, Box,  Card, CardContent, MenuItem, TextareaAutosize,  Typography} from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Gallery from "./components/Gallery";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { Navigate,  useNavigate } from "react-router-dom";
import { setConstantValue } from "typescript";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik';
  import Button from "@mui/material/Button"
import {
    Autocomplete,
    TextField,
    Select,
    Switch,
    ToggleButtonGroup,
  } from 'formik-mui';
const CardContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80%",
    //justifyContent: "space-around",
}


interface MyFormValues {
    name: string,
    email: string,
    password: string,
    age: string,
    location: string,
    sex: string,
    sexpreference: string,
    description: string
   
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


    const initialValues: MyFormValues = {name: currentUser.user.name,
        email:  currentUser.user.email,
        password: currentUser.user.password,
        age: currentUser.user.age,
        location: currentUser.user.location,
        sex: currentUser.user.sex,
        sexpreference: currentUser.user.sexPreference ,
        description: currentUser.user.description};

    
    return (
      <Card sx={{minWidth: "400px", height: 650, overflowY: "scroll"}}>
          <CardContent sx={CardContentStyle}>
              <Avatar
                  alt="Remy Sharp"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"
                  sx={{ width: 100, height: 100 }}
              />
 <Formik   
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);

          AuthService.updateUser(
            values.name, values.email, values.password  ,values.age , values.location, values.sex, values.sexpreference ,values.description
          ).then(
            response => {
                alert(JSON.stringify(response));
             //   localStorage.setItem("user", JSON.stringify(response.data));
              },
             
                
           
              ( error: { response: { data: { message: any; }; }; message: any; toString: () => any; }) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                 error.toString();
                 alert(JSON.stringify(resMessage));
            }
          );
        }}
      >
         <Form  >
      

         <div className="form-group">
            <Box margin={3}><Typography  variant="h4">{currentUser.user.name}</Typography> {/* value = {currentUser.user.name} component={TextField}  size="small" label="Name"  id="name" name="name" placeholder="Name" /> */}
          </Box>
        </div>
          <div className="form-group">
          <Box margin={1}>
          <Field component={TextField} size="small" label="Age"  id="age" name="age" placeholder="Age" />
          </Box>
          </div>   
          <div className="form-group">
          <Box margin={1}>
          <Field component={TextField} size="small" label="Location"  id="location" name="location" placeholder="Location" />
          </Box>
          </div>   
          <div className="form-group">
          <Box margin={1}>
          <Field component={TextField} size="small"  sx={{width: "28ch"}} defaultValue="sex" select label="Sex"  id="sex" name="sex" placeholder="Sex" >
          <MenuItem  value="man">
                      man
                  </MenuItem>
                  <MenuItem value="woman" >
                      woman
                  </MenuItem>
                  <MenuItem value="other">
                      other
                  </MenuItem>
                  </Field>
          </Box>
          </div>   
          <div className="form-group">
          <Box margin={1}>
          <Field component={TextField} select sx={{width: "28ch"}}  size="small" label="Sex preference"   id="sexpreference" name="sexpreference" placeholder="Sex Preference" >
          <MenuItem  value="men">
                      men
                  </MenuItem>
                  <MenuItem value="women" >
                      women
                  </MenuItem>
                  <MenuItem value="other">
                      other
                  </MenuItem>
                  </Field>
          </Box>
          </div>
         <div className="form-group">
          <Box margin={1}>
          <Field component={TextField} 
                  id="description"
                  label="About me"
                  multiline
                  name="description"
                  
                  
                
                  sx={{width: "80%"}}
              /></Box></div> 
         <Box margin={1}> <Button variant="contained"   type="submit" >Update</Button></Box>
         </Form>
       </Formik>
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
 