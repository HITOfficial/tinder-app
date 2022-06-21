import React from "react"
import {Box, Fab, styled} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import StarIcon from '@mui/icons-material/Star';
import BoltIcon from '@mui/icons-material/Bolt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {AppDispatch} from "../../../redux/store";
import {useDispatch} from "react-redux";


const BoxContainer = styled(Box)`
  background-color: #f8f8f8;
  width: 100%;
  min-width: 350px;
  height: 90px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  
`

const FabIcon = styled(Fab)`
  background-color: transparent;
  & * {
    font-size: 50px;
  }
`

interface  Props {
    nextMatch: (x:boolean) => void
    prevMatch: (x:void) => void
}


function MatchesOptions ({nextMatch, prevMatch}: Props):JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    return (
        <BoxContainer
        >
            <FabIcon onClick={() => prevMatch()}>
                <ReplayIcon sx={{ color: "#e8b023"}}/>
            </FabIcon>
            <FabIcon onClick={() => nextMatch(false)}>
                <CloseIcon sx={{ color: "#d51f34"}}/>
            </FabIcon>
            <FabIcon onClick={() => nextMatch(true)}>
                <BoltIcon sx={{ color: "#7616c0"}}/>
            </FabIcon>
            <FabIcon onClick={() => nextMatch(true)}>
                <FavoriteIcon sx={{ color: "#0ac785"}}/>
            </FabIcon>
            <FabIcon onClick={() => nextMatch(true)}>
                <StarIcon sx={{ color: "#cccccc"}}/>
            </FabIcon>
        </BoxContainer>
    )
}

export default MatchesOptions;