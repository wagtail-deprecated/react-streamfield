export const initializeStreamField = (id, data) => ({
  type: 'INITIALIZE_STREAM_FIELD',
  id, data,
});


export const setIsMobile = (id, isMobile) => ({
  type: 'SET_IS_MOBILE',
  id, isMobile,
});


export const blockUpdated = (fieldId, blockId) => ({
  type: 'BLOCK_UPDATED',
  fieldId, blockId,
});


export const changeBlockValue = (fieldId, blockId, value) => ({
  type: 'CHANGE_BLOCK_VALUES',
  fieldId, blockId,
  value,
});


export const toggleBlock = (fieldId, blockId) => ({
  type: 'TOGGLE_BLOCK',
  fieldId, blockId,
});


export const showBlock = (fieldId, blockId) => dispatch => {
  return new Promise(resolve => {
    setTimeout(resolve, 0.001);
  }).then(() => {
    dispatch({
      type: 'SHOW_BLOCK',
      fieldId, blockId,
    });
  });
};


export const hideBlock = (fieldId, blockId) => ({
  type: 'HIDE_BLOCK',
  fieldId, blockId,
});


export const addBlock = (fieldId, parentId, index, blockType) => ({
  type: 'ADD_BLOCK',
  fieldId, parentId, index, blockType,
});


export const duplicateBlock = (fieldId, blockId) => ({
  type: 'DUPLICATE_BLOCK',
  fieldId, blockId,
});


export const moveBlock = (fieldId, blockId, newIndex) => ({
  type: 'MOVE_BLOCK',
  fieldId, blockId, newIndex,
});


export const deleteBlock = (fieldId, blockId) => ({
  type: 'DELETE_BLOCK',
  fieldId, blockId,
});
