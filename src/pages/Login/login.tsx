
import Button from "@mui/material/Button"
//import Field from "@mui/material/Field"
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

import { Box, Input, Typography } from "@mui/material";
import {
    Autocomplete,
    TextField,
    Select,
    Switch,
    ToggleButtonGroup,
  } from 'formik-mui';
interface MyFormValues {
  email: string;
  password: string
}

function LoginT(): JSX.Element {
  const navigate = useNavigate();
  const initialValues: MyFormValues = { email: '', password: "" };

  return (
    <div>
         
      
        <Typography  variant="h4" >Log In</Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          AuthService.login(values.email, values.password).then(
            () => {
             navigate("/profile");
           //  window.location.reload();
            },
            (       error: { response: { data: { message: any; }; }; message: any; toString: () => any; }) => {
             
                const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();

                alert(JSON.stringify(resMessage));
            }
          );
          
           // window.location.reload();
    
        }}
      >
        <Form>
        <div className="form-group">
            
            <Box margin={1}><Field  component={TextField}  size="small" label="Name"  id="email" name="email" placeholder="Name" />
          </Box>
          </div> 
          <div className="form-group">
          <Box margin={1}>
          <Field  component={TextField} size="small" type="password" label="Password"  id="password" name="password" placeholder="Password" />
          </Box>
          </div>   
          
          <Button variant="contained"   type="submit" >Submit</Button>
        
        </Form>
      </Formik>
    </div>
  
  );
};
export default LoginT;