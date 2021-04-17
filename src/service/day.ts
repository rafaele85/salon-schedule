import {IDay} from "../types/days";
import {IEvent, NotificationService} from "./notification";


export const DAYS = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
]

export class DayService {
    private static readonly _instance = new DayService();
    public static instance() {
        return DayService._instance;
    }
    private days: IDay[] = [];
    private constructor() {
        for(let i=0; i<DAYS.length; i++) {
            this.days[i] = {id: i, label: DAYS[i], active: false};
        }
    }

    public listDays() {
        return this.days;
    }

    public updateDay(dayId: number, active: boolean) {
        const day = this.days[dayId];
        if(!day) {
            console.error("Not found day ", dayId)
            return;
        }
        day.active=active;
        this.days[dayId] = day;
        NotificationService.instance().notify(IEvent.UPDATEDAY, dayId);
    }

    public getDay(dayId: number) {
        const day = this.days[dayId];
        if(!day) {
            console.error("Not found day ", dayId)
            return;
        }
        return day;
    }

    public isActive(dayId: number) {
        const day = this.days[dayId];
        if(!day) {
            console.error("Not found day ", dayId)
            return;
        }
        return day.active;
    }
}