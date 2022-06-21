import React from "react";
import MatchesCard from "./components/MatchesCard";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
function Matches():JSX.Element {

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
            <MatchesCard></MatchesCard>

        </>
    )
}

export default Matches;