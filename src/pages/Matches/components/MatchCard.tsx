import React from "react";
import {Box, Card, CardContent, Fab, Typography} from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';


const CardStyle = {
    backgroundColor: 'grey',
    backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80')",
    backgroundPosition:"contained",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
    backgroundSize: "cover",
    width: "100%",
    height: 500,
    position: "relative",
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


function MatchCard():JSX.Element {
    return (
        <Card
        sx={CardStyle}
        >
            <CardContent
            sx={ContentStyle}
            >
                <Typography variant="h3" component="div">
                  Natasha
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
            <Fab sx={{backgroundColor: "transparent",

            position: "absolute",
                right: 20,
                bottom: 20,
            }}>
                <ArrowCircleUpIcon />
            </Fab>
            </CardContent>
        </Card>
    )
}

export default MatchCard;