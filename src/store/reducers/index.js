// third-party
import { combineReducers } from 'redux';

// project import

import raison from '../../Redux/Raison';
import user from '../../Redux/user';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ raison, user });

export default reducers;
