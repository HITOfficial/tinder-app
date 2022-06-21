import Button from "@mui/material/Button"
import AuthService from "../../services/auth.service";
import * as React from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import {
    TextField,
  } from 'formik-mui';
interface MyFormValues {
  email: string;
  password: string
}

function LoginT(): JSX.Element {
  const navigate = useNavigate();
  const initialValues: MyFormValues = { email: '', password: "" };

  return (
    <div >
         
      
        <Typography   margin={3} variant="h4" >Log In</Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          AuthService.login(values.email, values.password).then(
            () => {
             navigate("/profile");
                setTimeout(() => window.location.reload() ,500)
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
        }}
      >
        <Form>
        <div   className="form-group"   >
        <Box margin={1}>
            <Field justifyContent="center"   component={TextField}  size="small" label="Name"  id="email" name="email" placeholder="Name" />
            </Box >
          </div> 
          <div className="form-group"   >
          <Box margin={1}>
          <Field  component={TextField}  justifyContent="center"  size="small" type="password" label="Password"  id="password" name="password" placeholder="Password" />
          </Box>
          </div>   
          <Box margin={1}>
          <Button variant="contained"   type="submit" >Submit</Button>
          </Box>
        </Form>
      </Formik>
    </div>
  
  );
};
export default LoginT;