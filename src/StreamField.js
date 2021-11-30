import React  from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import {
  moveBlock,
  initializeStreamField,
} from './actions';
import {stateToValue} from './processing/conversions';
import BlocksContainer from './BlocksContainer';


function lazyFunction(f) {
  return function () {
    return f().apply(this, arguments);
  };
}


const BlockDefinitionType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  required: PropTypes.bool,
  default: PropTypes.any,
  icon: PropTypes.string,
  group: PropTypes.string,
  className: PropTypes.string,
  minNum: PropTypes.number,
  maxNum: PropTypes.number,
  closed: PropTypes.bool,
  closedOnAdd: PropTypes.bool,
  titleTemplate: PropTypes.string,
  html: PropTypes.string,
  isStruct: PropTypes.bool,
  isStatic: PropTypes.bool,
  dangerouslyRunInnerScripts: PropTypes.bool,
  children: PropTypes.arrayOf(lazyFunction(() => BlockDefinitionType)),
});


const BlockValueType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  html: PropTypes.string,
  hasError: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(lazyFunction(() => BlockValueType)),
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
});


const StreamFieldDefaultProps = {
  required: false,
  minNum: 0,
  maxNum: Infinity,
  icons: {
    add: '<i aria-hidden="true">+</i>',
    moveUp: '<i class="fas fa-chevron-up" aria-hidden="true" />',
    moveDown: '<i class="fas fa-chevron-down" aria-hidden="true" />',
    duplicate: '<i class="fas fa-clone" aria-hidden="true" />',
    delete: '<i class="fas fa-trash" aria-hidden="true" />',
    grip: '<i class="fas fa-grip-vertical fa-fw" aria-hidden="true" />',
  },
  labels: {
    add: 'Add block',
    moveUp: 'Move up',
    moveDown: 'Move down',
    duplicate: 'Duplicate',
    delete: 'Delete',
  },
};


@connect((state, props) => {
  const {id} = props;
  const fieldData = state[id];
  return {
    generatedValue: fieldData === undefined ? '' : stateToValue(state, id),
  };
}, (dispatch, props) => {
  const {id} = props;
  return bindActionCreators({
    initializeStreamField: data => initializeStreamField(id, data),
    moveBlock: (blockId, newIndex) => moveBlock(id, blockId, newIndex),
  }, dispatch);
})
class StreamField extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    minNum: PropTypes.number,
    maxNum: PropTypes.number,
    icons: PropTypes.shape({
      add: PropTypes.string,
      moveUp: PropTypes.string,
      moveDown: PropTypes.string,
      duplicate: PropTypes.string,
      delete: PropTypes.string,
      grip: PropTypes.string,
    }),
    labels: PropTypes.shape({
      add: PropTypes.string,
      moveUp: PropTypes.string,
      moveDown: PropTypes.string,
      duplicate: PropTypes.string,
      delete: PropTypes.string,
    }),
    gutteredAdd: PropTypes.bool,
    blockDefinitions: PropTypes.arrayOf(BlockDefinitionType).isRequired,
    value: PropTypes.arrayOf(BlockValueType).isRequired,
  };

  static defaultProps = StreamFieldDefaultProps;

  onDragEnd = result => {
    const {draggableId, source, destination} = result;
    if (!destination || (result.reason === 'CANCEL')
        || (destination.droppableId !== source.droppableId)
        || (destination.index === source.index)) {
      return;
    }
    this.props.moveBlock(draggableId, destination.index);
  };

  componentWillMount() {
    // Removes the input with the same name if it exists.
    const input = document.querySelector(`[name="${this.props.id}"]`);
    if (input !== null) {
      input.parentNode.removeChild(input);
    }
  }

  componentDidMount() {
    const {
      initializeStreamField, required, minNum, maxNum, gutteredAdd,
      blockDefinitions, value,
    } = this.props;
    const defaultProps = StreamFieldDefaultProps;
    const icons = {...defaultProps.icons, ...this.props.icons};
    const labels = {...defaultProps.labels, ...this.props.labels};
    initializeStreamField({
      required, minNum, maxNum, icons, labels, gutteredAdd,
      blockDefinitions, value,
    });
  }

  render() {
    const {id, generatedValue} = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
      {generatedValue ? <BlocksContainer fieldId={id} id={null} /> : null}

        <input type="hidden" name={id}
               value={JSON.stringify(generatedValue)} />
      </DragDropContext>
    );
  }
}


export default StreamField;
