import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getFieldName,
  getNestedBlockDefinition,
  isField,
  isStruct, replaceWithComponent
} from './processing/utils';
import {changeBlockValue} from './actions';
import Block from './Block';
import BlocksContainer from './BlocksContainer';
import RawHtmlFieldInput from './RawHtmlFieldInput';


@connect((state, props) => {
  const {fieldId, blockId} = props;
  const block = state[fieldId].blocks[blockId];
  return {
    blockDefinition: getNestedBlockDefinition(state, fieldId, blockId),
    html: block.html,
    value: block.value,
  };
}, (dispatch, props) => {
  const {fieldId, blockId} = props;
  return bindActionCreators({
    changeBlockValue: value => changeBlockValue(fieldId, blockId, value),
  }, dispatch);
})
class FieldInput extends React.Component {
  static propTypes = {
    fieldId: PropTypes.string.isRequired,
    blockId: PropTypes.string.isRequired,
  };

  render() {
    const {fieldId, blockDefinition, blockId, value} = this.props;
    if (isStruct(blockDefinition)) {  // Nested StructBlock
      return (
        <Block fieldId={fieldId} id={blockId}
               standalone sortable={false} collapsible={false} />
      );
    }
    let html = this.props.html;
    if (html === undefined) {
      html = blockDefinition.html;
    }
    if (isField(blockDefinition)) {
      if (html === undefined) {
        html = `<input id="${blockId}" name="${getFieldName(blockId)}"
                       type="text" />`;
      }
      return (
        <RawHtmlFieldInput fieldId={fieldId} blockDefinition={blockDefinition}
                           blockId={blockId} html={html} value={value} />
      );
    }
    const blocksContainer = <BlocksContainer fieldId={fieldId} id={blockId} />;
    if (html === undefined) {
      return blocksContainer;
    }
    return replaceWithComponent(html, '<BlocksContainer />', blocksContainer);
  }
}


export default FieldInput;
