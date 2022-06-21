import React, { useEffect } from "react";
import {Badge, Box, Stack, styled, Typography} from "@mui/material";
import {avatars, NewAvatar} from "./ChatList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchUser } from "../../../redux/slices/UserSlice";
import { fetchRoom, Room } from "../../../redux/slices/UserRoomsSlice";
import  AuthService from "../../../services/auth.service"

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
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const rooms = useSelector((state: RootState) => state.userRooms);
  
   
    const setReceiver = (room : Room): string => {
        console.log(user.user )
        console.log(room)
        if ( user.user!=null &&
          user.user._id.toString() !== room.user1
        ) {
          return room.user1Name;
        } else if (room != null) {
          return room.user2Name;
        }
        return "";
      };
    

    const viewMatches = () => {
        return (
            rooms.rooms.map((room: Room) => (
                (room.messages.length == 0) && (
                    <AvatarBox key={room._id}>
                        <NewAvatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80" />
                        <Typography variant="caption">{setReceiver(room)}</Typography>
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