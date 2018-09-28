import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getFieldName,
  getNestedBlockDefinition,
  isField,
  isStruct
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
    if (!isField(blockDefinition)) {
      return (
        <BlocksContainer
          fieldId={fieldId} id={blockId} />
      );
    }
    let html = this.props.html;
    if (html === undefined) {
      if (blockDefinition.html === undefined) {
        html = `<input id="${blockId}" name="${getFieldName(blockId)}"
                       type="text" />`;
      } else {
        html = blockDefinition.html;
      }
    }
    return (
      <RawHtmlFieldInput fieldId={fieldId} blockDefinition={blockDefinition}
                         blockId={blockId} html={html} value={value} />
    );
  }
}


export default FieldInput;
