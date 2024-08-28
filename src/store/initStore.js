import throttle from 'lodash/throttle';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import { loadState, saveState } from './localStorage';

const initStore = () => {
  const preloadedState = loadState();

  const store = configureStore({
    reducer,
    preloadedState,
  });

  store.subscribe(throttle(() => {
    saveState({
      events: store.getState().events,
      blogs: store.getState().blogs,
      mhps: store.getState().mhps,
      eventFeedbacks: store.getState().eventFeedbacks,
      mhpFeedbacks: store.getState().mhpFeedbacks,
      therapyTerms: store.getState().therapyTerms,
      schedules: store.getState().schedules,
    });
  }, 1000));

  return store;
};

export default initStore;
