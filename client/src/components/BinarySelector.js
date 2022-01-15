import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

const BinarySelector = ({ first, second, select, handleSelect }) => {

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant={select ? "contained" : "outlined"}
                onClick={(e) => {
                    e.preventDefault()
                    handleSelect()
                }}
            >
                {first}
            </Button>
            <Button
                variant={select ? "outlined" : "contained"}
                onClick={(e) => {
                    e.preventDefault()
                    handleSelect()
                }}
            >
                {second}
            </Button>
        </Stack>
    )
}

export default BinarySelector