import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getLabel,
  getNestedBlockDefinition,
  getSiblingsIds,
  isStruct, structValueToObject, triggerCustomEvent, triggerKeyboardEvent
} from './processing/utils';
import {duplicateBlock, hideBlock, toggleBlock} from './actions';


@connect((state, props) => {
  const {fieldId, blockId} = props;
  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  const block = blocks[blockId];
  const blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  const siblings = getSiblingsIds(state, fieldId, blockId);
  const value = block.value;
  return {
    blockDefinition,
    siblings,
    index: siblings.indexOf(blockId),
    value: isStruct(blockDefinition) ?
             structValueToObject(state, fieldId, value)
             :
             value,
  };
}, (dispatch, props) => {
  const {fieldId, blockId} = props;
  return bindActionCreators({
    toggleBlock: () => toggleBlock(fieldId, blockId),
    hideBlock: () => hideBlock(fieldId, blockId),
    duplicateBlock: () => duplicateBlock(fieldId, blockId),
  }, dispatch);
})
class BlockHeader extends React.Component {
  constructor(props) {
    super(props);
    this.dragHandleRef = React.createRef();
  }

  get isFirst() {
    return this.props.index === 0;
  }

  get isLast() {
    return this.props.index === (this.props.siblings.length - 1);
  }

  get icon() {
    return <span className="type-icon" dangerouslySetInnerHTML={
      {__html: this.props.blockDefinition.icon}
    } />;
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

  triggerCustomEvent(name, data=null) {
    triggerCustomEvent(ReactDOM.findDOMNode(this), name, data);
  }

  toggle = () => {
    this.props.toggleBlock();
    this.triggerCustomEvent('toggle', {closed: !this.props.closed});
  };

  sendKeyToDragHandle = key => {
    const dragHandle = ReactDOM.findDOMNode(this.dragHandleRef.current);
    triggerKeyboardEvent(dragHandle, 32);  // 32 for spacebar, to drag
    return new Promise(resolve => {
      setTimeout(() => {
        triggerKeyboardEvent(dragHandle, key);
        setTimeout(() => {
          triggerKeyboardEvent(dragHandle, 32);  // Drop at the new position
          resolve();
        }, 100);  // 100 ms is the duration of a move in react-beautiful-dnd
      }, 0);
    });
  };

  moveUpHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    this.sendKeyToDragHandle(38)  // 38 for up arrow
      .then(() => {
        this.triggerCustomEvent('move', {index: this.props.index});
      });
  };

  moveDownHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    this.sendKeyToDragHandle(40)  // 40 for down arrow
      .then(() => {
        this.triggerCustomEvent('move', {index: this.props.index});
      });
  };

  duplicateHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.duplicateBlock();
    this.triggerCustomEvent('duplicate');
  };

  deleteHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.hideBlock();
  };

  render() {
    const {
      blockDefinition, dragHandleProps,
      collapsibleBlock, sortableBlock, canDuplicate,
    } = this.props;
    const icon = this.icon;
    const title = this.title;
    const blockType = (
      <span className="block-type">
        {getLabel(blockDefinition)}
      </span>
    );
    return (
      <header ref={this.dragHandleRef}  onClick={this.toggle}
              {...dragHandleProps}
              className={classNames(collapsibleBlock && 'collapsible',
                                    sortableBlock && 'sortable')}>
        <h3>
          {icon ? <React.Fragment>{icon}&nbsp;</React.Fragment> : null}
          {title === null ? blockType : title}
        </h3>
        {title === null ? null : blockType}
        <aside>
          <div className="actions">
            {sortableBlock ?
              <React.Fragment>
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
              </React.Fragment>
              :
              null}
            <button onClick={this.duplicateHandler}
                    title="Duplicate"
                    className={canDuplicate ? null : 'disabled'}>
              <i className="fas fa-clone" />
            </button>
            <button onClick={this.deleteHandler}
                    title="Delete">
              <i className="fas fa-trash" />
            ️</button>
          </div>
        </aside>
      </header>
    );
  }
}


BlockHeader.propTypes = {
  fieldId: PropTypes.string.isRequired,
  blockId: PropTypes.string.isRequired,
  collapsibleBlock: PropTypes.bool,
  sortableBlock: PropTypes.bool,
  canDuplicate: PropTypes.bool,
  dragHandleProps: PropTypes.object,
};


BlockHeader.defaultProps = {
  collapsibleBlock: true,
  sortableBlock: true,
  canDuplicate: true,
};


export default BlockHeader;
