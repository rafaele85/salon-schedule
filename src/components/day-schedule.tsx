import {IDayEntity} from "../types/schedule";
import {makeStyles, Theme} from "@material-ui/core";
import {DayHeader} from "./day-header";
import {Entity} from "./entity";
import React, {useEffect, useState} from "react";
import {EntityService} from "../service/entity";

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
    const [dayEntities, setDayEntities] = useState<IDayEntity[]>([]);

    console.log("DaySchedule render")

    useEffect(() => {
        const es = EntityService.instance().listDayEntities(props.dayId);
        setDayEntities(es);
    }, [props.dayId]);

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