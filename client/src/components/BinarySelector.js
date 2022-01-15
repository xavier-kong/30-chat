import React, { useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

const BinarySelector = ({ first, second }) => {
    const [ select, setSelect ] = useState(true)

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant={select ? "contained" : "outlined"}
                onClick={() => setSelect(true)}
            >
                {first}
            </Button>
            <Button
                variant={select ? "outlined" : "contained"}
                onClick={() => setSelect(false)}
            >
                {second}
            </Button>
        </Stack>
    )
}

export default BinarySelector