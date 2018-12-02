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
  required: PropTypes.bool,
  default: PropTypes.any,
  icon: PropTypes.string,
  group: PropTypes.string,
  className: PropTypes.string,
  minNum: PropTypes.number,
  maxNum: PropTypes.number,
  layout: PropTypes.oneOf(['SIMPLE', 'COLLAPSIBLE']),
  closed: PropTypes.bool,
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


@connect((state, props) => {
  const {id} = props;
  return {
    generatedValue: state[id] === undefined ? '' : stateToValue(state, id),
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
      moveUp: PropTypes.string,
      moveDown: PropTypes.string,
      duplicate: PropTypes.string,
      delete: PropTypes.string,
    }),
    blockDefinitions: PropTypes.arrayOf(BlockDefinitionType).isRequired,
    value: PropTypes.arrayOf(BlockValueType).isRequired,
  };

  static defaultProps = {
    required: false,
    minNum: 0,
    maxNum: Infinity,
  };

  constructor(props) {
    super(props);
    const {
      initializeStreamField, required, minNum, maxNum, icons, blockDefinitions,
      value,
    } = this.props;
    initializeStreamField({
      required, minNum, maxNum, icons, blockDefinitions, value,
    });
  }

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

  render() {
    const {id, generatedValue} = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <BlocksContainer fieldId={id} />
        <input type="hidden" name={id}
               value={JSON.stringify(generatedValue)} />
      </DragDropContext>
    );
  }
}


export default StreamField;
