import React from "react";
import {ImageList, ImageListItem} from "@mui/material";

const itemData = [
    'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
];


function Gallery (): JSX.Element {
    return (
        <ImageList
            sx={{
                width: "100%",
            }}
            cols={3}
            rowHeight={250}
        >
            {itemData.map((item, id) => (
                <ImageListItem key={id}>
                    <img src={item}/>
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export default Gallery;