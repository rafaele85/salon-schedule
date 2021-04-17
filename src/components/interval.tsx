import {IconButton, makeStyles, Theme} from "@material-ui/core";
import {ITime} from "../types/interval";
import ClearIcon from "@material-ui/icons/Clear";
import PlusIcon from "@material-ui/icons/Add";
import {useEffect, useState} from "react";
import {IntervalService} from "../service/interval";
import {TimeSelector} from "./time-selector";
import {IEvent, NotificationService} from "../service/notification";

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

    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    const refreshInterval = () => {
        const nt = IntervalService.instance().getInterval(props.intervalId);
        if(!nt) {
            console.error("not found interval for intervalId", props.intervalId);
            return;
        }
        setFrom(nt.from||"");
        setTo(nt.to||"");
    };

    useEffect(() => {

        const handleUpdateInterval = (_event: IEvent, intervalId: number) => {
            if(intervalId===props.intervalId) {
                refreshInterval();
            }
        };

        refreshInterval();

        NotificationService.instance().subscribe(IEvent.UPDATEINTERVAL, handleUpdateInterval);

        return () => {
            NotificationService.instance().unsubscribe(IEvent.UPDATEINTERVAL, handleUpdateInterval);
        }
    },[props.intervalId]);

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

    const handleChangeFrom = (f: ITime) => {
      IntervalService.instance().updateIntervalFrom(props.intervalId, f);
    };

    const handleChangeTo = (t: ITime) => {
        IntervalService.instance().updateIntervalTo(props.intervalId, t);
    };
    return (
        <div className={classes.container}>
            С <TimeSelector value={from} onChange={handleChangeFrom}/>
            ДО <TimeSelector value={to} onChange={handleChangeTo}/>
            {jsxButton}
        </div>
    )
}