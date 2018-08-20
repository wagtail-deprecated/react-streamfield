import {addBlock, deleteBlock, moveBlock} from './actions';
import {valueToState} from './conversions';
import {
  initialState,
  fieldId,
  rootBlock1,
  rootBlock2,
  listBlock,
  structBlock,
  streamBlock,
  rootBlock1Id,
  rootBlock2Id,
  listBlockId,
  listBlockImage1Id,
  listBlockImage2Id,
  structBlockId,
  structBlockHeightId,
  structBlockImagesId,
  structBlockImageCell1Id,
  structBlockImage1Id,
  structBlockWidth1Id,
  structBlockImageCell2Id,
  structBlockImage2Id,
  structBlockWidth2Id,
  structBlockRelatedPagesId,
  structBlockPageId,
  streamBlockId,
  streamBlockImageId,
  streamBlockTitleId,
  rootBlock1State,
  rootBlock2State,
  listBlockState,
  listBlockImage1State,
  listBlockImage2State,
  structBlockState,
  structBlockHeightState,
  structBlockImagesState,
  structBlockImage1State,
  structBlockWidth1State,
  structBlockImageCell1State,
  structBlockImage2State,
  structBlockWidth2State,
  structBlockImageCell2State,
  structBlockRelatedPagesState,
  structBlockPageState,
  streamBlockState,
  streamBlockImage1State,
  streamBlockImage2State,
} from './samples';


describe('addBlock', () => {
  test('As root', () => {
    let state = valueToState(initialState, fieldId, []);
    state = addBlock(state, fieldId, null, 0, 'image');
    const id1 = state[fieldId].rootBlocks[0];
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [id1],
        blocks: {
          [id1]: {
            parent: null,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
        },
      },
    });
    state = addBlock(state, fieldId, null, 0, 'carousel');
    const id2 = state[fieldId].rootBlocks[0];
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [id2, id1],
        blocks: {
          [id1]: {
            parent: null,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id2]: {
            parent: null,
            type: 'carousel',
            value: [],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
        },
      },
    });
    state = addBlock(state, fieldId, null, 2, 'image_row');
    const id3 = state[fieldId].rootBlocks[2];
    const blocks = state[fieldId].blocks;
    const getId = key => {
      return blocks[id3].value.find(
        childBlockId => blocks[childBlockId].type === key)
    };
    const childHeightId = getId('height');
    const childImagesId = getId('images');
    const childRelatedPagesId = getId('related_pages');
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [id2, id1, id3],
        blocks: {
          [id1]: {
            parent: null,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id2]: {
            parent: null,
            type: 'carousel',
            value: [],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id3]: {
            parent: null,
            type: 'image_row',
            value: [
              childHeightId,
              childImagesId,
              childRelatedPagesId,
            ],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [childHeightId]: {
            parent: id3,
            type: 'height',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: false,
          },
          [childImagesId]: {
            parent: id3,
            type: 'images',
            value: [],
            closed: false,
            hidden: true,
            shouldUpdate: false,
          },
          [childRelatedPagesId]: {
            parent: id3,
            type: 'related_pages',
            value: [],
            closed: false,
            hidden: true,
            shouldUpdate: false,
          },
        },
      },
    });
    state = addBlock(state, fieldId, null, 1, 'rich_carousel');
    const id4 = state[fieldId].rootBlocks[1];
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [id2, id4, id1, id3],
        blocks: {
          [id1]: {
            parent: null,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id2]: {
            parent: null,
            type: 'carousel',
            value: [],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id3]: {
            parent: null,
            type: 'image_row',
            value: [
              childHeightId,
              childImagesId,
              childRelatedPagesId,
            ],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [childHeightId]: {
            parent: id3,
            type: 'height',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: false,
          },
          [childImagesId]: {
            parent: id3,
            type: 'images',
            value: [],
            closed: false,
            hidden: true,
            shouldUpdate: false,
          },
          [childRelatedPagesId]: {
            parent: id3,
            type: 'related_pages',
            value: [],
            closed: false,
            hidden: true,
            shouldUpdate: false,
          },
          [id4]: {
            parent: null,
            type: 'rich_carousel',
            value: [],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
        },
      },
    });
  });

  test('As leaf', () => {
    let state = valueToState(initialState, fieldId, []);
    state = addBlock(state, fieldId, null, 0, 'carousel');
    const id1 = state[fieldId].rootBlocks[0];
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [id1],
        blocks: {
          [id1]: {
            parent: null,
            type: 'carousel',
            value: [],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
        },
      },
    });
    state = addBlock(state, fieldId, id1, 0, 'image');
    const id2 = state[fieldId].blocks[id1].value[0];
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [id1],
        blocks: {
          [id1]: {
            parent: null,
            type: 'carousel',
            value: [id2],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id2]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
        },
      },
    });
    state = addBlock(state, fieldId, id1, 0, 'image');
    const id3 = state[fieldId].blocks[id1].value[0];
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [id1],
        blocks: {
          [id1]: {
            parent: null,
            type: 'carousel',
            value: [id3, id2],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id2]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id3]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
        },
      },
    });
    state = addBlock(state, fieldId, id1, 2, 'image');
    const id4 = state[fieldId].blocks[id1].value[2];
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [id1],
        blocks: {
          [id1]: {
            parent: null,
            type: 'carousel',
            value: [id3, id2, id4],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id2]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id3]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id4]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
        },
      },
    });
    state = addBlock(state, fieldId, id1, 1, 'image');
    const id5 = state[fieldId].blocks[id1].value[1];
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [id1],
        blocks: {
          [id1]: {
            parent: null,
            type: 'carousel',
            value: [id3, id5, id2, id4],
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id2]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id3]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id4]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
          [id5]: {
            parent: id1,
            type: 'image',
            value: null,
            closed: false,
            hidden: true,
            shouldUpdate: true,
          },
        },
      },
    });
  });
});


describe('moveBlock', () => {
  test('As root', () => {
    let state = valueToState(initialState, fieldId, [
      rootBlock1, rootBlock2, structBlock,
    ]);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          rootBlock1Id, rootBlock2Id, structBlockId,
        ],
        blocks: {
          [rootBlock1Id]: rootBlock1State,
          [rootBlock2Id]: rootBlock2State,
          [structBlockId]: structBlockState,
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = moveBlock(state, fieldId, rootBlock1Id, 0);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          rootBlock1Id, rootBlock2Id, structBlockId,
        ],
        blocks: {
          [rootBlock1Id]: {
            ...rootBlock1State,
            shouldUpdate: true,
          },
          [rootBlock2Id]: {
            ...rootBlock2State,
            shouldUpdate: true,
          },
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = moveBlock(state, fieldId, rootBlock2Id, 1);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          rootBlock1Id, rootBlock2Id, structBlockId,
        ],
        blocks: {
          [rootBlock1Id]: {
            ...rootBlock1State,
            shouldUpdate: true,
          },
          [rootBlock2Id]: {
            ...rootBlock2State,
            shouldUpdate: true,
          },
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = moveBlock(state, fieldId, structBlockId, 2);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          rootBlock1Id, rootBlock2Id, structBlockId,
        ],
        blocks: {
          [rootBlock1Id]: {
            ...rootBlock1State,
            shouldUpdate: true,
          },
          [rootBlock2Id]: {
            ...rootBlock2State,
            shouldUpdate: true,
          },
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = moveBlock(state, fieldId, rootBlock1Id, 1);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          rootBlock2Id, rootBlock1Id, structBlockId,
        ],
        blocks: {
          [rootBlock1Id]: {
            ...rootBlock1State,
            shouldUpdate: true,
          },
          [rootBlock2Id]: {
            ...rootBlock2State,
            shouldUpdate: true,
          },
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = moveBlock(state, fieldId, rootBlock1Id, 0);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          rootBlock1Id, rootBlock2Id, structBlockId,
        ],
        blocks: {
          [rootBlock1Id]: {
            ...rootBlock1State,
            shouldUpdate: true,
          },
          [rootBlock2Id]: {
            ...rootBlock2State,
            shouldUpdate: true,
          },
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = moveBlock(state, fieldId, structBlockId, 0);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          structBlockId, rootBlock1Id, rootBlock2Id,
        ],
        blocks: {
          [rootBlock1Id]: {
            ...rootBlock1State,
            shouldUpdate: true,
          },
          [rootBlock2Id]: {
            ...rootBlock2State,
            shouldUpdate: true,
          },
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = moveBlock(state, fieldId, rootBlock1Id, 2);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          structBlockId, rootBlock2Id, rootBlock1Id,
        ],
        blocks: {
          [rootBlock1Id]: {
            ...rootBlock1State,
            shouldUpdate: true,
          },
          [rootBlock2Id]: {
            ...rootBlock2State,
            shouldUpdate: true,
          },
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
  });

  test('As leaf', () => {
    let state = valueToState(initialState, fieldId, [
      listBlock,
    ]);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          listBlockId,
        ],
        blocks: {
          [listBlockId]: listBlockState,
          [listBlockImage1Id]: listBlockImage1State,
          [listBlockImage2Id]: listBlockImage2State,
        },
      },
    });
    state = moveBlock(state, fieldId, listBlockImage1Id, 0);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          listBlockId,
        ],
        blocks: {
          [listBlockId]: listBlockState,
          [listBlockImage1Id]: {
            ...listBlockImage1State,
            shouldUpdate: true,
          },
          [listBlockImage2Id]: {
            ...listBlockImage2State,
            shouldUpdate: true,
          },
        },
      },
    });
    state = moveBlock(state, fieldId, listBlockImage1Id, 1);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          listBlockId,
        ],
        blocks: {
          [listBlockId]: {
            ...listBlockState,
            value: [listBlockImage2Id, listBlockImage1Id],
          },
          [listBlockImage1Id]: {
            ...listBlockImage1State,
            shouldUpdate: true,
          },
          [listBlockImage2Id]: {
            ...listBlockImage2State,
            shouldUpdate: true,
          },
        },
      },
    });
    state = moveBlock(state, fieldId, listBlockImage2Id, 1);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          listBlockId,
        ],
        blocks: {
          [listBlockId]: listBlockState,
          [listBlockImage1Id]: {
            ...listBlockImage1State,
            shouldUpdate: true,
          },
          [listBlockImage2Id]: {
            ...listBlockImage2State,
            shouldUpdate: true,
          },
        },
      },
    });
  });
});


describe('deleteBlock', () => {
  test('As root', () => {
    let state = valueToState(initialState, fieldId, [
      rootBlock1, rootBlock2,
      listBlock, structBlock, streamBlock,
    ]);

    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          rootBlock1Id, rootBlock2Id, listBlockId,
          structBlockId, streamBlockId,
        ],
        blocks: {
          [rootBlock1Id]: rootBlock1State,
          [rootBlock2Id]: rootBlock2State,
          [listBlockId]: listBlockState,
          [listBlockImage1Id]: listBlockImage1State,
          [listBlockImage2Id]: listBlockImage2State,
          [structBlockId]: structBlockState,
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
          [streamBlockId]: streamBlockState,
          [streamBlockImageId]: streamBlockImage1State,
          [streamBlockTitleId]: streamBlockImage2State,
        },
      },
    });
    state = deleteBlock(state, fieldId, rootBlock1Id);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          rootBlock2Id, listBlockId,
          structBlockId, streamBlockId,
        ],
        blocks: {
          [rootBlock2Id]: {
            ...rootBlock2State,
            shouldUpdate: true,
          },
          [listBlockId]: {
            ...listBlockState,
            shouldUpdate: true,
          },
          [listBlockImage1Id]: listBlockImage1State,
          [listBlockImage2Id]: listBlockImage2State,
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
          [streamBlockId]: {
            ...streamBlockState,
            shouldUpdate: true,
          },
          [streamBlockImageId]: streamBlockImage1State,
          [streamBlockTitleId]: streamBlockImage2State,
        },
      },
    });
    state = deleteBlock(state, fieldId, rootBlock2Id);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          listBlockId, structBlockId, streamBlockId,
        ],
        blocks: {
          [listBlockId]: {
            ...listBlockState,
            shouldUpdate: true,
          },
          [listBlockImage1Id]: listBlockImage1State,
          [listBlockImage2Id]: listBlockImage2State,
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
          [streamBlockId]: {
            ...streamBlockState,
            shouldUpdate: true,
          },
          [streamBlockImageId]: streamBlockImage1State,
          [streamBlockTitleId]: streamBlockImage2State,
        },
      },
    });
    state = deleteBlock(state, fieldId, listBlockId);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          structBlockId, streamBlockId,
        ],
        blocks: {
          [structBlockId]: {
            ...structBlockState,
            shouldUpdate: true,
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
          [streamBlockId]: {
            ...streamBlockState,
            shouldUpdate: true,
          },
          [streamBlockImageId]: streamBlockImage1State,
          [streamBlockTitleId]: streamBlockImage2State,
        },
      },
    });
    state = deleteBlock(state, fieldId, structBlockId);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [
          streamBlockId,
        ],
        blocks: {
          [streamBlockId]: {
            ...streamBlockState,
            shouldUpdate: true,
          },
          [streamBlockImageId]: streamBlockImage1State,
          [streamBlockTitleId]: streamBlockImage2State,
        },
      },
    });
    state = deleteBlock(state, fieldId, streamBlockId);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [],
        blocks: {},
      },
    });
  });

  test('As branch', () => {
    let state = valueToState(initialState, fieldId, [
      structBlock,
    ]);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [structBlockId],
        blocks: {
          [structBlockId]: structBlockState,
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = deleteBlock(state, fieldId, structBlockImagesId);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [structBlockId],
        blocks: {
          [structBlockId]: {
            ...structBlockState,
            value: [
              structBlockHeightId,
              structBlockRelatedPagesId,
            ],
          },
          [structBlockHeightId]: structBlockHeightState,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = deleteBlock(state, fieldId, structBlockRelatedPagesId);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [structBlockId],
        blocks: {
          [structBlockId]: {
            ...structBlockState,
            value: [
              structBlockHeightId,
            ],
          },
          [structBlockHeightId]: structBlockHeightState,
        },
      },
    });
  });

  test('As leaf', () => {
    let state = valueToState(initialState, fieldId, [
      structBlock,
    ]);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [structBlockId],
        blocks: {
          [structBlockId]: structBlockState,
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: structBlockImagesState,
          [structBlockImageCell1Id]: structBlockImageCell1State,
          [structBlockImage1Id]: structBlockImage1State,
          [structBlockWidth1Id]: structBlockWidth1State,
          [structBlockImageCell2Id]: structBlockImageCell2State,
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = deleteBlock(state, fieldId, structBlockImageCell1Id);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [structBlockId],
        blocks: {
          [structBlockId]: structBlockState,
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: {
            ...structBlockImagesState,
            value: [structBlockImageCell2Id],
          },
          [structBlockImageCell2Id]: {
            ...structBlockImageCell2State,
            shouldUpdate: true,
          },
          [structBlockImage2Id]: structBlockImage2State,
          [structBlockWidth2Id]: structBlockWidth2State,
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = deleteBlock(state, fieldId, structBlockImageCell2Id);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [structBlockId],
        blocks: {
          [structBlockId]: structBlockState,
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: {
            ...structBlockImagesState,
            value: [],
          },
          [structBlockRelatedPagesId]: structBlockRelatedPagesState,
          [structBlockPageId]: structBlockPageState,
        },
      },
    });
    state = deleteBlock(state, fieldId, structBlockPageId);
    expect(state).toEqual({
      ...state,
      [fieldId]: {
        ...state[fieldId],
        rootBlocks: [structBlockId],
        blocks: {
          [structBlockId]: structBlockState,
          [structBlockHeightId]: structBlockHeightState,
          [structBlockImagesId]: {
            ...structBlockImagesState,
            value: [],
          },
          [structBlockRelatedPagesId]: {
            ...structBlockRelatedPagesState,
            value: [],
          },
        },
      },
    });
  });
});
