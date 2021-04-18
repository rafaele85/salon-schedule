import {makeStyles, Theme} from "@material-ui/core";
import {DayHeader} from "./day-header";
import {Entity} from "./entity";
import React, {} from "react";
import {useSelector} from "react-redux";
import {selectDayEntityList} from "../state/entity-list";

const useStyles = makeStyles((_theme: Theme) => {
    return {
        roundedContainer: {
            borderRadius: "6px",
            border: "1px solid lightgray",
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f5",
            marginBottom: "1.5rem",
        },

    }
});

export interface IDayScheduleProps {
    dayId: number;
}

export const DaySchedule = (props: IDayScheduleProps) => {


    const dayEntities = useSelector(selectDayEntityList(props.dayId));

    const classes = useStyles();

    const jsxDayEntities: JSX.Element[] = [];
    for(let de of dayEntities) {
        jsxDayEntities.push((
            <Entity key={de.id} dayEntityId={de.id}/>
        ))
    }
    return (
        <div className={classes.roundedContainer}>
            <DayHeader dayId={props.dayId} />
            {jsxDayEntities}
        </div>
    );
}