import React from 'react'
import Countdown, { zeroPad } from 'react-countdown';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const RenderListItem = ({ name, exp, redirectRoom }) => {

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>This group has expired</span>;
        } else {
            return <span>Expires in {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
    };

    return (
        <ListItem 
            component="div" 
            disablePadding  
            secondaryAction={
                <IconButton 
                    edge="end" 
                    aria-label="delete"                 
                    onClick={e => {
                        e.preventDefault()
                        redirectRoom(name)
                    }}
                >
                    <ArrowCircleRightIcon 
                        fontSize='large'
                    />
                </IconButton>
            }
        >
            <ListItemText 
                primary={name} 
                secondary={<Countdown date={new Date(exp)} renderer={renderer} />}
            />
        </ListItem>
    )
}

export default RenderListItem