import React from 'react';
import {
  addBlock,
  deleteBlock,
  duplicateBlock,
  moveBlock
} from './processing/actions';
import {valueToState} from './processing/conversions';
import {
  applyToBlock,
  deepCopy,
  getNestedBlockDefinition, isStruct
} from './processing/utils';


const initialState = {};


export default (state=initialState, action) => {
  if (action.type === 'INITIALIZE_STREAM_FIELD') {
    const data = deepCopy(action.data);
    state = {
      ...state,
      [action.id]: {
        blockDefinitions: data.blockDefinitions,
      },
    };
    return valueToState(state, action.id, data.value);
  }
  if (action.type === 'BLOCK_UPDATED') {
    const {fieldId, blockId} = action;
    return applyToBlock(state, fieldId, blockId, block => ({
      ...block,
      shouldUpdate: false,
    }));
  }
  if (action.type === 'CHANGE_BLOCK_VALUES') {
    const {fieldId, blockId, value} = action;
    state = applyToBlock(state, fieldId, blockId, block => ({
      ...block,
      value: value,
      shouldUpdate: true,
    }));
    const blocks = state[fieldId].blocks;
    const block = blocks[blockId];
    const parentBlockId = block.parent;
    if (parentBlockId !== null) {
      const parentBlockDefinition = getNestedBlockDefinition(state, fieldId,
                                                             parentBlockId);
      if (isStruct(parentBlockDefinition)) {
        state = applyToBlock(state, fieldId, parentBlockId, block => ({
          ...block,
          shouldUpdate: true,
        }));
      }
    }
    return state;
  }
  if (action.type === 'TOGGLE_BLOCK') {
    const {fieldId, blockId} = action;
    return applyToBlock(state, fieldId, blockId, block => ({
      ...block,
      closed: block.closed === undefined ? false : !block.closed,
      shouldUpdate: true,
    }));
  }
  if (action.type === 'SHOW_BLOCK') {
    const {fieldId, blockId} = action;
    return applyToBlock(state, fieldId, blockId, block => ({
      ...block,
      hidden: false,
      shouldUpdate: true,
    }));
  }
  if (action.type === 'HIDE_BLOCK') {
    const {fieldId, blockId} = action;
    return applyToBlock(state, fieldId, blockId, block => ({
      ...block,
      hidden: true,
      shouldUpdate: true,
    }));
  }
  if (action.type === 'ADD_BLOCK') {
    const {fieldId, parentId, index, blockType} = action;
    return addBlock(state, fieldId, parentId, index, blockType);
  }
  if (action.type === 'DUPLICATE_BLOCK') {
    const {fieldId, blockId} = action;
    return duplicateBlock(state, fieldId, blockId);
  }
  if (action.type === 'MOVE_BLOCK') {
    const {fieldId, blockId, newIndex} = action;
    return moveBlock(state, fieldId, blockId, newIndex);
  }
  if (action.type === 'DELETE_BLOCK') {
    return deleteBlock(state, action.fieldId, action.blockId);
  }
  return state;
};
