import React from "react";
import {
    Avatar, Badge,
    Box,
    Card, styled,
    Typography,
} from "@mui/material";
import MatchesSlider from "./MatchesSlider.jsx";
import ChatElement from "./ChatElement";

const CardStyle = {
    height: 650,
};

const CardContentStyle = {
    height: 420,
    maxHeight: 420,
    overflowY: "scroll",
    paddingBottom: 10,
};

export const NewAvatar = styled(Avatar)`
  width: 55px;
  height: 55px;
`;

const BadgeStyle = {
    margin: "15px 10px 0",
    paddingRight: "10px",
    color: "rgb(254, 60, 114)",
    "& .MuiBadge-badge": {
        backgroundColor: "rgb(254, 60, 114)",
        color: "white",
    }
};




function ChatList(): JSX.Element {
    return (
        <Card sx={CardStyle}>
            <Badge badgeContent={39} sx={BadgeStyle}>
                <Typography variant="subtitle2" display="block" >
                    New matches
                </Typography>
            </Badge>
            <MatchesSlider/>
            <Badge badgeContent={4} sx={BadgeStyle}>
            <Typography variant="subtitle2" display="block" >
                    Messages
                </Typography>
            </Badge>
            <ChatElement/>
            <ChatElement/>
            <ChatElement/>
            <ChatElement/>

        </Card>
    );
}

export default ChatList;
