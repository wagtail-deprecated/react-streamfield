import uuidv4 from 'uuid';
import {
  getBlockDefinition,
  getNestedBlockDefinition,
  isField,
  isStruct,
  getNewBlock,
} from './utils';


export const getNestedBlocksState = (parentBlockId, blockDefinitions,
                                     blocks) => {
  const childrenBlocksIds = [];
  let blocksState = {};
  let descendantsBlocksState = {};

  for (let block of blocks) {
    const blockId = block.id === undefined ? uuidv4() : block.id;
    const blockDefinition = blockDefinitions.length === 1 ?
      blockDefinitions[0] : getBlockDefinition(blockDefinitions, block.type);
    const blockIsField = isField(blockDefinition);
    let value = block.value;
    if (!blockIsField) {
      if ((value === undefined) || (value === null)) {
        value = [];
      }
      if (isStruct(blockDefinition)) {
        for (let childBlockDefinition of blockDefinition.children) {
          const childBlockType = childBlockDefinition.key;
          const childBlock = value.find(
            childBlock => childBlock.type === childBlockType);
          if (childBlock === undefined) {
            let [childBlockId, childBlock, extraBlocks] =
              getNewBlock(blockId, childBlockDefinition);
            blocksState = {
              ...blocksState,
              ...extraBlocks,
              [childBlockId]: childBlock,
            };
            value.push({id: childBlockId, ...childBlock});
          }
        }
      }
      [value, descendantsBlocksState] = getNestedBlocksState(
        blockId, blockDefinition.children, value);
      blocksState = {
        ...blocksState,
        ...descendantsBlocksState,
      };
    }
    childrenBlocksIds.push(blockId);
    blocksState[blockId] = {
      parent: parentBlockId,
      type: blockDefinition.key,
      name: block.name,
      html: block.html,
      value: value,
      hidden: false,
      closed: true,
      shouldUpdate: false,
      isField: blockIsField,
    };
  }

  return [childrenBlocksIds, blocksState];
};


export const valueToState = (prevState, fieldId, value) => {
  const [rootBlocks, blocks] = getNestedBlocksState(
    null, prevState[fieldId].blockDefinitions, value);

  // Delete internal field created only for browsing data.
  for (let block of Object.values(blocks)) {
    delete block['isField'];
  }

  return {
    ...prevState,
    [fieldId]: {
      ...prevState[fieldId],
      rootBlocks: rootBlocks,
      blocks: blocks,
    },
  };
};


export const extractValue = (state, fieldId, blockId) => {
  const blocks = state[fieldId].blocks;
  const block = blocks[blockId];
  let value = block.value;
  const blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  if (!isField(blockDefinition)) {
    value = value.map(childBlockId => extractValue(state, fieldId,
                                                   childBlockId));
  }
  return {
    id: blockId,
    type: block.type,
    value: value,
  };
};


export const stateToValue = (state, fieldId) => {
  const fieldData = state[fieldId];
  return fieldData.rootBlocks.map(
    blockId => extractValue(state, fieldId, blockId));
};
