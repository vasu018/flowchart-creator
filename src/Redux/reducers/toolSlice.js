import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toolProperty: { name: "", color: "" },
}
export const toolSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toolswitch: (state, action) => {
            state.toolProperty = { name: action.payload.name, color: action.payload.color }

        },
    },
})

export const { toolswitch } = toolSlice.actions

export default toolSlice.reducer