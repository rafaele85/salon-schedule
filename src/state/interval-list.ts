import {IInterval} from "../types/interval";
import {createSlice, CreateSliceOptions, PayloadAction, SliceCaseReducers} from "@reduxjs/toolkit";
import {IRootState} from "./root";
import {Dispatch} from "react";

export interface IIntervalListState {
    intervalList: IInterval[];
}

type IIntervalListAction = PayloadAction<IInterval[]>;

type IIntervalFromUpdatePayload = {
    intervalId: number;
    from: string;
}

type IIntervalFromUpdateAction = PayloadAction<IIntervalFromUpdatePayload>;

type IIntervalToUpdatePayload = {
    intervalId: number;
    to: string;
}

type IIntervalToUpdateAction = PayloadAction<IIntervalToUpdatePayload>;



type IIntervalDeletePayload = {
    intervalId: number;
}

type IIntervalDeleteAction = PayloadAction<IIntervalDeletePayload>;


type IIntervalAddPayload = {
    dayEntityId: number;
    from: string;
    to: string;
}

export type IIntervalAddAction = PayloadAction<IIntervalAddPayload>;


type IIntervalClearEntityPayload = {
    dayEntityId: number;
};

export type IIntervalClearEntityAction = PayloadAction<IIntervalClearEntityPayload>;

const updateInterval = (intervals: IInterval[], field: "from"|"to", intervalId: number, value: string) => {
        let intervalNdx = intervals.findIndex((nt) => nt.id === intervalId);
        if(intervalNdx >= 0) {
            intervals[intervalNdx][field] = value;
        }
};

let INTERVALSEQ=0;

const options: CreateSliceOptions<IIntervalListState, SliceCaseReducers<IIntervalListState>> = {
    name: "intervalList",
    initialState: {
        intervalList: []
    },
    reducers: {
        setIntervalList: (state: IIntervalListState, action: IIntervalListAction) => {
            state.intervalList = action.payload;
        },

        updateIntervalFrom: (state: IIntervalListState, action: IIntervalFromUpdateAction) => {
            updateInterval(state.intervalList, "from", action.payload.intervalId, action.payload.from);
        },

        updateIntervalTo: (state: IIntervalListState, action: IIntervalToUpdateAction) => {
            updateInterval(state.intervalList, "to", action.payload.intervalId, action.payload.to);
        },

        deleteInterval: (state: IIntervalListState, action: IIntervalDeleteAction) => {
            state.intervalList = state.intervalList.filter( (nt) => nt.id !== action.payload.intervalId );
        },

        addInterval: (state: IIntervalListState, action: IIntervalAddAction) => {
            const id = INTERVALSEQ++;
            const nt: IInterval = {
                id,
                dayEntityId: action.payload.dayEntityId,
                from: action.payload.from,
                to: action.payload.to
            };
            state.intervalList.push(nt);
        },

        clearEntityIntervals: (state: IIntervalListState, action: IIntervalClearEntityAction) => {
            state.intervalList = state.intervalList.filter( (nt) => nt.dayEntityId !== action.payload.dayEntityId );
        }
    }

};

const slice = createSlice(options);

export const intervalListReducer = slice.reducer;


export const selectIntervals = (state: IRootState) => {
    return state.intervalList.intervalList;
};

export const selectDayEntityIntervals = (dayEntityId: number) => (state: IRootState) => {
    const arr = state.intervalList.intervalList.filter((nt) => nt.dayEntityId===dayEntityId);
    return arr.sort((a,b) => a.id-b.id);
};

export const updateIntervalFrom = (dispatch: Dispatch<IIntervalFromUpdateAction>, intervalId: number, from: string) =>
    dispatch(slice.actions.updateIntervalFrom({intervalId, from}));

export const updateIntervalTo = (dispatch: Dispatch<IIntervalToUpdateAction>, intervalId: number, to: string) =>
    dispatch(slice.actions.updateIntervalTo({intervalId, to}));

export const addInterval = (dispatch: Dispatch<IIntervalAddAction>, dayEntityId: number, from: string, to: string) =>
    dispatch(slice.actions.addInterval({dayEntityId, from, to}));

export const deleteInterval = (dispatch: Dispatch<IIntervalDeleteAction>, intervalId: number) =>
    dispatch(slice.actions.deleteInterval(intervalId));

export const clearEntityIntervals = (dispatch: Dispatch<IIntervalClearEntityAction>, dayEntityId: number) =>
    dispatch(slice.actions.clearEntityIntervals(dayEntityId));

export const selectIntervalFrom = (intervalId: number) => (state: IRootState) => {
    const intervalList = state.intervalList.intervalList
    return intervalList[intervalId].from;
};

export const selectIntervalTo = (intervalId: number) => (state: IRootState) => {
    const intervalList = state.intervalList.intervalList
    return intervalList[intervalId].to;
};

