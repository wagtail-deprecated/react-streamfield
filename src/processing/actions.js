import {
  applyToBlocks,
  getBlockDefinition,
  getChildrenIds,
  getDescendantsIds,
  getNestedBlockDefinition,
  getNewBlock, getNewId,
  isField,
  isStruct,
} from './utils';


export const updateChildren = (state, fieldId, parentId) => {
  const childrenIds = getChildrenIds(state, fieldId, parentId);
  return applyToBlocks(state, fieldId, childrenIds, block => ({
    ...block,
    shouldUpdate: true,
  }));
};


export const setChildren = (state, fieldId, parentId, childrenIds) => {
  let fieldData = state[fieldId];
  let blocks = fieldData.blocks;
  if (parentId === null) {
    fieldData = {...fieldData, rootBlocks: childrenIds};
  } else {
    blocks = {
      ...blocks,
      [parentId]: {...blocks[parentId], value: childrenIds},
    };
  }
  return {
    ...state,
    [fieldId]: {
      ...fieldData,
      blocks: blocks,
    },
  };
};


export const insertBlock = (state, fieldId, parentId, index,
                            blockId, block) => {
  const siblingsIds = [...getChildrenIds(state, fieldId, parentId)];
  siblingsIds.splice(index, 0, blockId);
  state = setChildren(state, fieldId, parentId, siblingsIds);

  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  state = {
    ...state,
    [fieldId]: {
      ...fieldData,
      blocks: {
        ...blocks,
        [blockId]: block,
      },
    },
  };
  return updateChildren(state, fieldId, parentId);
};


export const moveBlock = (state, fieldId, blockId, newIndex) => {
  if (newIndex <= -1) {
    throw new Error(`Index ${newIndex} is out of bounds.`);
  }
  const fieldData = state[fieldId];
  let blocks = fieldData.blocks;
  const block = blocks[blockId];
  const siblingsIds = [...getChildrenIds(state, fieldId, block.parent)];

  if (newIndex >= siblingsIds.length) {
    throw new Error(`Index ${newIndex} is out of bounds.`);
  }

  const oldIndex = siblingsIds.indexOf(blockId);
  siblingsIds.splice(oldIndex, 1);
  siblingsIds.splice(newIndex, 0, blockId);

  state = setChildren(state, fieldId, block.parent, siblingsIds);
  return updateChildren(state, fieldId, block.parent);
};


export const addBlock = (state, fieldId, parentId, index, type) => {
  const fieldData = state[fieldId];
  let blockDefinitions;
  if (parentId === null) {
    blockDefinitions = fieldData.blockDefinitions;
  } else {
    const parentBlockDefinition = getNestedBlockDefinition(state, fieldId,
                                                           parentId);
    blockDefinitions = parentBlockDefinition.children;
  }
  const blockDefinition = getBlockDefinition(blockDefinitions, type);
  const [blockId, block, extraBlocks] = getNewBlock(parentId, blockDefinition);
  state = {
    ...state,
    [fieldId]: {
      ...fieldData,
      blocks: {
        ...fieldData.blocks,
        ...extraBlocks,
      },
    },
  };
  return insertBlock(state, fieldId, parentId, index, blockId, block);
};


export const getIndex = (state, fieldId, blockId) => {
  const block = state[fieldId].blocks[blockId];
  const siblingsIds = [...getChildrenIds(state, fieldId, block.parent)];
  return siblingsIds.indexOf(blockId);
};


export const cloneBlock = (state, fieldId, parentId, blockId) => {
  const fieldData = state[fieldId];
  const blocks = {...fieldData.blocks};
  const newBlockId = getNewId();
  const newBlock = {...blocks[blockId], parent: parentId};
  let newBlocks = {[newBlockId]: newBlock};
  const blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  let value = newBlock.value;

  if (isStruct(blockDefinition)) {
    const newValue = [];
    for (let childBlockId of value) {
      let [newChildId, newChildrenBlocks] =
        cloneBlock(state, fieldId, newBlockId, childBlockId);
      newBlocks = {...newBlocks, ...newChildrenBlocks};
      newValue.push(newChildId);
    }
    value = newValue;
  } else if (!isField(blockDefinition)) {
    const newValue = [];
    for (let childBlockId of value) {
      const [newChildBlockId, newChildrenBlocks] =
        cloneBlock(state, fieldId, newBlockId, childBlockId);
      newValue.push(newChildBlockId);
      newBlocks = {...newBlocks, ...newChildrenBlocks};
    }
    value = newValue;
  }
  newBlock.value = value;
  return [newBlockId, newBlocks];
};


export const duplicateBlock = (state, fieldId, blockId) => {
  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  const parentId = blocks[blockId].parent;
  const [newBlockId, newBlocks] =
    cloneBlock(state, fieldId, parentId, blockId);
  state = {
    ...state,
    [fieldId]: {
      ...fieldData,
      blocks: {
        ...blocks,
        ...newBlocks,
      },
    },
  };
  const block = newBlocks[newBlockId];
  block.hidden = true;
  const index = getIndex(state, fieldId, blockId) + 1;  // + 1 to add after.
  return insertBlock(state, fieldId, parentId, index, newBlockId, block);
};


export const deleteBlock = (state, fieldId, blockId) => {
  const fieldData = state[fieldId];
  let rootBlocks = [...fieldData.rootBlocks];
  const blocks = {...fieldData.blocks};
  const block = blocks[blockId];
  let shouldUpdateSiblings = true;
  if (block.parent === null) {
    rootBlocks = rootBlocks.filter(childBlockId => childBlockId !== blockId);
  } else {
    const parentBlockDefinition = getNestedBlockDefinition(state, fieldId,
                                                           block.parent);
    const parentBlock = blocks[block.parent];
    if (isStruct(parentBlockDefinition)) {
      shouldUpdateSiblings = false;
    }
    blocks[block.parent] = {
      ...parentBlock,
      value: parentBlock.value.filter(
        childBlockId => childBlockId !== blockId),
    };
  }
  for (let descendantBlockId of getDescendantsIds(state, fieldId, blockId,
                                                  true)) {
    delete blocks[descendantBlockId];
  }
  state = {
    ...state,
    [fieldId]: {
      ...fieldData,
      rootBlocks,
      blocks,
    },
  };
  if (shouldUpdateSiblings) {
    return updateChildren(state, fieldId, block.parent);
  }
  return state;
};
