// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import { ReadRaison } from '../Redux/Raison';
import { ReadUser } from '../Redux/user';
// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers
});

const { dispatch } = store;

dispatch(ReadRaison())
dispatch(ReadUser())

export { store, dispatch };
