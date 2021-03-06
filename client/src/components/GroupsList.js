import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import List from '@mui/material/List';
import RenderListItem from "./RenderListItem";

const GroupsList = ({ groupList, handleSelect, redirectRoom }) => {

    return (
        <Container maxWidth="xs">
            <Box 
                component="form" 
                noValidate sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            {groupList.length === 0 ?
            <>
                <Typography sx={{ mb: 2 }} align="center">
                    You aren't in any groups...YET :)
                </Typography>
                <Typography sx={{ mb: 2 }} align="center">
                    Click "Go Back" then "New" to join or create a new group!
                </Typography>
            </>
            :
            <>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
                Enter Group
            </Typography>
            <List
                sx={{
                    overflow: 'auto',
                    maxHeight: 350,
                    width: '100%',
                    mb: 4
                }}
            >
                {groupList.map(group => (
                    <RenderListItem name={group.name} exp={group.exp} redirectRoom ={redirectRoom} />
                ))}
            </List>
            </>} 
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        handleSelect('Pre')
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                >
                    Go Back
                </Button>
            </Box>
        </Container>
    )
}

export default GroupsList

        