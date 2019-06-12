import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {
  getFieldName, getLabel,
  getNestedBlockDefinition,
} from './processing/utils';
import NestedBlockHeader from './NestedBlockHeader';
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
    collapsible: PropTypes.bool,
  };

  static defaultProps = {
    collapsible: false,
  };

  render() {
    const {fieldId, blockId, blockDefinition, collapsible} = this.props;

    let header = (<label className='field__label' htmlFor={getFieldName(blockId)}>
                    {getLabel(blockDefinition)}
                  </label>);
    if (collapsible) {
      header = (<NestedBlockHeader fieldId={fieldId} blockId={blockId}
        collapsibleBlock={collapsible} blockDefinition={blockDefinition} />);
    }

    return (
      <div className={classNames('field',
                                 !!blockDefinition.required && 'required')}>
        {header}
        <FieldInput fieldId={fieldId} blockId={blockId} header={header} collapsible={collapsible} />
      </div>
    );
  }
}


export default StructChildField;
