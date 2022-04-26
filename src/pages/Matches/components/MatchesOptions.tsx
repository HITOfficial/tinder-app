import React from "react"
import {Box, Fab, styled} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import StarIcon from '@mui/icons-material/Star';
import BoltIcon from '@mui/icons-material/Bolt';
import FavoriteIcon from '@mui/icons-material/Favorite';


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

function MatchesOptions ():JSX.Element {
    return (
        <BoxContainer
        >
            <FabIcon>
                <ReplayIcon sx={{ color: "#e8b023"}}/>
            </FabIcon>
            <FabIcon>
                <CloseIcon sx={{ color: "#d51f34"}}/>
            </FabIcon>
            <FabIcon>
                <BoltIcon sx={{ color: "#7616c0"}}/>
            </FabIcon>
            <FabIcon>
                <FavoriteIcon sx={{ color: "#0ac785"}}/>
            </FabIcon>
            <FabIcon>
                <StarIcon sx={{ color: "#cccccc"}}/>
            </FabIcon>
        </BoxContainer>
    )
}

export default MatchesOptions;