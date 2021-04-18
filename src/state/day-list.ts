import {PayloadAction, CreateSliceOptions, SliceCaseReducers, createSlice} from "@reduxjs/toolkit";
import {DAYS, IDay} from "../types/days";
import {IRootState} from "./root";
import {Dispatch} from "react";

export interface IDayListState {
    dayList: IDay[];
}

export type IDayListAction = PayloadAction<IDay[]>;

type IDayUpdatePayload = {
    dayId: number;
    active: boolean;
}

export type IDayUpdateAction = PayloadAction<IDayUpdatePayload>;

let initialDayList: IDay[] = [];
const getInitialDayList = () => {
    if(!initialDayList.length) {
        const days: IDay[] = [];
        for (let i = 0; i < DAYS.length; i++) {
            days[i] = {id: i, label: DAYS[i], active: false};
        }
        initialDayList=days;
    }
    return initialDayList;
};


const options: CreateSliceOptions<IDayListState, SliceCaseReducers<IDayListState>> = {
    name: "dayList",
    initialState: {
        dayList: getInitialDayList()
    },
    reducers: {
        setDayList: (state: IDayListState, action: IDayListAction) => {
            state.dayList = action.payload;
        },
        updateDay: (state: IDayListState, action: IDayUpdateAction) => {
            const dayId = action.payload.dayId;
            const day = state.dayList[dayId];
            day.active = action.payload.active;
        },
    }
};

const slice = createSlice(options);

export const dayListReducer = slice.reducer;


export const selectDayList = (state: IRootState) => state.dayList.dayList;

export const selectDay = (dayId: number) => (state: IRootState) => {
    const dayList = state.dayList.dayList;
    return dayList[dayId];
};

export const selectIsDayActive = (dayId: number) => (state: IRootState) => {
    const dayList = state.dayList.dayList;
    return dayList[dayId].active||false;
};

export const setDayList = (dispatch: Dispatch<IDayListAction>, days: IDay[]) => dispatch(slice.actions.setDayList(days));
export const updateDay = (dispatch: Dispatch<IDayUpdateAction>, dayId: number, active: boolean) => dispatch(slice.actions.updateDay({dayId, active}));
