import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AnimateHeight from 'react-animate-height';
import {addBlock} from './actions';
import {
  getLabel,
  getNestedBlockDefinition,
  getSiblingsIds, isNA
} from './processing/utils';


@connect((state, props) => {
  const {fieldId, parentId, blockId} = props;
  const field = state[fieldId];
  let blockDefinitions;
  if (parentId) {
    blockDefinitions = getNestedBlockDefinition(state, fieldId,
                                                parentId).children;
  } else {
    blockDefinitions = field.blockDefinitions;
  }

  let index = 0;
  if (blockId !== undefined) {
    // Incremented by 1 to add after the current block.
    index = getSiblingsIds(state, fieldId, blockId).indexOf(blockId) + 1;
  }

  return {
    blockDefinitions, index,
    icons: field.icons,
    labels: field.labels,
  };
}, (dispatch, props) => {
  const {fieldId, parentId} = props;
  return bindActionCreators({
    addBlock: (index, blockType) => addBlock(fieldId, parentId,
                                             index, blockType),
  }, dispatch);
})
class AddButton extends React.Component {
  static propTypes = {
    fieldId: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    blockId: PropTypes.string,
    open: PropTypes.bool,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
    visible: true,
  };

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
      this.setState((state, props) => ({open: !state.open}));
    } else {
      this.props.addBlock(this.props.index,
                          this.props.blockDefinitions[0].key);
    }
  };

  addHandler = event => {
    this.props.addBlock(this.props.index,
                        event.target.closest('button').value);
    this.toggle(event);
  };

  getIcon(blockDefinition) {
    const {icon} = blockDefinition;
    if (isNA(icon)) {
      return null;
    }
    return <span className="icon" dangerouslySetInnerHTML={
      {__html: icon}
    } />;
  }

  get panelHeight() {
    return this.state.open && this.props.visible ? 'auto' : 0;
  }

  get groupedBlockDefinitions() {
    const grouped = {};
    for (const blockDefinition of this.props.blockDefinitions) {
      const key = blockDefinition.group || '';
      const others = grouped[key] || [];
      others.push(blockDefinition);
      grouped[key] = others;
    }
    return grouped;
  }

  render() {
    const {visible, icons, labels} = this.props;
    const button = (
      <button onClick={this.toggle} title={labels.add}
              className={classNames(
                'add', visible && 'visible',
                (this.state.open && this.hasChoice) && 'close')}
              dangerouslySetInnerHTML={{__html: icons.add}}>
      </button>
    );
    if (this.hasChoice) {
      return (
        <>
          {button}
          <AnimateHeight height={this.panelHeight} easing="ease-in-out"
                         contentClassName="add-panel">
            {Object.entries(this.groupedBlockDefinitions).map(
              ([group, blockDefinitions]) => (
                <div key={group}>
                  {group ? <h4 className="group-name">{group}</h4> : null}
                  {blockDefinitions.map(blockDefinition =>
                    <button key={blockDefinition.key} onClick={this.addHandler}
                            value={blockDefinition.key} className="type">
                      {this.getIcon(blockDefinition)}
                      <span className="label">{getLabel(blockDefinition)}</span>
                    </button>
                  )}
                </div>
            ))}
          </AnimateHeight>
        </>
      );
    }
    return button;
  }
}


export default AddButton;
