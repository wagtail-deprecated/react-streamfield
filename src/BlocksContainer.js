import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Droppable} from 'react-beautiful-dnd';
import Block from './Block';
import AddButton from './AddButton';


@connect((state, props) => {
  const {fieldId, id} = props;
  const fieldData = state[fieldId];
  const blocksIds = id === null ?
    fieldData.rootBlocks
    :
    fieldData.blocks[id].value;
  return {
    blocksIds: blocksIds,
  };
})
class BlocksContainer extends React.Component {
  renderBlock(blockId) {
    return (
      <Block key={blockId}
             fieldId={this.props.fieldId}
             id={blockId} />
    );
  }

  static getClassName(snapshot) {
    let className = 'children-container';
    if (snapshot.isDraggingOver) {
      className += ' is-dragging';
    }
    return className;
  }

  render() {
    const {fieldId, id, blocksIds} = this.props;
    const droppableId = `${fieldId}-${id}`;
    return (
      <Droppable droppableId={droppableId} type={droppableId}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef}
               className={BlocksContainer.getClassName(snapshot)}>
            <AddButton fieldId={fieldId} parentId={id}
                       open={blocksIds.length === 0} />
            {blocksIds.map(blockId => this.renderBlock(blockId))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}


BlocksContainer.propTypes = {
  fieldId: PropTypes.string.isRequired,
  id: PropTypes.string,
};


BlocksContainer.defaultProps = {
  id: null,
};


export default BlocksContainer;
