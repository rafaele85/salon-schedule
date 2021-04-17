import {makeStyles, Theme} from "@material-ui/core";
import {allTimes, ITime} from "../types/interval";
import {ChangeEvent} from "react";

const useStyles = makeStyles((_theme: Theme) => {
    return {
        select: {
            marginLeft: "5px",
            marginRight: "5px",
            paddingTop: "3px",
            paddingBottom: "3px",
            border: "1px solid lightgray",
            borderRadius: "3px",
            outline: 0,
        }
    }
});

export interface ITimeSelector {
    value: ITime;
    onChange: (time: string) => void;
}

export const TimeSelector = (props: ITimeSelector) => {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.onChange(e.target.value);
    };


    const classes = useStyles();
    const jsxTimes = allTimes().map((t: ITime) => (
        <option key={t}>{t}</option>
    ))
    return (
        <select className={classes.select} onChange={handleChange} value={props.value||""}>
            {jsxTimes}
        </select>
    )
}