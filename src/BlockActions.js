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
  const field = state[fieldId];
  return {
    isSimpleLayout: isSimpleLayout(blockDefinition, field.isMobile),
    blockDefinition,
    siblings,
    icons: field.icons,
    labels: field.labels,
    index: siblings.indexOf(blockId),
  };
}, (dispatch, props) => {
  const {fieldId, blockId} = props;
  return bindActionCreators({
    hideBlock: () => hideBlock(fieldId, blockId),
    duplicateBlock: () => duplicateBlock(fieldId, blockId),
  }, dispatch);
})
class BlockActions extends React.Component {
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
    const {
      blockDefinition, sortableBlock, canDuplicate,
      icons, labels,
    } = this.props;
    return (
      <div className="c-sf-block__aside">
        <div className="c-sf-block__actions">
          <span className="c-sf-block__type">
            {getLabel(blockDefinition)}
          </span>

          {sortableBlock ?
            <>
              <button className="c-sf-block__actions__single"
                      onClick={this.moveUpHandler}
                      title={labels.moveUp} disabled={this.isFirst}
                      dangerouslySetInnerHTML={{__html: icons.moveUp}} />
              <button className="c-sf-block__actions__single"
                      onClick={this.moveDownHandler}
                      title={labels.moveDown} disabled={this.isLast}
                      dangerouslySetInnerHTML={{__html: icons.moveDown}} />
            </>
            :
            null}
          <button className="c-sf-block__actions__single"
                  onClick={this.duplicateHandler}
                  title={labels.duplicate} disabled={!canDuplicate}
                  dangerouslySetInnerHTML={{__html: icons.duplicate}} />
          <button className="c-sf-block__actions__single"
                  onClick={this.deleteHandler} title={labels.delete}
                  dangerouslySetInnerHTML={{__html: icons.delete}} />
        </div>
      </div>
    );
  }
}


export default BlockActions;
