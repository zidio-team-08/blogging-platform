import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageStep: 1,
    title: '',
    content: '',
    tags: [],
    bannerImage: ''
}

// slice
const newStorySlice = createSlice({
    name: "newStory",
    initialState,
    reducers: {
        setPageStep: (state, action) => {
            console.log('action', action);
            state.pageStep = action.payload.pageStep;
        },
        setTitle: (state, action) => {
            state.title = action.payload.title;
        },
        setContent: (state, action) => {
            state.content = action.payload.content;
        },
        setTags: (state, action) => {
            state.tags = action.payload.tags;
        },
        setBannerImage: (state, action) => {
            state.bannerImage = action.payload.bannerImage;
        }
    }
});

export const { setPageStep, setTitle, setContent, setTags, setBannerImage } = newStorySlice.actions;
export default newStorySlice.reducer;
