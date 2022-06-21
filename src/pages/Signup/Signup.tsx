import AuthService from "../../services/auth.service";
import * as React from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import { useNavigate } from "react-router-dom";

interface MyFormValues {
  name: string,
  email: string,
  password: string,
  age: string,
  location: string,
  sex: string,
  sexpreference: string,
 
}
import Button from "@mui/material/Button"
import {
    Autocomplete,
    TextField,
    Select,
    Switch,
    ToggleButtonGroup,
  } from 'formik-mui';
import { Box, MenuItem, Typography } from "@mui/material";

function Signup(): JSX.Element {
  const navigate = useNavigate();
  const initialValues: MyFormValues = {name: "",
  email: "",
  password: "",
  age: "",
  location: "",
  sex: "",
  sexpreference: "" };
  const handleClick = (event: React.MouseEvent<HTMLElement>, text: string) => {
    console.log(event.target);
    console.log(text);
  };
  return (
    <div>
      <Typography margin={3} variant="h4" >Sign Up</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);

          AuthService.register(
            values.name, values.email, values.password  ,values.age , values.location, values.sex, values.sexpreference
          ).then(
            response => {
                alert(JSON.stringify(response.data.message));
                navigate("/logint");
              },
             
                
           
              (            error: { response: { data: { message: any; }; }; message: any; toString: () => any; }) => {
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
        <Form>
        <div className="form-group">
        <Box margin={1}>
        
          <Field  component={TextField}  label="Email" size="small" id="email" name="email" placeholder="Email" className="form-control" />
            </Box>
            </div>
            <div className="form-group">
            
            <Box margin={1}><Field  component={TextField}  size="small" label="Name"  id="name" name="name" placeholder="Name" />
          </Box>
          </div> 
          <div className="form-group">
          <Box margin={1}>
          <Field  component={TextField} size="small" type="password" label="Password"  id="password" name="password" placeholder="Password" />
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
          <Field component={TextField} select sx={{width: "28ch"}} defaultValue="Sex preference" size="small" label="Sex preference"   id="sexpreference" name="sexpreference" placeholder="Sex Preference" >
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
         
          <Box margin={1}> <Button  variant="contained"   type="submit" >Submit</Button></Box>
         
        </Form>
      </Formik>
    </div>
  );
};
export default Signup;