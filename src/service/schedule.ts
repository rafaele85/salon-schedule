import {DayService} from "./day";
import {EntityService} from "./entity";
import {IntervalService} from "./interval";

type ISInterval = {from: string, to: string};
type ISBranch = {branch: string, schedule: ISInterval[]};
type ISDaySchedule = {day: string, branches: ISBranch[], breaks: ISInterval[]};
type ISSchedule = {schedule: ISDaySchedule[]};

export class ScheduleService {
    private static readonly _instance = new ScheduleService();
    public static instance() {
        return ScheduleService._instance;
    }
    private constructor() {
    }

    public save() {
        const daySchedule: ISDaySchedule[] = [];
        const days = DayService.instance().listDays();
        days.forEach(d => {
            if(d.active) {
                const branches: ISBranch[] = [];
                const entities = EntityService.instance().listDayEntities(d.id);
                let breaks: ISInterval[] = [];
                entities.forEach(e => {
                    if(e.active) {
                        const intervals = IntervalService.instance().listDayEntityIntervals(e.id);
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
        return schedule;
    }
}

/*
{
   schedule: [
      {day: "Понедельник",
       branches: [
         {branch: "В Москве", times: [
            {from: "01:00", to: "02:00"},
            {from: "03:00", to: "04:00"},
         ]},
       ],
       breaks: [
            {from: "01:00", to: "02:00"},
            {from: "03:00", to: "04:00"},
       ],
      },

   ]
}
 */