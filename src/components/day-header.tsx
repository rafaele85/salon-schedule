import {makeStyles, Theme, Typography} from "@material-ui/core";
import {DaySwitch} from "./day-switch";
import {useDispatch, useSelector} from "react-redux";
import {selectDay, updateDay} from "../state/day-list";

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

    const day = useSelector(selectDay(props.dayId));
    const dispatch = useDispatch();
    const handleToggle = () => {
        updateDay(dispatch, day.id, !day.active);
    };

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography className={classes.dayTitle}>{day?.label}</Typography>
            <DaySwitch onChange={handleToggle} checked={!!day?.active} />
        </div>
    )
}