import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import List from '@mui/material/List';
import RenderListItem from "./RenderListItem";

const GroupsList = ({ groupList, handleSelect }) => {

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
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
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
                    <RenderListItem name={group.name} exp={group.exp} />
                ))}
            </List>

                
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

        