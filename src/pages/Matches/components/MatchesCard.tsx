import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Collapse, Fab, styled, Typography} from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MatchesOptions from "./MatchesOptions";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import AuthService from "../../../services/auth.service";
import {fetchUser} from "../../../redux/slices/UserSlice";
import {fetchMatches} from "../../../redux/slices/MatchesSlice";
import {addNewRoom} from "../../../redux/slices/UserRoomsSlice";

const CardStyle = {
    backgroundColor: 'grey',
    backgroundPosition:"contained",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
    backgroundSize: "cover",
    width: "100%",
    height: 500,
    position: "relative",
    color: "white"
}

const BoxStyle = {
    display: "flex",
    justifyContnet:"center",
    alignItems: "center",
}

const ContentStyle = {
    marginTop: 45,
}

const IconStyle = {
    fontSize:15,
    marginRight:1,
}



interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({

    transform: !expand ? 'rotate(270deg)' : 'rotate(90deg)',
    position: "absolute",
    right: "30px",
    bottom: "30px",
    backgroundColor: "transparent",
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const NameStyle =  {
    "&:after": {
        marginTop: "5px",
        marginLeft: "10px",
        content: '"25"',
        fontSize: "25px",
    }
}


function MatchesCard():JSX.Element {
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();

    const [actualMatchNumber,setActualMatchNumber] = useState(0);
    const [maxMatchNumber,setMaxMatchNumber] = useState(0);
    const [currentUser,setCurrentUser] = useState<any>(null);



    const user = useSelector((state: RootState) => state.user);
    const matches = useSelector((state: RootState) => state.matches);


    const nextMatch = (addRoom: boolean) => {
        setActualMatchNumber(() => (actualMatchNumber+1) % maxMatchNumber)
        if (addRoom && user.user) {
            dispatch(addNewRoom({
                messages: [],
                _id: 123,
                user1: user.user._id.toString(),
                user1Name: user.user.name,
                user1Avatar: user.user.avatar,
                user2: matches.matches[actualMatchNumber]._id.toString(),
                user2Name: matches.matches[actualMatchNumber].name,
                user2Avatar: matches.matches[actualMatchNumber].avatar
            }))
        }
    }

    const prevMatch = () => {
        setActualMatchNumber(() => actualMatchNumber-1 < 0 ? Math.max(maxMatchNumber-1, 0): actualMatchNumber -1)
    }

    useEffect(() => {
        if (user.status === "idle") {
            setCurrentUser(AuthService.getCurrentUser())
        }
    }, []);

    useEffect(() => {
        if (currentUser !== null) {
            dispatch(fetchUser(currentUser.user._id));
        }
    }, [currentUser]);


    useEffect(() => {
        if (user.status === "successed") {
            dispatch(fetchMatches());
        }
        AuthService.getCurrentUser();
    }, [user]);

    useEffect(() => {
        console.log("matches :)D", matches.status, matches.matches)
        if(matches.matches.length > 0) {
            setMaxMatchNumber(matches.matches.length)
        }
    }, [matches]);


    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    return (
        <Box>
            {maxMatchNumber > 0 ? <>
                <Card
                    sx={{...CardStyle, backgroundImage: `url(${matches.matches[actualMatchNumber].avatar})`}}
                >

                    <CardContent
                        sx={ContentStyle}
                    >
                        <Typography variant="h3" component="div"
                                    sx={{...NameStyle, "&:after":{marginTop: "5px",
                                            marginLeft: "10px",
                                            content: `'${matches.matches[actualMatchNumber].age}'`,
                                            fontSize: "25px",} }}
                        >
                            {matches.matches[actualMatchNumber].name}
                        </Typography>
                        <Box component="div"
                             sx={BoxStyle}
                        >
                            <WorkOutlineIcon sx={IconStyle}/>
                            <Typography
                                variant="subtitle1">
                                Software engineer
                            </Typography>
                        </Box>

                        <Box component="div"
                             sx={BoxStyle}
                        >
                            <LocationOnOutlinedIcon
                                sx={IconStyle}
                            />
                            <Typography
                                variant="subtitle1">
                                3km away
                            </Typography>
                        </Box>
                        <ExpandMore
                            expand={expanded}
                            onClick={toggleExpanded}
                        >
                            <ArrowLeftIcon />
                        </ExpandMore>
                    </CardContent>
                </Card>


                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {matches.matches[actualMatchNumber].description}
                        </Typography>
                    </CardContent>
                </Collapse>
                <MatchesOptions nextMatch={nextMatch} prevMatch={prevMatch}/>
            </> : <Box>users to load </Box>

            }

        </Box>
    )
}

export default MatchesCard;