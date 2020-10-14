import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyle = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(1)
    }
}))

export const Form = ({ children, ...props}) => {
    const styles = useStyle()

    return <form className={styles.root} action="https://heksemel.no/case/submit.php" method="post" noValidate {...props}> {children}</form>;
};
