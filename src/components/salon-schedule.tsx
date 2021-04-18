import {Button, makeStyles, Theme} from "@material-ui/core";
import {useState} from "react";
import {Day} from "./day";
import {SaveResult} from "./save-result";
import {useSelector} from "react-redux";
import {selectDayList} from "../state/day-list";

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

    const [showResult, setShowResult] = useState<boolean>(false);

    const days = useSelector(selectDayList);

    const handleSave = () => {
        setShowResult(true);
    };

    const handleCloseResult = () => {
        setShowResult(false);
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
    if(showResult) {
        jsx = (
            <SaveResult onClose={handleCloseResult}/>
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
