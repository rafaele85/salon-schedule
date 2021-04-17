import {Button, makeStyles, Theme} from "@material-ui/core";
import {useEffect, useState} from "react";
import {IDay} from "../types/days";
import {DayService} from "../service/day";
import {Day} from "./day";
import {SaveResult} from "./save-result";
import {ScheduleService} from "../service/schedule";

const styles = {
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "flex-start",
        alignItems: "center",
        minWidth: "500px",
    },
};


const useStyles = makeStyles( (_theme: Theme) => styles);


export const SalonSchedule = () => {

    const [days, setDays] = useState<IDay[]>([]);
    const [result, setResult] = useState<string>("");

    useEffect(() => {
        const ds = DayService.instance().listDays();
        setDays(ds);
    }, []);

    const handleSave = () => {
        const res = ScheduleService.instance().save();
        setResult(JSON.stringify(res, null, 2));
    };

    const handleCloseResult = () => {
        setResult("");
    };

    const classes = useStyles();
    const jsxDays: JSX.Element[] = [];

    for(let i=0; i<days.length; i++) {
        const day = days[i];
        jsxDays.push((<Day
                        key={day.id}
                        dayId={day.id}
                      />
        ));
    }

    let jsx;
    if(result) {
        jsx = (
            <SaveResult text={result} onClose={handleCloseResult}/>
        );
    } else {
        jsx = (
            <div className={classes.container}>
                {jsxDays}
                <Button variant="contained" color={"primary"} onClick={handleSave}>Сохранить</Button>
            </div>
        )
    }

    return jsx;
}
