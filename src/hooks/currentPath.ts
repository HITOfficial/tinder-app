import {matchRoutes, useLocation} from "react-router-dom";

function currentPath():string {
    const location = useLocation();
    return location.pathname
}