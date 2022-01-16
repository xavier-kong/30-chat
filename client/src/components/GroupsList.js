import React from "react";
import { FixedSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

/* 
group: {
    name: string,
    exp; Time stamp
}
*/

// https://mui.com/components/lists/

const GroupsList = ({ groupList, handleSelect }) => {
    
    return (
        <Container maxWidth="xs">
            <Box 
                component="form" 
                noValidate sx={{ 
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                Enter Group
            </Typography>

            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
            >
                {groupList.map(group => (
                    <ListItem>
                        <ListItemText primary={group.name} secondary={group.exp} />
                    </ListItem>
                ))}
            </FixedSizeList>
                
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

        