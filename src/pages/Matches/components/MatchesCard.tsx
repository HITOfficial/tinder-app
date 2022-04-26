import React, {useState} from "react";
import {Box, Card, CardContent, Collapse, Fab, styled, Typography} from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MatchesOptions from "./MatchesOptions";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

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



interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({

    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
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

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    return (
        <Box>
            <Card
                sx={CardStyle}
            >
                <CardContent
                    sx={ContentStyle}
                >
                    <Typography variant="h3" component="div"
                                sx={NameStyle}
                    >
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
                    <ExpandMore
                        expand={expanded}
                        onClick={toggleExpanded}
                    >
                        <ArrowCircleUpIcon />
                    </ExpandMore>
                </CardContent>
            </Card>


            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolorum iure numquam officia, pariatur quibusdam quisquam ratione repellat reprehenderit voluptate! Accusamus iusto labore laudantium molestias quo quod rerum, saepe vitae!
                    </Typography>
                </CardContent>
            </Collapse>
            <MatchesOptions/>
        </Box>
    )
}

export default MatchesCard;