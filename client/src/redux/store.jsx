import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import newStoryReducer from '../features/blogSlice';
import userActionsReducer from '../features/userActionsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        newStory: newStoryReducer,
        userActions: userActionsReducer,
    },
})