import {dayListReducer, IDayListState} from "./day-list";
import {entityListReducer, IEntityListState} from "./entity-list";
import {IIntervalListState, intervalListReducer} from "./interval-list";

export interface IRootState {
    dayList: IDayListState;
    entityList: IEntityListState;
    intervalList: IIntervalListState;
}

export const rootReducer = {
    dayList: dayListReducer,
    entityList: entityListReducer,
    intervalList: intervalListReducer,
};




