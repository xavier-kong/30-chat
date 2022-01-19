import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import useField from '../hooks/useField';

const ChatInput = ({ sendMessage }) =>{
    const message = useField('text')

    return (
        <Box
            component="form"
            onSubmit={(e) => {
                e.preventDefault()
                sendMessage(message.value);
                message.onSubmit()
            }}
        >
            <Stack direction="row">
                <TextField
                    autoComplete="off"
                    variant="outlined" 
                    autoFocus={true}
                    placeholder='Type Here!'
                    value={message.value}
                    onChange={event => message.onChange(event)}
                />
                <Button variant="contained" color="primary" type="submit">
                    <SendIcon />
                </Button>
            </Stack>
        </Box>
    )
}

export default ChatInput