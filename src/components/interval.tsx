import {IconButton, makeStyles, Theme} from "@material-ui/core";
import {ITime} from "../types/interval";
import ClearIcon from "@material-ui/icons/Clear";
import PlusIcon from "@material-ui/icons/Add";
import {TimeSelector} from "./time-selector";
import {
    selectIntervalFrom,
    selectIntervalTo,
    updateIntervalFrom,
    updateIntervalTo
} from "../state/interval-list";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((_theme: Theme) => {
    return {
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "gray",
            fontWeight: 500,
        },
        clear: {
            borderRadius: "50%",
            color: "tomato",
            backgroundColor: "rgb(238,195,201)",
            height: "18px",
            width: "18px",
        },
        plus: {
            borderRadius: "50%",
            color: "blue",
            backgroundColor: "rgb(162,204,250)",
            height: "18px",
            width: "18px",
        }
    }
});

export interface IIntervalProps {
    intervalId: number;
    isLast?: boolean;
    onAdd: () => void;
    onDelete: () => void;
}

export const Interval = (props: IIntervalProps) => {
    const from = useSelector(selectIntervalFrom(props.intervalId));
    const to = useSelector(selectIntervalTo(props.intervalId));

    const fromDispatch = useDispatch();
    const handleChangeFrom = (f: ITime) => {
        updateIntervalFrom(fromDispatch, props.intervalId, f);
    };

    const toDispatch = useDispatch();
    const handleChangeTo = (t: ITime) => {
        updateIntervalTo(toDispatch, props.intervalId, t);
    };

    const classes = useStyles();

    let jsxButton;
    if(props.isLast) {
        jsxButton = (
            <IconButton onClick={props.onAdd}>
                <PlusIcon className={classes.plus}/>
            </IconButton>
        )
    } else {
        jsxButton = (
            <IconButton onClick={props.onDelete}>
                <ClearIcon className={classes.clear}/>
            </IconButton>
        )
    }


    return (
        <div className={classes.container}>
            С <TimeSelector value={from} onChange={handleChangeFrom}/>
            ДО <TimeSelector value={to} onChange={handleChangeTo}/>
            {jsxButton}
        </div>
    )
}