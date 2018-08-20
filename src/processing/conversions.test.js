import {stateToValue, valueToState} from './conversions';
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


describe('valueToState', () => {
  test('Empty value', () => {
    expect(valueToState(initialState, fieldId, [])).toEqual({
      ...initialState,
      [fieldId]: {
        ...initialState[fieldId],
        rootBlocks: [],
        blocks: {},
      },
    });
  });

  test('Root blocks', () => {
    expect(valueToState(initialState, fieldId, [
      rootBlock1,
      rootBlock2,
    ])).toEqual({
      ...initialState,
      [fieldId]: {
        ...initialState[fieldId],
        rootBlocks: [rootBlock1Id, rootBlock2Id],
        blocks: {
          [rootBlock1Id]: rootBlock1State,
          [rootBlock2Id]: rootBlock2State,
        },
      },
    });
  });

  test('ListBlock', () => {
    const result = valueToState(initialState, fieldId, [listBlock]);
    expect(result).toEqual({
      ...initialState,
      [fieldId]: {
        ...initialState[fieldId],
        rootBlocks: [listBlockId],
        blocks: {
          [listBlockId]: listBlockState,
          [listBlockImage1Id]: listBlockImage1State,
          [listBlockImage2Id]: listBlockImage2State,
        }
      }
    })
  });

  test('StructBlock', () => {
    const result = valueToState(initialState, fieldId, [structBlock]);
    expect(result).toEqual({
      ...initialState,
      [fieldId]: {
        ...initialState[fieldId],
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
  });

  test('StructBlock with missing nested data', () => {
    const result = valueToState(initialState, fieldId, [
      {
        ...structBlock,
        value: [],
      },
    ]);
    const [childHeightId, childImagesId, childRelatedPagesId] =
      result[fieldId].blocks[structBlockId].value;
    expect(result).toEqual({
      ...initialState,
      [fieldId]: {
        ...initialState[fieldId],
        rootBlocks: [structBlockId],
        blocks: {
          [structBlockId]: {
            ...structBlockState,
            value: [childHeightId, childImagesId, childRelatedPagesId],
          },
          [childHeightId]: {
            parent: structBlockId,
            type: 'height',
            value: null,
            closed: true,
            hidden: false,
            shouldUpdate: false
          },
          [childImagesId]: {
            parent: structBlockId,
            type: 'images',
            value: [],
            closed: true,
            hidden: false,
            shouldUpdate: false
          },
          [childRelatedPagesId]: {
            parent: structBlockId,
            type: 'related_pages',
            value: [],
            closed: true,
            hidden: false,
            shouldUpdate: false
          },
        },
      },
    });
  });

  test('StreamBlock', () => {
    const result = valueToState(initialState, fieldId, [streamBlock]);
    expect(result).toEqual({
      ...initialState,
      [fieldId]: {
        ...initialState[fieldId],
        rootBlocks: [streamBlockId],
        blocks: {
          [streamBlockId]: streamBlockState,
          [streamBlockImageId]: streamBlockImage1State,
          [streamBlockTitleId]: streamBlockImage2State,
        },
      },
    });
  });
});


describe('stateToValue', () => {
  test('Empty value', () => {
    const value = [];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId))
      .toEqual(value);
  });

  test('Root blocks', () => {
    const value = [
      rootBlock1,
      rootBlock2,
    ];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId))
      .toEqual(value);
  });

  test('ListBlock', () => {
    const value = [listBlock];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId))
      .toEqual(value);
  });

  test('StructBlock', () => {
    const value = [structBlock];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId))
      .toEqual(value);
  });

  test('StreamBlock', () => {
    const value = [streamBlock];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId))
      .toEqual(value);
  });
});
