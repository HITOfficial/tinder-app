import React from "react";
import {Outlet} from "react-router-dom";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";

function Chat():JSX.Element {
    const navigate = useNavigate();
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
        <>
            <Outlet/>
        </>
    )
}

export default Chat;