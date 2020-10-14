import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

export const Input = forwardRef((props, ref) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={ref}
            fullWidth
            {...props}
        />
    );
});

export const TextArea = forwardRef((props, ref) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={ref}
            multiline
            rows={4}
            fullWidth
            {...props}
        />
    );
});
