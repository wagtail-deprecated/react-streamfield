import React from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import {Draggable} from 'react-beautiful-dnd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  blockUpdated,
  deleteBlock, duplicateBlock, hideBlock, moveBlock,
  showBlock,
  toggleBlock
} from './actions';
import {
  extractText, getDescendantsIds,
  getLabel,
  getNestedBlockDefinition,
  getSiblingsIds,
  isStruct, structValueToObject
} from './processing/utils';
import AddButton from './AddButton';
import BlockContent from './BlockContent';


@connect((state, props) => {
  const {fieldId, id} = props;
  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  const block = blocks[id];
  const siblings = getSiblingsIds(state, fieldId, id);
  const value = block.value;
  const blockDefinition = getNestedBlockDefinition(state, fieldId, id);
  const hasDescendantError = getDescendantsIds(state, fieldId, id, true)
    .some(descendantBlockId => blocks[descendantBlockId].hasError);
  return {
    blockDefinition,
    parentId: block.parent,
    hasError: hasDescendantError,
    value: isStruct(blockDefinition) ?
             structValueToObject(state, fieldId, value)
             :
             value,
    hidden: block.hidden,
    shouldUpdate: block.shouldUpdate,
    siblings,
    index: siblings.indexOf(id),
  };
}, (dispatch, props) => {
  const {fieldId, id} = props;
  return bindActionCreators({
    toggleBlock: () => toggleBlock(fieldId, id),
    blockUpdated: () => blockUpdated(fieldId, id),
    showBlock: () => showBlock(fieldId, id),
    hideBlock: () => hideBlock(fieldId, id),
    moveBlock: newIndex => moveBlock(fieldId, id, newIndex),
    duplicateBlock: () => duplicateBlock(fieldId, id),
    deleteBlock: () => deleteBlock(fieldId, id),
  }, dispatch);
})
class Block extends React.Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.shouldUpdate;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.shouldUpdate) {
      this.props.blockUpdated();
    }
  }

  get icon() {
    return <span className="type-icon" dangerouslySetInnerHTML={
      {__html: this.props.blockDefinition.icon}
    } />;
  }

  get isFirst() {
    return this.props.index === 0;
  }

  get isLast() {
    return this.props.index === (this.props.siblings.length - 1);
  }

  get title() {
    const {title, blockDefinition, value} = this.props;
    if (isStruct(blockDefinition)) {
      if ((title !== undefined) && (title !== null)) {
        return title;
      }
      if (blockDefinition.titleTemplate !== undefined) {
        let hasVariables = false;
        let isEmpty = true;
        let renderedTitle = blockDefinition.titleTemplate.replace(
          /\${([^}]+)}/g, (match, varName) => {
            let childValue = value[varName];
            if ((childValue === undefined) || (childValue === null)) {
              childValue = '';
            } else if (childValue !== '') {
              isEmpty = false;
            }
            hasVariables = true;
            return childValue;
          });
        if (!hasVariables || !isEmpty) {
          return renderedTitle;
        }
      }
    }
    return null;
  }

  moveUpHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.moveBlock(this.props.index - 1);
  };

  moveDownHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.moveBlock(this.props.index + 1);
  };

  duplicateHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.duplicateBlock();
  };

  deleteHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.hideBlock();
  };

  onDraggableContainerAnimationEnd = () => {
    if (this.props.hidden) {
      this.props.deleteBlock();
    } else {
      // TODO: Restore when we’re able to enable it on block creation,
      //       not duplication.
      // this.contentRef.current.getWrappedInstance().focusFirstInput();
    }
  };

  get draggableHeight() {
    return this.props.hidden ? 0 : 'auto';
  }

  componentDidMount() {
    if (this.props.hidden) {
      this.props.showBlock();
    }
  }

  render() {
    const {
      fieldId, id, parentId, blockDefinition, index, hasError,
    } = this.props;
    const title = this.title;
    const blockType = (
      <span className="block-type">
        {getLabel(blockDefinition)}
      </span>
    );
    return (
      <React.Fragment>
        <AnimateHeight className="draggable-container"
                       height={this.draggableHeight}
                       onAnimationEnd={this.onDraggableContainerAnimationEnd}>
          <Draggable draggableId={id} index={index}
                     type={`${fieldId}-${parentId}`}>
            {(provided, snapshot) => (
              <article className={'block' + (hasError ? ' has-error' : '')}
                       ref={provided.innerRef}
                       {...provided.draggableProps}>
                <div className="block-container">
                  <header onClick={this.props.toggleBlock}
                          {...provided.dragHandleProps}>
                    <h3>
                      {this.icon}&nbsp;{title === null ? blockType : title}
                    </h3>
                    {title === null ? null : blockType}
                    <aside>
                      <div className="actions">
                        <button onClick={this.moveUpHandler}
                                title="Move up"
                                className={this.isFirst ? 'disabled' : null}>
                          <i className="fas fa-chevron-up" />
                        </button>
                        <button onClick={this.moveDownHandler}
                                title="Move down"
                                className={this.isLast ? 'disabled' : null}>
                          <i className="fas fa-chevron-down" />
                        </button>
                        <button onClick={this.duplicateHandler}
                                title="Duplicate">
                          <i className="fas fa-clone" />
                        </button>
                        <button onClick={this.deleteHandler}
                                title="Delete">
                          <i className="fas fa-trash" />
                        ️</button>
                      </div>
                    </aside>
                  </header>

                  <BlockContent ref={this.contentRef}
                                fieldId={fieldId} blockId={id} />
                </div>
              </article>
            )}
          </Draggable>
        </AnimateHeight>
        <AddButton fieldId={fieldId} parentId={parentId} blockId={id} />
      </React.Fragment>
    );
  }
}


Block.propTypes = {
  fieldId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};


Block.defaultProps = {};


export default Block;
