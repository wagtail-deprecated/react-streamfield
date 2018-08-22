import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AnimateHeight from 'react-animate-height';
import {Draggable} from 'react-beautiful-dnd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  blockUpdated,
  deleteBlock,
  showBlock,
} from './actions';
import {
  getDescendantsIds,
  getNestedBlockDefinition,
  getSiblingsIds,
  triggerCustomEvent,
} from './processing/utils';
import AddButton from './AddButton';
import BlockContent from './BlockContent';
import BlockHeader from './BlockHeader';


@connect((state, props) => {
  const {fieldId, id} = props;
  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  const block = blocks[id];
  const siblings = getSiblingsIds(state, fieldId, id);
  const blockDefinition = getNestedBlockDefinition(state, fieldId, id);
  const hasDescendantError = getDescendantsIds(state, fieldId, id, true)
    .some(descendantBlockId => blocks[descendantBlockId].hasError);
  return {
    blockDefinition,
    parentId: block.parent,
    hasError: hasDescendantError,
    closed: block.closed,
    hidden: block.hidden,
    shouldUpdate: block.shouldUpdate,
    index: siblings.indexOf(id),
  };
}, (dispatch, props) => {
  const {fieldId, id} = props;
  return bindActionCreators({
    blockUpdated: () => blockUpdated(fieldId, id),
    showBlock: () => showBlock(fieldId, id),
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

  triggerCustomEvent(name, data=null) {
    triggerCustomEvent(ReactDOM.findDOMNode(this), name, data);
  }

  onDraggableContainerAnimationEnd = () => {
    if (this.props.hidden) {
      this.triggerCustomEvent('delete');
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

  wrapSortable(blockContent) {
    const {
      fieldId, id, parentId, index, hasError,
      standalone, collapsible, sortable, canAdd,
    } = this.props;
    const className = 'block' + (hasError ? ' has-error' : '');
    if (sortable) {
      return (
        <Draggable draggableId={id} index={index}
                   type={`${fieldId}-${parentId}`}>
          {(provided, snapshot) => (
            <article className={className}
                     ref={provided.innerRef}
                     {...provided.draggableProps}>
              <div className="block-container">
                <BlockHeader fieldId={fieldId} blockId={id}
                             standaloneBlock={standalone}
                             collapsibleBlock={collapsible}
                             sortableBlock={sortable}
                             canDuplicate={canAdd}
                             dragHandleProps={provided.dragHandleProps} />
                {blockContent}
              </div>
            </article>
          )}
        </Draggable>
      );
    }
    return (
      <article className={className}>
        <div className="block-container">
          <BlockHeader fieldId={fieldId} blockId={id}
                       standaloneBlock={standalone}
                       collapsibleBlock={collapsible}
                       sortableBlock={sortable}
                       canDuplicate={canAdd} />
          {blockContent}
        </div>
      </article>
    );
  }

  render() {
    const {
      fieldId, id, parentId, standalone, collapsible, canAdd,
    } = this.props;
    const blockContent = (
      <BlockContent ref={this.contentRef} fieldId={fieldId} blockId={id}
                    collapsible={collapsible} />
    );
    const block = (
      <AnimateHeight className="draggable-container"
                   height={this.draggableHeight}
                   onAnimationEnd={this.onDraggableContainerAnimationEnd}>
        {this.wrapSortable(blockContent)}
      </AnimateHeight>
    );
    if (standalone || !canAdd) {
      return block;
    }
    return (
      <React.Fragment>
        {block}
        <AddButton fieldId={fieldId} parentId={parentId} blockId={id}/>
      </React.Fragment>
    );
  }
}


Block.propTypes = {
  fieldId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  standalone: PropTypes.bool,
  collapsible: PropTypes.bool,
  sortable: PropTypes.bool,
  canAdd: PropTypes.bool,
};


Block.defaultProps = {
  standalone: false,
  collapsible: true,
  sortable: true,
  canAdd: true,
};


export default Block;
