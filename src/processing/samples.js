import uuidv4 from 'uuid';


//
// Definition
//


export const fieldId = uuidv4();


export const rootBlockDefinition = {
  key: 'image',
  label: 'Image',
  icon: 'image',
};


export const listBlockImageDefinition = {
  key: 'image',
  label: 'Image',
  icon: 'image',
};


export const listBlockDefinition = {
  key: 'carousel',
  label: 'Carousel',
  children: [
    listBlockImageDefinition,
  ],
};


export const structBlockHeightDefinition = {
  key: 'height',
  label: 'Height',
};


export const structBlockWidthDefinition = {
  key: 'width',
  label: 'Width',
};


export const structBlockImageDefinition = {
  key: 'image',
  label: 'Image',
};


export const structBlockImageCellDefinition = {
  key: 'image_cell',
  label: 'Image',
  icon: 'image',
  isStruct: true,
  children: [
    structBlockWidthDefinition,
    structBlockImageDefinition,
  ],
};


export const structBlockImagesDefinition = {
  key: 'images',
  label: 'Images',
  children: [
    structBlockImageCellDefinition,
  ],
};


export const structBlockPageDefinition = {
  key: 'page',
  label: 'Page',
};


export const structBlockRelatedPagesDefinition = {
  key: 'related_pages',
  label: 'Related pages',
  children: [
    structBlockPageDefinition,
  ]
};


export const structBlockDefinition = {
  key: 'image_row',
  label: 'Image row',
  isStruct: true,
  children: [
    structBlockHeightDefinition,
    structBlockImagesDefinition,
    structBlockRelatedPagesDefinition,
  ],
};


export const streamBlockImageDefinition = {
  key: 'image',
  label: 'Image',
  icon: 'image',
};


export const streamBlockTitleDefinition = {
  key: 'title',
  label: 'Title',
};


export const streamBlockDefinition = {
  key: 'rich_carousel',
  label: 'Rich carousel',
  children: [
    streamBlockImageDefinition,
    streamBlockTitleDefinition,
  ],
};


export const blockDefinitions = [
  rootBlockDefinition,
  listBlockDefinition,
  structBlockDefinition,
  streamBlockDefinition,
];


//
// Value
//


export const rootBlock1Id = uuidv4();
export const rootBlock1 = {
  id: rootBlock1Id,
  type: 'image',
  value: 1154,
};
export const rootBlock2Id = uuidv4();
export const rootBlock2 = {
  id: rootBlock2Id,
  type: 'image',
  value: 57,
};


export const listBlockImage1Id = uuidv4();
export const listBlockImage1 = {
  id: listBlockImage1Id,
  type: 'image',
  value: 1154,
};


export const listBlockImage2Id = uuidv4();
export const listBlockImage2 = {
  id: listBlockImage2Id,
  type: 'image',
  value: 57,
};


export const listBlockId = uuidv4();
export const listBlock = {
  id: listBlockId,
  type: 'carousel',
  value: [listBlockImage1, listBlockImage2],
};


export const structBlockHeightId = uuidv4();
export const structBlockHeight = {
  id: structBlockHeightId,
  type: 'height',
  value: 'short',
};


export const structBlockWidth1Id = uuidv4();
export const structBlockWidth1 = {
  id: structBlockWidth1Id,
  type: 'width',
  value: 'col-md-4',
};


export const structBlockImage1Id = uuidv4();
export const structBlockImage1 = {
  id: structBlockImage1Id,
  type: 'image',
  value: 257,
};


export const structBlockImageCell1Id = uuidv4();
export const structBlockImageCell1 = {
  id: structBlockImageCell1Id,
  type: 'image_cell',
  value: [structBlockImage1, structBlockWidth1],
};


export const structBlockWidth2Id = uuidv4();
export const structBlockWidth2 = {
  id: structBlockWidth2Id,
  type: 'width',
  value: 'col-md-8',
};


export const structBlockImage2Id = uuidv4();
export const structBlockImage2 = {
  id: structBlockImage2Id,
  type: 'image',
  value: 319,
};


export const structBlockImageCell2Id = uuidv4();
export const structBlockImageCell2 = {
  id: structBlockImageCell2Id,
  type: 'image_cell',
  value: [structBlockImage2, structBlockWidth2],
};


export const structBlockImageCellAllSortedIds = [
  structBlockImageCell1Id, structBlockImage1Id, structBlockWidth1Id,
  structBlockImageCell2Id, structBlockImage2Id, structBlockWidth2Id];


export const structBlockImagesId = uuidv4();
export const structBlockImages = {
  id: structBlockImagesId,
  type: 'images',
  value: [structBlockImageCell1, structBlockImageCell2],
};


export const structBlockPageId = uuidv4();
export const structBlockPage = {
  id: structBlockPageId,
  type: 'page',
  value: 8,
};


export const structBlockRelatedPagesId = uuidv4();
export const structBlockRelatedPages = {
  id: structBlockRelatedPagesId,
  type: 'related_pages',
  value: [structBlockPage]
};


export const structBlockId = uuidv4();
export const structBlock = {
  id: structBlockId,
  type: 'image_row',
  value: [
    structBlockHeight,
    structBlockImages,
    structBlockRelatedPages,
  ],
};


export const streamBlockImageId = uuidv4();
export const streamBlockImage = {
  id: streamBlockImageId,
  type: 'image',
  value: 121,
};


export const streamBlockTitleId = uuidv4();
export const streamBlockTitle = {
  id: streamBlockTitleId,
  type: 'title',
  value: 'Το Πυθαγόρειο ήταν χορτοφάγος',
};


export const streamBlockId = uuidv4();
export const streamBlock = {
  id: streamBlockId,
  type: 'rich_carousel',
  value: [
    streamBlockImage,
    streamBlockTitle,
  ],
};


//
// State
//


export const initialState = {
  [fieldId]: {
    blockDefinitions: blockDefinitions,
  },
};


export const rootBlock1State = {
  parent: null,
  type: 'image',
  value: 1154,
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const rootBlock2State = {
  parent: null,
  type: 'image',
  value: 57,
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const listBlockState = {
  parent: null,
  type: 'carousel',
  value: [listBlockImage1Id, listBlockImage2Id],
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const listBlockImage1State = {
  parent: listBlockId,
  type: 'image',
  value: 1154,
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const listBlockImage2State = {
  parent: listBlockId,
  type: 'image',
  value: 57,
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockState = {
  parent: null,
  type: 'image_row',
  value: [
    structBlockHeightId,
    structBlockImagesId,
    structBlockRelatedPagesId,
  ],
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockHeightState = {
  parent: structBlockId,
  type: 'height',
  value: 'short',
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockImagesState = {
  parent: structBlockId,
  type: 'images',
  value: [structBlockImageCell1Id, structBlockImageCell2Id],
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockImage1State = {
  parent: structBlockImageCell1Id,
  type: 'image',
  value: 257,
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockWidth1State = {
  parent: structBlockImageCell1Id,
  type: 'width',
  value: 'col-md-4',
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockImageCell1State = {
  parent: structBlockImagesId,
  type: 'image_cell',
  value: [structBlockImage1Id, structBlockWidth1Id],
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockImage2State = {
  parent: structBlockImageCell2Id,
  type: 'image',
  value: 319,
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockWidth2State = {
  parent: structBlockImageCell2Id,
  type: 'width',
  value: 'col-md-8',
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockImageCell2State = {
  parent: structBlockImagesId,
  type: 'image_cell',
  value: [structBlockImage2Id, structBlockWidth2Id],
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockRelatedPagesState = {
  parent: structBlockId,
  type: 'related_pages',
  value: [structBlockPageId],
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const structBlockPageState = {
  parent: structBlockRelatedPagesId,
  type: 'page',
  value: 8,
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const streamBlockState = {
  parent: null,
  type: 'rich_carousel',
  value: [streamBlockImageId, streamBlockTitleId],
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const streamBlockImage1State = {
  parent: streamBlockId,
  type: 'image',
  value: 121,
  closed: true,
  hidden: false,
  shouldUpdate: false,
};


export const streamBlockImage2State = {
  parent: streamBlockId,
  type: 'title',
  value: 'Το Πυθαγόρειο ήταν χορτοφάγος',
  closed: true,
  hidden: false,
  shouldUpdate: false,
};
