import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getLabel,
  getNestedBlockDefinition, isSimpleLayout,
  isStruct, structValueToObject, triggerCustomEvent
} from './processing/utils';
import {toggleBlock} from './actions';
import BlockActions from './BlockActions';
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
class BlockHeader extends React.Component {
  static propTypes = {
    fieldId: PropTypes.string.isRequired,
    blockId: PropTypes.string.isRequired,
    collapsibleBlock: PropTypes.bool,
    sortableBlock: PropTypes.bool,
    canDuplicate: PropTypes.bool,
    dragHandleRef: refType,
    dragHandleProps: PropTypes.object,
  };

  static defaultProps = {
    collapsibleBlock: true,
    sortableBlock: true,
    canDuplicate: true,
  };

  get icon() {
    const {blockDefinition} = this.props;
    if (blockDefinition.icon !== undefined) {
      return <span className="type-icon" dangerouslySetInnerHTML={
        {__html: blockDefinition.icon}
      } />;
    }
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
    if (isSimpleLayout(this.props.blockDefinition)) {
      return;
    }
    this.props.toggleBlock();
    this.triggerCustomEvent('toggle', {closed: !this.props.closed});
  };

  get gripIcon() {
    const {icons} = this.props;
    if ((icons === undefined) || (icons.grip === undefined)) {
      return <i className="fas fa-grip-vertical fa-fw" />;
    }
    return <span dangerouslySetInnerHTML={{__html: icons.grip}} />;
  }

  render() {
    const {
      fieldId, blockId, blockDefinition, dragHandleProps,
      collapsibleBlock, sortableBlock, canDuplicate, dragHandleRef,
    } = this.props;
    const icon = this.icon;
    const title = this.title;
    const blockType = (
      <span className="block-type">
        {getLabel(blockDefinition)}
      </span>
    );
    let content;
    if (isSimpleLayout(blockDefinition)) {
      content = (
        <h3>{icon ? icon : this.gripIcon}</h3>
      );
    } else {
      content = (
        <React.Fragment>
          <h3>
            {icon ? <React.Fragment>{icon}&nbsp;</React.Fragment> : null}
            {title === null ? blockType : title}
          </h3>
          {title === null ? null : blockType}
          <BlockActions fieldId={fieldId} blockId={blockId}
                        sortableBlock={sortableBlock}
                        canDuplicate={canDuplicate}
                        dragHandleRef={dragHandleRef} />
        </React.Fragment>
      );
    }
    return (
      <header ref={dragHandleRef}  onClick={this.toggle}
              {...dragHandleProps}
              className={classNames(collapsibleBlock && 'collapsible',
                                    sortableBlock && 'sortable')}>
        {content}
      </header>
    );
  }
}


export default BlockHeader;
