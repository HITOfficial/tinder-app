import React, { useEffect } from "react";
import { Avatar, Badge, Box, Card, styled, Typography } from "@mui/material";
import MatchesSlider from "./MatchesSlider";
import ChatElement from "./ChatElement";
import io from "socket.io-client";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/slices/UserSlice";
import { fetchRoom, Room } from "../../../redux/slices/UserRoomsSlice";

const CardStyle = {
  height: 650,
  maxHeight: 650,
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
  },
};

export const avatars: NewMatch[] = [
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
    message: "Hi :)",
    id: 1,
  },
  {
    name: "Mike",
    avatar:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    message: "Hi :)",
    id: 2,
  },
  {
    name: "Tim",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    message: "Hi :)",
    id: 3,
  },
  {
    name: "Bibi",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    message: "Hi :)",
    id: 4,
  },
  {
    name: "Alexa",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    message: "Hi :)",
    id: 5,
  },
  {
    name: "Trevor",
    avatar:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80",
    message: "Hi :)",
    id: 6,
  },
  {
    name: "Marcus",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    message: "Hi :)",
    id: 7,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 8,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    message: "Hi :)",
    id: 9,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 10,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 11,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 12,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 13,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 14,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    message: "Hi :)",
    id: 15,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 16,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 17,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 18,
  },
  {
    name: "Anna",
    avatar:
      "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    message: "Hi :)",
    id: 19,
  },
];

export interface NewMatch {
  name: string;
  avatar: string;
  message: string;
  id: number;
}

const socket = io("http://localhost:3001");
socket.emit("hello");

function ChatList(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const rooms = useSelector((state: RootState) => state.userRooms);

  useEffect(() => {
    if (user.status === "idle") {
      dispatch(fetchUser("62825b67f5c2addc780c65e1"));
    }
  }, []);

  useEffect(() => {
    // loaded user Info
    if (
      user.status === "successed" &&
      user.user != null &&
      rooms.rooms.length === 0
    ) {
      // only once load every messages
      user.user.rooms.forEach((id) => {
        dispatch(fetchRoom(id));
      });
    }
  }, [user]);

  useEffect(() => {
    console.log(rooms.rooms);
  }, [rooms]);

  return (
    <Card sx={CardStyle}>
      <Box>{rooms.rooms.length}</Box>
      <Badge badgeContent={39} sx={BadgeStyle}>
        <Typography variant="subtitle2" display="block">
          New Matches
        </Typography>
      </Badge>
      <MatchesSlider />
      <Badge badgeContent={avatars.length} sx={BadgeStyle}>
        <Typography variant="subtitle2" display="block">
          Messages
        </Typography>
      </Badge>
      <Box sx={{ height: "90%", overflowY: "scroll" }}>
        {rooms.rooms.map((room: Room) => (
          <ChatElement
            avatar={room.user1Avatar}
            name={room.user1Name}
            message={room.messages.length.toString()}
            id={room._id}
          />
        ))}
      </Box>
    </Card>
  );
}

export default ChatList;
