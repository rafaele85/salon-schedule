import {IDayEntity} from "../types/schedule";
import {DayService} from "./day";
import {IEvent, NotificationService} from "./notification";
import {IntervalService} from "./interval";

const Entities = [
    "В Москве",
    "Студия на Академической",
]

export class EntityService {
    private static readonly _instance = new EntityService();
    public static instance() {
        return EntityService._instance;
    }
    private entities: IDayEntity[] = [];

    private constructor() {
        let dayEntityId=0;
        for(let day of DayService.instance().listDays()) {
            for(let i=0; i<Entities.length; i++) {
                this.entities[dayEntityId] = {id: dayEntityId, dayId: day.id, entityId: dayEntityId, active: false, label: Entities[i], isBreak: false};
                dayEntityId++;
            }
            this.entities[dayEntityId] = {id: dayEntityId, dayId: day.id, entityId: dayEntityId, active: false, label: "Перерыв", isBreak: true};
            dayEntityId++;
        }
    }

    public listDayEntities(dayId: number) {
        const arr: IDayEntity[] = [];
        for(let i=0; i<this.entities.length; i++) {
            const de = this.entities[i];
            if(de.dayId!==dayId) {
                continue;
            }
            arr.push(de);
        }
        return arr.sort((a,b) => a.entityId-b.entityId);
    }


    public updateEntity(dayEntityId: number, active: boolean) {
        const ent = this.entities[dayEntityId];
        if(!ent) {
            console.error("Not found day entity for dayEntityId", dayEntityId)
        }
        ent.active=active;
        console.log("updateEnitty - sending event IEvent.UPDATEEENTITY for ", dayEntityId)
        IntervalService.instance().handleUpdateEntity(ent);
        NotificationService.instance().notify(IEvent.UPDATEEENTITY, dayEntityId);
    }

    public getEntity(dayEntityId: number) {
        const ent = this.entities[dayEntityId];
        if(!ent) {
            console.error("Not found day entity for dayEntityId", dayEntityId)
        }
        return ent;
    }
}