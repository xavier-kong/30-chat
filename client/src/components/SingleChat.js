import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import avatarGen from "../services/avatarGen";


const SingleChat = ({ name, message }) => {

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar {...avatarGen(name)} />
            </ListItemAvatar>
            <ListItemText 
                primary={name}
                secondary={
                    <>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {message}
                        </Typography>
                    </>
                }
            />
        </ListItem>
    )

}

export default SingleChat