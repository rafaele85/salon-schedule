import {Interval} from "./interval";
import {addInterval, deleteInterval, selectDayEntityIntervals} from "../state/interval-list";
import {useDispatch, useSelector} from "react-redux";

export interface IIntervalListProps {
    dayEntityId: number;
}

export const IntervalList = (props: IIntervalListProps) => {

    const intervals = useSelector(selectDayEntityIntervals(props.dayEntityId));

    const addDispatch = useDispatch();
    const handleAdd = () => {
        addInterval(addDispatch, props.dayEntityId, "", "");
    };

    const delDispatch = useDispatch();
    const handleDelete = (intervalId: number) => {
        deleteInterval(delDispatch, intervalId);
    };

    const jsxTimes: JSX.Element[] = [];
    for(let i=0; i<intervals.length; i++) {
        const it = intervals[i];
        const isLast = (i===intervals.length-1);
        jsxTimes.push((
            <Interval key={it.id}
                      intervalId={it.id}
                      isLast={isLast}
                      onAdd={handleAdd}
                      onDelete={() => handleDelete(it.id)}
            />
        ));
    }
    return (
        <div>
            {jsxTimes}
        </div>
    )
}

