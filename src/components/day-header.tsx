import {makeStyles, Theme, Typography} from "@material-ui/core";
import {DaySwitch} from "./day-switch";
import {IDay} from "../types/days";
import {useEffect, useState} from "react";
import {DayService} from "../service/day";

const useStyles = makeStyles((_theme: Theme) => {
    return {
        container: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
        },
        dayTitle: {
            fontWeight: 600,
        }
    }
});

export interface IDayHeaderProps {
    dayId: number;
}

export const DayHeader = (props: IDayHeaderProps) => {
    const [day, setDay] = useState<IDay|undefined>();

    useEffect(() => {
        const d = DayService.instance().getDay(props.dayId);
        setDay(d);
    },[props.dayId])

    const handleToggle = () => {
        if(!day) {
            console.error("Day is not set");
            return;
        }
        DayService.instance().updateDay(day.id, !day.active);
    };

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography className={classes.dayTitle}>{day?.label}</Typography>
            <DaySwitch onChange={handleToggle} checked={!!day?.active} />
        </div>
    )
}