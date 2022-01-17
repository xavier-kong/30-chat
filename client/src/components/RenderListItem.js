import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from "@mui/material";
import Countdown from 'react-countdown';

const RenderListItem = ({ name, exp, redirectRoom }) => {

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>This group has expired</span>;
        } else {
            return <span>Expires in {hours}:{minutes}:{seconds}</span>;
        }
        };

    return (
        <ListItem component="div" disablePadding>
            <ListItemButton
                onClick={e => {
                    e.preventDefault()
                    redirectRoom(name)
                }}
            >
                <ListItemText 
                    primary={name} 
                    secondary={<Countdown date={new Date(exp)} renderer={renderer} />}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default RenderListItem