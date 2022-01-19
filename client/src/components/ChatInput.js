import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useField from '../hooks/useField';

const ChatInput = ({ sendMessage, backToGroups }) =>{
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
                <Button
                    onClick={(e) => {
                            e.preventDefault()
                            backToGroups(e)
                        }}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                >
                    Go Back
                </Button>
        </Box>
    )
}

export default ChatInput