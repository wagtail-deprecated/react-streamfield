import React from 'react';
import uuidv4 from 'uuid';


export const isNA = value => {
  return (value === null) || (value === undefined)
};


export const getNewId = () => {
  return uuidv4();
};


export const getFieldName = blockId => {
  return `field-${blockId}`;
};


export const isField = blockDefinition => {
  return (blockDefinition.children === undefined)
      || (blockDefinition.children.length === 0);
};


export const isStruct = blockDefinition => {
  return (blockDefinition.isStruct !== undefined)
      && blockDefinition.isStruct;
};


export const isStatic = blockDefinition => {
  return (blockDefinition.isStatic !== undefined)
       && blockDefinition.isStatic;
};


export const getWindowWidth = () => {
  if (!window.innerWidth) {
    return document.documentElement.clientWidth;
  }
  return window.innerWidth;
};


export const getIsMobile = () => {
  return getWindowWidth() <= 799;
};


export const getLayout = (blockDefinition, isMobile) => {
  if ((blockDefinition.layout === undefined) || isMobile) {
    return 'COLLAPSIBLE';
  }
  return blockDefinition.layout;
};


export const isSimpleLayout = (blockDefinition, isMobile) => {
  return getLayout(blockDefinition, isMobile) === 'SIMPLE';
};


export const isClosed = (blockDefinition, isMobile) => {
  return !isSimpleLayout(blockDefinition, isMobile)
      && ((blockDefinition.closed === undefined)
          || blockDefinition.closed);
};


export const isRequired = blockDefinition => {
  return (blockDefinition.required !== undefined) && blockDefinition.required;
};


export const shouldRunInnerScripts = blockDefinition => {
  return (blockDefinition.dangerouslyRunInnerScripts !== undefined)
      && (blockDefinition.dangerouslyRunInnerScripts);
};


export const getLabel = blockDefinition => {
  let {key, label} = blockDefinition;
  if (label === undefined) {
    label = key.replace('_', ' ');
    label = label[0].toUpperCase() + label.substring(1);
  }
  return label;
};


export const extractText = html => {
  const tmp = document.createElement('span');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText;
};


export const getChildrenIds = (state, fieldId, parentId) => {
  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  if (parentId === null) {
    return fieldData.rootBlocks;
  } else {
    return blocks[parentId].value;
  }
};


export const getSiblingsIds = (state, fieldId, blockId) => {
  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  const block = blocks[blockId];
  const parentId = block.parent;
  if (parentId !== null) {
    const parentBlockDefinition = getNestedBlockDefinition(state, fieldId,
                                                           parentId);
    if (isStruct(parentBlockDefinition)) {
      return [blockId];
    }
  }
  return getChildrenIds(state, fieldId, parentId);
};


export const getAncestorsIds = (state, fieldId, blockId,
                                includeSelf=false) => {
  const blocks = state[fieldId].blocks;
  const ancestors = [];
  if (includeSelf) {
    ancestors.push(blockId);
  }

  let block = blocks[blockId];
  while (block.parent !== null) {
    blockId = block.parent;
    ancestors.push(blockId);
    block = blocks[blockId];
  }
  return ancestors.reverse();
};


export const getDescendantsIds = (state, fieldId, blockId,
                                  includeSelf=false) => {
  let descendants = [];
  if (includeSelf) {
    descendants.push(blockId);
  }

  const blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);

  if (isField(blockDefinition)) {
    return descendants;
  }

  for (let childBlockId of state[fieldId].blocks[blockId].value) {
    descendants = [
      ...descendants,
      ...getDescendantsIds(state, fieldId, childBlockId, true),
    ];
  }
  return descendants;
};


export const getBlockDefinition = (blockDefinitions, type) => {
  const blockDefinition = blockDefinitions.find(
    blockDefinition => blockDefinition.key === type);
  if (blockDefinition === undefined) {
    throw new TypeError(`No block definition found for '${type}'`);
  }
  return blockDefinition;
};


export const getNestedBlockDefinition = (state, fieldId, blockId) => {
  const fieldData = state[fieldId];
  let {blockDefinitions, blocks} = fieldData;
  let blockDefinition;
  for (let ancestorId of getAncestorsIds(state, fieldId, blockId, true)) {
    const block = blocks[ancestorId];
    blockDefinition = getBlockDefinition(blockDefinitions, block.type);
    blockDefinitions = blockDefinition.children;
  }
  return blockDefinition;
};


export const structValueToObject = (state, fieldId, structValue) => {
  const blocks = state[fieldId].blocks;
  const obj = {};
  for (let childBlockId of structValue) {
    const childBlockDefinition = getNestedBlockDefinition(state, fieldId,
                                                          childBlockId);
    let value;
    if (isField(childBlockDefinition)) {
      const childBlock = blocks[childBlockId];
      value = childBlock.value;
    } else {
      value = childBlockId;
    }
    obj[childBlockDefinition.key] = value;
  }
  return obj;
};


export const getNewBlock = (parentId, blockDefinition, value=null) => {
  let extraBlocks = {};
  let childBlockId, childBlock, childExtraBlocks;
  const blockId = getNewId();

  if (isNA(value) && (blockDefinition.default !== undefined)) {
    value = blockDefinition.default;
  }

  if (isStruct(blockDefinition)) {
    const newValue = [];
    for (let childBlockDefinition of blockDefinition.children) {
      let childDefaultValue = null;
      if (!isNA(value)) {
        for (let childDefault of value) {
          if (childDefault.type === childBlockDefinition.key) {
            childDefaultValue = childDefault.value;
            break;
          }
        }
      }
      [childBlockId, childBlock, childExtraBlocks] =
        getNewBlock(blockId, childBlockDefinition, childDefaultValue);
      newValue.push(childBlockId);
      extraBlocks = {
        ...extraBlocks,
        ...childExtraBlocks,
        [childBlockId]: childBlock,
      };
    }
    value = newValue;
  } else if (!isField(blockDefinition)) {
    const newValue = [];
    if (!isNA(value)) {
      for (let childBlock of value) {
        let childBlockDefinition;
        for (childBlockDefinition of blockDefinition.children) {
          if (childBlockDefinition.key === childBlock.type) {
            break;
          }
        }
        [childBlockId, childBlock, childExtraBlocks] =
          getNewBlock(blockId, childBlockDefinition, childBlock.value);
        newValue.push(childBlockId);
        extraBlocks = {
          ...extraBlocks,
          ...childExtraBlocks,
          [childBlockId]: childBlock,
        };
      }
    }
    value = newValue;
  }
  return [
    blockId,
    {
      parent: parentId,
      type: blockDefinition.key,
      value: value,
      hidden: true,
      closed: false,
      shouldUpdate: false,
    },
    extraBlocks,
  ];
};


export const deepCopy = data => {
  let copy;
  if (data instanceof FileList) {
    return data;
  }
  if (data instanceof Array) {
    copy = [];
    for (let value of data) {
      copy.push(deepCopy(value));
    }
    return copy;
  }
  if (data instanceof Object) {
    copy = {};
    for (const [key, value] of Object.entries(data)) {
      copy[key] = deepCopy(value);
    }
    return copy;
  }
  return data;
};


export const applyToBlocks = (state, fieldId, blocksIds, func) => {
  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  for (let blockId of blocksIds) {
    const block = deepCopy(blocks[blockId]);
    blocks[blockId] = func(block);
  }
  return {
    ...state,
    [fieldId]: {
      ...fieldData,
      blocks: blocks,
    },
  };
};


export const applyToBlock = (state, fieldId, blockId, func) => {
  return applyToBlocks(state, fieldId, [blockId], func);
};


export const triggerKeyboardEvent = (element, key) => {
  let event = document.createEvent('Event');

  event.initEvent('keydown', true, true);

  event.key = key;            // These four lines
  event.keyIdentifier = key;  // are here
  event.keyCode = key;        // to fix cross-browser
  event.which = key;          // compatibility issues.

  element.dispatchEvent(event);
};


export const triggerCustomEvent = (element, name, data=null) => {
  if (data === null) {
    data = {};
  }
  const event = new CustomEvent(`streamfield:${name}`, {
    detail: {
      target: element,
      ...data,
    },
  });
  element.dispatchEvent(event);
  window.dispatchEvent(event);
};


export const replaceWithComponent = (string, placeholder, component) => {
  const parts = string.split(new RegExp(`(${placeholder})`));
  for (const i in parts) {
    let part = parts[i];
    if (part === placeholder) {
      parts[i] = <React.Fragment key={i}>{component}</React.Fragment>
    } else {
      parts[i] = <span key={i} dangerouslySetInnerHTML={{__html: part}} />
    }
  }
  return <React.Fragment>{parts}</React.Fragment>;
};
