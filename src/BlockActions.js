import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getLabel,
  getNestedBlockDefinition,
  getSiblingsIds, isSimpleLayout,
  triggerCustomEvent, triggerKeyboardEvent
} from './processing/utils';
import {duplicateBlock, hideBlock} from './actions';
import {refType} from './types';


@connect((state, props) => {
  const {fieldId, blockId} = props;
  const blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  const siblings = getSiblingsIds(state, fieldId, blockId);
  return {
    blockDefinition,
    siblings,
    index: siblings.indexOf(blockId),
  };
}, (dispatch, props) => {
  const {fieldId, blockId} = props;
  return bindActionCreators({
    hideBlock: () => hideBlock(fieldId, blockId),
    duplicateBlock: () => duplicateBlock(fieldId, blockId),
  }, dispatch);
})
class BlockActions extends (React.Component) {
  static propTypes = {
    fieldId: PropTypes.string.isRequired,
    blockId: PropTypes.string.isRequired,
    sortableBlock: PropTypes.bool,
    canDuplicate: PropTypes.bool,
    dragHandleRef: refType,
  };

  static defaultProps = {
    sortableBlock: true,
    canDuplicate: true,
  };

  get isFirst() {
    return this.props.index === 0;
  }

  get isLast() {
    return this.props.index === (this.props.siblings.length - 1);
  }

  triggerCustomEvent(name, data=null) {
    triggerCustomEvent(ReactDOM.findDOMNode(this), name, data);
  }

  sendKeyToDragHandle = key => {
    const dragHandle = ReactDOM.findDOMNode(this.props.dragHandleRef.current);
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
    const {blockDefinition, sortableBlock, canDuplicate} = this.props;
    return (
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
        {isSimpleLayout(blockDefinition) ?
          <span className="block-type">
            {getLabel(blockDefinition)}
          </span>
          :
          null
        }
      </aside>
    );
  }
}


export default BlockActions;
