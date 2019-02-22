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
  switch (action.type) {
    case 'INITIALIZE_STREAM_FIELD': {
      const data = deepCopy(action.data);
      const {
        required, minNum, maxNum, icons, blockDefinitions, isMobile, value,
      } = data;
      state = {
        ...state,
        [action.id]: {
          required, minNum, maxNum, icons, blockDefinitions, isMobile,
        },
      };
      return valueToState(state, action.id, value);
    }
    case 'SET_IS_MOBILE': {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isMobile: action.isMobile,
        }
      };
    }
    case 'BLOCK_UPDATED': {
      const {fieldId, blockId} = action;
      return applyToBlock(state, fieldId, blockId, block => ({
        ...block,
        shouldUpdate: false,
      }));
    }
    case 'CHANGE_BLOCK_VALUES': {
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
    case 'TOGGLE_BLOCK': {
      const {fieldId, blockId} = action;
      return applyToBlock(state, fieldId, blockId, block => ({
        ...block,
        closed: block.closed === undefined ? false : !block.closed,
        shouldUpdate: true,
      }));
    }
    case 'SHOW_BLOCK': {
      const {fieldId, blockId} = action;
      return applyToBlock(state, fieldId, blockId, block => ({
        ...block,
        hidden: false,
        shouldUpdate: true,
      }));
    }
    case 'HIDE_BLOCK': {
      const {fieldId, blockId} = action;
      return applyToBlock(state, fieldId, blockId, block => ({
        ...block,
        hidden: true,
        shouldUpdate: true,
      }));
    }
    case 'ADD_BLOCK': {
      const {fieldId, parentId, index, blockType} = action;
      return addBlock(state, fieldId, parentId, index, blockType);
    }
    case 'DUPLICATE_BLOCK': {
      const {fieldId, blockId} = action;
      return duplicateBlock(state, fieldId, blockId);
    }
    case 'MOVE_BLOCK': {
      const {fieldId, blockId, newIndex} = action;
      return moveBlock(state, fieldId, blockId, newIndex);
    }
    case 'DELETE_BLOCK': {
      return deleteBlock(state, action.fieldId, action.blockId);
    }
    default: {
      return state;
    }
  }
};
