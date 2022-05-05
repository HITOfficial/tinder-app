import React from "react";
import {Badge, Box, Stack, styled, Typography} from "@mui/material";
import {avatars, NewAvatar} from "./ChatList";


const AvatarBox = styled(Box)`
  display: block;
  text-align: center;
  position: relative;
  &:after {
    position: absolute;
    top: 40px;
    right: 0px;
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 10px;
    background-color: rgb(254, 60, 114);
    outline: 3px solid white;
  }
`

const totalVisible = 7;

function MatchesSlider():JSX.Element {

    const viewMatches = () => {
        return (
            avatars.map((el, id) => (
                (id < totalVisible) && (
                    <AvatarBox key={id}>
                        <NewAvatar src={el.avatar} />
                        <Typography variant="caption">{el.name}</Typography>
                    </AvatarBox>
                )
            ))
        )
    }

    return (
        <>
            <Stack direction="row" spacing={2}>
                {viewMatches()}
            </Stack>
        </>
    )
}

export default MatchesSlider;