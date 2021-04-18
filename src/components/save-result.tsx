import React, {useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectDayList} from "../state/day-list";
import {selectEntities} from "../state/entity-list";
import {selectIntervals} from "../state/interval-list";

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

type ISInterval = {from: string, to: string};
type ISBranch = {branch: string, schedule: ISInterval[]};
type ISDaySchedule = {day: string, branches: ISBranch[], breaks: ISInterval[]};
type ISSchedule = {schedule: ISDaySchedule[]};


export interface ISaveResultProps {
    onClose: () => void;
}

export const SaveResult = (props: ISaveResultProps) => {
    const classes = useStyles();

    const dayList = useSelector(selectDayList);
    const entityList = useSelector(selectEntities);
    const intervalList= useSelector(selectIntervals);

    const text = useMemo<string>( () => {
            const daySchedule: ISDaySchedule[] = [];
            dayList.forEach(d => {
                if(d.active) {
                    const branches: ISBranch[] = [];
                    const entities = entityList.filter((ent) => ent.dayId === d.id);
                    let breaks: ISInterval[] = [];
                    entities.forEach(e => {
                        if(e.active) {
                            const intervals = intervalList.filter((nt) => nt.dayEntityId === e.id);
                            const intervalArr = intervals.map(nt => ({from: nt.from, to: nt.to}) );
                            if(e.isBreak) {
                                breaks = intervalArr;
                            } else {
                                branches.push({branch: e.label, schedule: intervalArr});
                            }
                        }
                    });
                    daySchedule.push({day: d.label, branches, breaks});
                }
            });
            const schedule: ISSchedule = {schedule: daySchedule};
            return JSON.stringify(schedule, null, 2);
    }, [dayList, entityList, intervalList]);


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
                {text}
            </pre>
                <footer className={classes.footer}>
                    <Button color={"primary"} variant={"contained"} onClick={handleClick}>Назад</Button>
                </footer>
            </div>
        </div>
    );
}