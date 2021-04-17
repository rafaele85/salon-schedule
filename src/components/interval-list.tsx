import {IInterval} from "../types/interval";
import {useEffect, useState} from "react";
import {IntervalService} from "../service/interval";
import {Interval} from "./interval";
import {IEvent, NotificationService} from "../service/notification";

export interface IIntervalListProps {
    dayEntityId: number;
}

export const IntervalList = (props: IIntervalListProps) => {
    const [intervals, setIntervals] = useState<IInterval[]>([]);

    useEffect(() => {
        const refreshList = () => {
            let ints = IntervalService.instance().listDayEntityIntervals(props.dayEntityId);
            console.log("refreshList ints=", ints)
            setIntervals(ints);
        }
        const handleUpdateList = (_event: IEvent, dayEventId: number) => {
            if(dayEventId===props.dayEntityId) {
                refreshList();
            }
        };

        refreshList();

        NotificationService.instance().subscribe(IEvent.UPDATEINTERVALLIST, handleUpdateList);
        return () => {
            NotificationService.instance().unsubscribe(IEvent.UPDATEINTERVALLIST, handleUpdateList);
        }
    }, [props.dayEntityId]);

    const handleAdd = () => {
        console.log("handleAdd")
        IntervalService.instance().addInterval(props.dayEntityId, "", "");
    };

    const handleDelete = (intervalId: number) => {
        IntervalService.instance().deleteInterval(intervalId);
    }

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

