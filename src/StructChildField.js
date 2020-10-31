import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {
  getFieldName, getLabel,
  getNestedBlockDefinition,
} from './processing/utils';
import FieldInput from './FieldInput';


@connect((state, props) => {
  const {fieldId, parentBlockId, type} = props;
  const blocks = state[fieldId].blocks;
  const parentBlock = blocks[parentBlockId];
  const blockId = parentBlock.value.find(
    childBlockId => blocks[childBlockId].type === type);
  return {
    blockDefinition: getNestedBlockDefinition(state, fieldId, blockId),
    blockId,
  };
})
class StructChildField extends React.Component {
  static propTypes = {
    fieldId: PropTypes.string.isRequired,
    parentBlockId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const {fieldId, blockId, blockDefinition} = this.props;
    return (
      <div className={classNames('field',
                                 !!blockDefinition.required && 'required', )}>
        <label className={classNames('field__label', blockDefinition.labelClass)} htmlFor={getFieldName(blockId)}>
          {getLabel(blockDefinition)}
        </label>
        <FieldInput fieldId={fieldId} blockId={blockId} />
      </div>
    );
  }
}


export default StructChildField;
