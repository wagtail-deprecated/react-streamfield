import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getNestedBlockDefinition, isNA,
  isStruct, structValueToObject, triggerCustomEvent
} from './processing/utils';
import {toggleBlock} from './actions';
import {refType} from './types';


@connect((state, props) => {
  const {fieldId, blockId} = props;
  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  const block = blocks[blockId];
  const blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  const value = block.value;
  return {
    blockDefinition,
    icons: fieldData.icons,
    value: isStruct(blockDefinition) ?
             structValueToObject(state, fieldId, value)
             :
             value,
  };
}, (dispatch, props) => {
  const {fieldId, blockId} = props;
  return bindActionCreators({
    toggleBlock: () => toggleBlock(fieldId, blockId),
  }, dispatch);
})
class NestedBlockHeader extends React.Component {
  static propTypes = {
    fieldId: PropTypes.string.isRequired,
    blockId: PropTypes.string.isRequired,
    collapsibleBlock: PropTypes.bool,
    dragHandleRef: refType,
    dragHandleProps: PropTypes.object,
    closed: PropTypes.bool,
  };

  static defaultProps = {
    collapsibleBlock: false,
    closed: false,
  };

  get title() {
    const {title, blockDefinition, value} = this.props;
    if ((title !== undefined) && (title !== null)) {
      return title;
    }
    if (blockDefinition.titleTemplate !== undefined) {
      let hasVariables = false;
      let isEmpty = true;
      let renderedTitle = blockDefinition.titleTemplate.replace(
        /\${([^}]+)}/g, (match, varName) => {
          if (isStruct(blockDefinition)) {
            let childValue = value[varName];
            if (isNA(childValue)) {
              childValue = '';
            } else if (childValue !== '') {
              isEmpty = false;
            }
            hasVariables = true;
            return childValue || '';
          } else {
            if (varName === blockDefinition.key) {
              return value || '';
            }
            return '';
          }
        });
      if (!hasVariables || !isEmpty) {
        return renderedTitle;
      }
    }
    return null;
  }

  triggerCustomEvent(name, data=null) {
    triggerCustomEvent(ReactDOM.findDOMNode(this), name, data);
  }

  toggle = () => {
    const {toggleBlock, closed} = this.props;
    toggleBlock();
    this.triggerCustomEvent('toggle', {closed: !closed});
  };

  render() {
    const {
      blockDefinition, fieldId, blockId, dragHandleProps,
      collapsibleBlock, dragHandleRef,
    } = this.props;
    return (
      <div ref={dragHandleRef}  onClick={collapsibleBlock ? this.toggle : null} {...dragHandleProps}
           className={classNames(
             'c-sf-nested-block__header',
             collapsibleBlock && 'c-sf-block__header--collapsible')}>
        <span className="c-sf-block__header__icon"
              dangerouslySetInnerHTML={{__html: blockDefinition.icon}} />
        <h3 className="c-sf-block__header__title">{this.title || ''}</h3>
      </div>
    );
  }
}


export default NestedBlockHeader;
