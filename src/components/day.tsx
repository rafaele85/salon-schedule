import {DaySchedule} from "./day-schedule";
import {DayHeader} from "./day-header";
import {makeStyles, Theme} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectIsDayActive} from "../state/day-list";

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

    const isActive = useSelector(selectIsDayActive(props.dayId));

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
