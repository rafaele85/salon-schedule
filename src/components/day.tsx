import {useEffect, useState} from "react";
import {DayService} from "../service/day";
import {IEvent,  NotificationService} from "../service/notification";
import {DaySchedule} from "./day-schedule";
import {DayHeader} from "./day-header";
import {makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((_theme: Theme) => {
    return {
        roundedContainer: {
            borderRadius: "6px",
            border: "1px solid lightgray",
            flex: 1,
            width: "100%",
            display: "flex",
            background: "white",
            marginBottom: "1.5rem",
        }
    }
})

export interface IDayProps {
    dayId: number;
}

export const Day = (props: IDayProps) => {
    const [isActive, setActive] = useState<boolean>(false);

    useEffect(() => {
        const refreshActive = () => {
            const act = DayService.instance().isActive(props.dayId);
            setActive(act||false);
        };

        const handleDayUpdate = (_event: IEvent, dayId: number) => {
            if(dayId===props.dayId) {
                refreshActive();
            }
        };

        refreshActive();

        NotificationService.instance().subscribe(IEvent.UPDATEDAY, handleDayUpdate);
        return () => {
            NotificationService.instance().unsubscribe(IEvent.UPDATEDAY, handleDayUpdate);
        };
    }, [props.dayId]);

    const classes = useStyles();

    let jsx;
    if(isActive) {
        jsx = (
            <DaySchedule
                dayId={props.dayId}
            />
        );
    } else {
        jsx = (
            <div className={classes.roundedContainer}>
                <DayHeader dayId = {props.dayId} />
            </div>
        );
    }

    return jsx;
}
