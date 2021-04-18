import {ITimeEntries} from "./interval";


export type IDayEntity = {id: number; entityId: number; dayId: number; label: string, active: boolean, isBreak?: boolean};

export type IEntitySchedule = {
    id: number;
    label: string;
    times: ITimeEntries;
};

export type ISchedule = IEntitySchedule[][];

