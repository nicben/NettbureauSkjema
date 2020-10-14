import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(1)
    }
}));

export const SendButton = ({children, ...props}) => {
    const styles = useStyles()

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.root}
            {...props}
        >
            {children}
        </Button>
    );
};
