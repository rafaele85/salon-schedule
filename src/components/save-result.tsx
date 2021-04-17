import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography} from "@material-ui/core";

const useStyles = makeStyles((_theme) => ({
     container: {
         height: "100%",
         width: "100%",
         overflow: "scroll",
         display: "flex",
         alignItems: "flex-start",
         justifyContent: "center",
     },
    container1: {
         flex: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
        padding: "20px",
        border: "1px solid lightgray",
    },
    header: {
         flex: 0,
         display: "flex",
    },
    text: {
        minWidth: "400px",
         background: "lightgray",
        padding: "20px",
        flex: 0,
        display: "flex",
    },
    footer: {
        flex: 0,
        display: "flex",
    },
}));

export interface ISaveResultProps {
    text: string;
    onClose: () => void;
}

export const SaveResult = (props: ISaveResultProps) => {
    const classes = useStyles();

    const handleClick = () => {
        props.onClose();
    }

    return (
        <div className={classes.container}>
            <div className={classes.container1}>
                <header className={classes.header}>
                    <Typography variant={"h4"}>
                        Save Result
                    </Typography>
                </header>
                <pre className={classes.text}>
                {props.text}
            </pre>
                <footer className={classes.footer}>
                    <Button color={"primary"} variant={"contained"} onClick={handleClick}>Назад</Button>
                </footer>
            </div>
        </div>
    );
}