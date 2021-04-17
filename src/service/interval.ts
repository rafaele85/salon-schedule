import {IInterval} from "../types/interval";
import {IEvent, NotificationService} from "./notification";
import {IDayEntity} from "../types/schedule";

let INTERVALSEQ = 0;

export class IntervalService {
    private static readonly _instance = new IntervalService();
    public static instance() {
        return IntervalService._instance;
    }
    private intervals = new Map<number, IInterval>();

    private constructor() {
    }

    public handleUpdateEntity(entity: IDayEntity) {
        if(entity.active) {
            this.addInterval(entity.id, "", "");
        } else {
            this.clearEntityIntervals(entity.id)
        }
        console.log("handleUpdateEntity: intervals=", this.intervals)
    }

    protected clearEntityIntervals(dayEntityId: number) {
        this.intervals.forEach((nt: IInterval) => {
            if(nt.dayEntityId===dayEntityId) {
                this.intervals.delete(nt.id);
            }
        });
    }

    public addInterval(dayEntityId: number, from: string, to: string) {
        const id = INTERVALSEQ++;
        const nt = {id, dayEntityId, from, to};
        this.intervals.set(id, nt);
        NotificationService.instance().notify(IEvent.UPDATEINTERVALLIST, dayEntityId);
    }

    public listDayEntityIntervals(dayEntityId: number) {
        const arr: IInterval[] = [];
        this.intervals.forEach((nt: IInterval) => {
            if(nt.dayEntityId===dayEntityId) {
                arr.push(nt);
            }
        });
        return arr.sort((a,b) => a.id-b.id);
    }

    public updateIntervalFrom(intervalId: number, from: string) {
        const nt = this.intervals.get(intervalId);
        if(!nt) {
            console.error("Not found interval for intervalId ", intervalId);
            return;
        }
        nt.from=from;
        NotificationService.instance().notify(IEvent.UPDATEINTERVAL, intervalId);
    }

    public updateIntervalTo(intervalId: number, to: string) {
        const nt = this.intervals.get(intervalId);
        if(!nt) {
            console.error("Not found interval for intervalId ", intervalId);
            return;
        }
        nt.to=to;
        NotificationService.instance().notify(IEvent.UPDATEINTERVAL, intervalId);
    }

    public deleteInterval(intervalId: number) {
        const nt = this.intervals.get(intervalId);
        if(!nt) {
            console.error("Not found interval for intervalId ", intervalId);
            return;
        }
        this.intervals.delete(intervalId);
        NotificationService.instance().notify(IEvent.UPDATEINTERVALLIST, nt.dayEntityId);
    }

    public getInterval(intervalId: number) {
        console.log("getInterval intervals=", this.intervals)
        const nt = this.intervals.get(intervalId);
        if(!nt) {
            console.error("Not found interval for intervalId ", intervalId);
            return;
        }
        return nt;
    }
}