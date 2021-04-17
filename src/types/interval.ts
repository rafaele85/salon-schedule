export type ITime = string;

export type ITimeEntry = {
    id: string;
    from: ITime;
    to: ITime;
}

export type ITimeEntries = ITimeEntry[];

export const formatTime = (hr: number) => {
    const prefix = (hr<10 ? "0": "");
    return `${prefix}${hr}:00`;
};


export const allTimes = () => {
    const times: ITime[] = [];
    for(let i=0; i<=23; i++) {
        times.push(formatTime(i));
    }
    return times;
};

export type IInterval = {
    id: number;
    dayEntityId: number;
    from: string;
    to: string;
}