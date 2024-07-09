import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export type IDocumentState = {
    test: boolean;
};

const initialState: IDocumentState = {
    test: false,
};

export const documentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        setDocumentState(state: IDocumentState, action) {
            state.test = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.document,
            };
        },
    },
});

export const { setDocumentState } = documentSlice.actions;
export const { ...documentActions } = documentSlice.actions;
export default documentSlice.reducer;
