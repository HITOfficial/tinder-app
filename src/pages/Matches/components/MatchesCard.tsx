import React from "react";
import {Box, Card, CardContent, Fab, styled, Typography} from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MatchesOptions from "./MatchesOptions";


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


const FabButton = styled(Fab)`
  position: absolute;
  right: 30px;
  bottom: 30px;
  background-color: transparent;
  transition: transform .8s ease-in-out;
  transform: rotate(0);
  &:hover {
    background-color: transparent;
    transform: rotate(180deg);
    
  }
`

function MatchesCard():JSX.Element {

    return (
        <Box>
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
                    <FabButton sx={{backgroundColor: "transparent",
                    }}>
                        <ArrowCircleUpIcon />
                    </FabButton>
                </CardContent>
            </Card>
            <MatchesOptions/>
        </Box>
    )
}

export default MatchesCard;