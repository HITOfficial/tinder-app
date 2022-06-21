import React, { useEffect } from "react";
import { Avatar, Badge, Box, Card, styled, Typography } from "@mui/material";
import MatchesSlider from "./MatchesSlider";
import ChatElement from "./ChatElement";
import io from "socket.io-client";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/slices/UserSlice";
import { fetchRoom, Room } from "../../../redux/slices/UserRoomsSlice";
import  AuthService from "../../../services/auth.service"
const CardStyle = {
  height: 650,
  maxHeight: 650,
};

export const NewAvatar = styled(Avatar)`
  width: 55px;
  height: 55px;
`;



export interface NewMatch {
  name: string;
  avatar: string;
  message: string;
  id: number;
}

function ChatList(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const rooms = useSelector((state: RootState) => state.userRooms);

  useEffect(() => {
    if (user.status === "idle") {
      //dispatch(fetchUser("62825b67f5c2addc780c65e1"));
      const currentUser = AuthService.getCurrentUser();
      dispatch(fetchUser(currentUser.user._id));
    }
  }, []);

  useEffect(() => {
    AuthService.getCurrentUser();
    console.log(user);
  }, [user]);

  useEffect(() => {
    // loaded user Info
    if (
      user.status === "successed" &&
      user.user != null &&
      rooms.rooms.length === 0
    ) {
      // only once load every messages
      console.log(user.user.rooms)
      user.user.rooms.forEach((id) => {
        dispatch(fetchRoom(id));
      });
    }
  }, [user]);

  useEffect(() => {
    console.log(user);
    console.log(rooms.rooms);
  }, [rooms]);

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

  return (
    <Card sx={CardStyle}>
        <Typography variant="subtitle2" display="block">
          New Matches
        </Typography>
      {/*</Badge> */}
       <MatchesSlider /> 
        <Typography variant="subtitle2" display="block">
          Messages
        </Typography>
      {/* </Badge> */}
      <Box sx={{ height: "90%", overflowY: "scroll" }}>
        {rooms.rooms.map((room: Room) => (
           
          <ChatElement
            avatar={room.user1Avatar}
            name={setReceiver(room)} //{room.user1Name}
            message={room.messages.length.toString()}
            id={room._id}
          />
        ))}
      </Box>
    </Card>
  );
}

export default ChatList;
