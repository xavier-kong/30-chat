import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

const BinarySelector = ({ first, second, handleSelect }) => {

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                onClick={(e) => {
                    e.preventDefault()
                    handleSelect(first)
                }}
            >
                {first}
            </Button>
            <Button
                variant="contained"
                onClick={(e) => {
                    e.preventDefault()
                    handleSelect(second)
                }}
            >
                {second}
            </Button>
        </Stack>
    )
}

export default BinarySelector