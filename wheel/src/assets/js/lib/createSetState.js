import objectAssign from 'object-assign';

export default (state, cb) => (newState, force = false) => {
  const isUpdating = (prop) => (force ? state : newState)[prop] !== undefined;
  const prevState = objectAssign({}, state);
  objectAssign(state, newState);

  cb({
    isUpdating,
    state,
    prevState,
    newState
  });
};
