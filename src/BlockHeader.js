import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getLabel,
  getNestedBlockDefinition, isNA, isSimpleLayout,
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
    isSimpleLayout: isSimpleLayout(blockDefinition, fieldData.isMobile),
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
            if (isNA(childValue)) {
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

  get titleAndType() {
    const title = this.title;
    let icon = this.props.blockDefinition.icon;
    const blockType = (
      <span className="c-sf-block__type">
        {getLabel(this.props.blockDefinition)}
      </span>
    );
    if (isNA(icon)) {
      return blockType;
    }

    icon = <span className="c-sf-block__header__title__icon"
                 dangerouslySetInnerHTML={{__html: icon}} />;

    if (title) {
      return (
        <>
          <h3 className="c-sf-block__header__title">{icon}{title}</h3>
          {blockType}
        </>
      );
    }
    return (
      <span>
        <h3 className="c-sf-block__header__title">{icon}{title}</h3>
        {blockType}
      </span>
    );
  }

  triggerCustomEvent(name, data=null) {
    triggerCustomEvent(ReactDOM.findDOMNode(this), name, data);
  }

  toggle = () => {
    const {isSimpleLayout, toggleBlock, closed} = this.props;
    if (isSimpleLayout) {
      return;
    }
    toggleBlock();
    this.triggerCustomEvent('toggle', {closed: !closed});
  };

  render() {
    const {
      fieldId, blockDefinition, blockId, isSimpleLayout, dragHandleProps,
      icons, collapsibleBlock, sortableBlock, canDuplicate, dragHandleRef,
    } = this.props;
    const icon = blockDefinition.icon;
    let content;
    if (isSimpleLayout) {
      content = (
        <div className={'c-sf-block__header__title'} dangerouslySetInnerHTML={{__html: icon ? icon : icons.grip}} />
      );
    } else {
      content = (
        <>
          {this.titleAndType}
          <BlockActions fieldId={fieldId} blockId={blockId}
                        sortableBlock={sortableBlock}
                        canDuplicate={canDuplicate}
                        dragHandleRef={dragHandleRef} />
        </>
      );
    }
    return (
      <div ref={dragHandleRef}  onClick={this.toggle}
              {...dragHandleProps}
              className={classNames('c-sf-block__header',
                                    collapsibleBlock && 'collapsible',
                                    sortableBlock && 'sortable')}>
        {content}
      </div>
    );
  }
}


export default BlockHeader;
