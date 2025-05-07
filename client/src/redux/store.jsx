import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import newStoryReducer from '../features/blogSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        newStory: newStoryReducer
    },
})