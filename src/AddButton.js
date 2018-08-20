
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBlock} from './actions';
import {
  getLabel,
  getNestedBlockDefinition,
  getSiblingsIds
} from './processing/utils';


@connect((state, props) => {
  const {fieldId, parentId, blockId} = props;
  let blockDefinitions;
  if (parentId === null) {
    blockDefinitions = state[fieldId].blockDefinitions;
  } else {
    blockDefinitions = getNestedBlockDefinition(state, fieldId,
                                                parentId).children;
  }

  let index = 0;
  if (blockId !== undefined) {
    // Incremented by 1 to add after the current block.
    index = getSiblingsIds(state, fieldId, blockId).indexOf(blockId) + 1;
  }

  return {blockDefinitions, index};
}, (dispatch, props) => {
  const {fieldId, parentId} = props;
  return bindActionCreators({
    addBlock: (index, blockType) => addBlock(fieldId, parentId,
                                             index, blockType),
  }, dispatch);
})
class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: props.open};
  }

  get hasChoice() {
    return this.props.blockDefinitions.length !== 1;
  }

  toggle = event => {
    event.preventDefault();
    event.stopPropagation();
    if (this.hasChoice) {
      this.setState({open: !this.state.open});
    } else {
      this.props.addBlock(this.props.index,
                          this.props.blockDefinitions[0].key);
    }
  };

  addHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.addBlock(this.props.index,
                        event.target.closest('button').value);
    this.toggle(event);
  };

  getIcon(blockDefinition) {
    const {icon} = blockDefinition;
    if ((icon === undefined) || (icon === null)) {
      return null;
    }
    return <span className="icon" dangerouslySetInnerHTML={
      {__html: icon}
    } />;
  }

  render() {
    return (
      this.state.open && this.hasChoice ?
        <React.Fragment>
          <button onClick={this.toggle} className="add close">
            <i>+</i>
          </button>
          <div className="add-panel">
            {this.props.blockDefinitions.map(blockDefinition => (
              <button key={blockDefinition.key} onClick={this.addHandler}
                      value={blockDefinition.key} className="type">
                {this.getIcon(blockDefinition)}
                <span className="label">{getLabel(blockDefinition)}</span>
              </button>
            ))}
          </div>
        </React.Fragment>
        :
        <button onClick={this.toggle} className="add">
          <i>+</i>
        </button>
    );
  }
}


AddButton.propTypes = {
  fieldId: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  blockId: PropTypes.string,
  open: PropTypes.bool,
};


AddButton.defaultProps = {
  open: false,
};


export default AddButton;
