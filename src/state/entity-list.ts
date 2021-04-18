import {PayloadAction, CreateSliceOptions, SliceCaseReducers, createSlice} from "@reduxjs/toolkit";
import {IDayEntity} from "../types/schedule";
import {IRootState} from "./root";
import {DAYS} from "../types/days";
import {addInterval, clearEntityIntervals, IIntervalAddAction, IIntervalClearEntityAction} from "./interval-list";
import {Dispatch} from "react";


export interface IEntityListState {
    entityList: IDayEntity[];
}

type IEntityListAction = PayloadAction<IDayEntity[]>;

type IEntityUpdatePayload = {
    dayEntityId: number;
    active: boolean;
}

type IEntityUpdateAction = PayloadAction<IEntityUpdatePayload>;


const Entities = [
    "В Москве",
    "Студия на Академической",
];

let initialEntityList: IDayEntity[] = [];
const getInitialEntityList = () => {
    if(initialEntityList.length===0) {
        let dayEntityId=0;
        const entities: IDayEntity[] = [];
        for(let dayId=0; dayId<DAYS.length; dayId++) {
            for(let i=0; i<Entities.length; i++) {
                entities[dayEntityId] = {id: dayEntityId, dayId: dayId, entityId: dayEntityId, active: false, label: Entities[i], isBreak: false};
                dayEntityId++;
            }
            entities[dayEntityId] = {id: dayEntityId, dayId: dayId, entityId: dayEntityId, active: false, label: "Перерыв", isBreak: true};
            dayEntityId++;
        }
        initialEntityList = entities;
    }
    console.log("initialEntityList = ", initialEntityList)
    return initialEntityList;
}



const options: CreateSliceOptions<IEntityListState, SliceCaseReducers<IEntityListState>> = {
    name: "entityList",
    initialState: {
        entityList: getInitialEntityList()
    },
    reducers: {
        setEntityList: (state: IEntityListState, action: IEntityListAction) => {
            state.entityList = action.payload;
        },
        updateEntity: (state: IEntityListState, action: IEntityUpdateAction) => {
            const dayEntityId = action.payload.dayEntityId;
            const entity = state.entityList[dayEntityId];
            entity.active = action.payload.active||false;
            //TODO IntervalService.instance().handleUpdateEntity(ent);
        },
    }
};

const slice = createSlice(options);

export const entityListReducer = slice.reducer;

export const selectEntities = (state: IRootState) => {
    return state.entityList.entityList;
};


export const selectDayEntityList = (dayId: number) => (state: IRootState) => {
    const arr = state.entityList.entityList.filter((de) => de.dayId===dayId);
    return arr.sort((a,b) => a.entityId-b.entityId);
};

export const selectEntity = (dayEntityId: number) => (state: IRootState) => {
    const entityList = state.entityList.entityList;
    return entityList[dayEntityId];
};

type IEntityIntervalAction = IEntityUpdateAction | IIntervalAddAction | IIntervalClearEntityAction;

export const updateEntity = (dispatch: Dispatch<IEntityIntervalAction>, dayEntityId: number, active: boolean) => {
    dispatch(slice.actions.updateEntity({dayEntityId, active}));
    if(active) {
        addInterval(dispatch, dayEntityId, "", "");
    } else {
        clearEntityIntervals(dispatch, dayEntityId);
    }
};

