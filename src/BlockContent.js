import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AnimateHeight from 'react-animate-height';
import {
  getLabel,
  getNestedBlockDefinition, isField,
  isStruct, shouldRunInnerScripts, structValueToObject, isRequired,
} from './processing/utils';
import {changeBlockValue} from './actions';
import BlocksContainer from './BlocksContainer';


const MutationObserver = window.MutationObserver
                      || window.WebKitMutationObserver
                      || window.MozMutationObserver;


@connect((state, props) => {
  const {fieldId, blockId} = props;
  const blocks = state[fieldId].blocks;
  const block = blocks[blockId];
  const value = block.value;
  const blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  const newProps = {
    blockDefinition,
    blockId,
    name: block.name,
    html: block.html,
    closed: block.closed,
  };
  if (isStruct(blockDefinition)) {
    const childIdsByInputName = {};
    const childBlocksByType = {};
    for (let childBlockId of value) {
      const childBlock = blocks[childBlockId];
      let inputName = childBlock.name;
      if (inputName === undefined) {
        inputName = childBlock.type;
      }
      childIdsByInputName[inputName] = childBlockId;
      childBlocksByType[childBlock.type] = childBlock;
    }
    newProps.childIdsByInputName = childIdsByInputName;
    newProps.value = structValueToObject(state, fieldId, value);
    newProps.childBlocksByType = childBlocksByType;
  } else {
    newProps.value = value;
  }
  return newProps;
}, (dispatch, props) => {
  const {fieldId} = props;
  return bindActionCreators({
    changeBlockValue: (blockId, value) => changeBlockValue(fieldId, blockId,
                                                           value),
  }, dispatch);
}, null, {withRef: true})
class BlockContent extends React.Component {
  constructor(props) {
    super(props);
    this.htmlRef = React.createRef();
    this._inputs = null;
    this._streamChildrenContainers = null;
  }

  componentDidMount() {
    this.runInnerScripts();
    this.setInputsValues();
    this.forceUpdate();  // Renders nested BlocksContainer.
  }

  runInnerScripts() {
    if (shouldRunInnerScripts(this.props.blockDefinition)) {
      for (let script of ReactDOM.findDOMNode(this).querySelectorAll('script')) {
        script.parentNode.removeChild(script);
        window.eval(script.innerHTML);
      }
    }
  }

  findInput(inputName) {
    const contentNode = ReactDOM.findDOMNode(this);
    const inputs = [...contentNode.querySelectorAll(`[name="${inputName}"]`)];
    if (inputs.length === 0) {
      throw Error(`Could not find input with name "${inputName}"`);
    }
    this._inputs[inputName] = inputs;
    for (let input of inputs) {
      if (input.type === 'hidden') {
        new MutationObserver(() => {
          input.dispatchEvent(new Event('change'));
        }).observe(input, {attributes: true});
      }
      input.addEventListener('change', this.onChange);
      input.setAttribute('data-name', inputName);
      input.removeAttribute('name');
    }
  }

  get inputName() {
    const {blockDefinition, name} = this.props;
    if (isField(blockDefinition)) {
      if (name === undefined) {
        return blockDefinition.key;
      }
      return name;
    }
  }

  getChildInputName(childBlockDefinition) {
    const {childBlocksByType} = this.props;
    if (isField(childBlockDefinition)) {
      let blockType = childBlockDefinition.key;
      let inputName = childBlocksByType[blockType].name;
      if (inputName === undefined) {
        return childBlockDefinition.key;
      }
      return inputName
    }
  }

  findInputs() {
    this._inputs = {};
    const {blockDefinition} = this.props;
    if (isField(blockDefinition)) {
      this.findInput(this.inputName);
    } else {
      for (let childBlockDefinition of blockDefinition.children) {
        if (isField(childBlockDefinition)) {
          this.findInput(this.getChildInputName(childBlockDefinition));
        }
      }
    }
  }

  setInputValue(name, value) {
    if (value === undefined) {
      value = null;
    }
    const inputs = this._inputs[name];
    for (let input of inputs) {
      if (input.type === 'file') {
        input.files = value;
      } else if ((input.type === 'checkbox') || (input.type === 'radio')) {
        input.checked = value === null ? false : (
          typeof value === 'boolean' ? value : value.includes(input.value));
      } else if (input.type === 'hidden') {
        input.value = value;
        input.dispatchEvent(new Event('change'));
      } else {
        input.value = value;
      }
    }
  }

  setInputsValues() {
    if (this._inputs === null) {
      this.findInputs();
    }
    const {blockDefinition, value} = this.props;
    if (isStruct(blockDefinition)) {
      for (const childBlockDefinition of blockDefinition.children) {
        if (isField(childBlockDefinition)) {
          let blockType = childBlockDefinition.key;
          if (this.getChildHtml(childBlockDefinition) === undefined) {
            this.setInputValue(this.getChildInputName(childBlockDefinition),
                               value[blockType]);
          }
        }
      }
    } else {
      this.setInputValue(this.inputName, value);
    }
  }

  get streamChildrenContainers() {
    if (this.htmlRef.current === null) {
      return [];
    }
    if (this._streamChildrenContainers === null) {
      this._streamChildrenContainers = [
        ...this.htmlRef.current.querySelectorAll('.stream-children')];
    }
    return this._streamChildrenContainers;
  }

  getChildHtml = blockDefinition => {
    const {childBlocksByType} = this.props;
    return childBlocksByType[blockDefinition.key].html;
  };

  getFieldHtml = (blockDefinition, inputName) => {
    const isParentStruct = isStruct(this.props.blockDefinition);
    const {fieldId, value} = this.props;
    const {key} = blockDefinition;
    let html;
    if (isParentStruct) {
      html = this.getChildHtml(blockDefinition);
    }
    if ((html === undefined) && (blockDefinition.html !== undefined)) {
      html = blockDefinition.html;
    }
    const label = getLabel(blockDefinition);
    let input;
    if (html !== undefined) {
      input = (
        <div key={key} className="field"
             dangerouslySetInnerHTML={{__html: html}} />
      );
    } else {
      input = (
        <input name={inputName} type="text"
               defaultValue={isParentStruct ? value[key] : value} />
      );
    }
    return (
      <div className={'field'
                      + (isRequired(blockDefinition) ? ' required' : '')}
           key={key}>
        {isField(blockDefinition) ?
          (
            isParentStruct ?
              <label>
                <div className="label-text">{label}</div>
                {input}
              </label>
            :
              input
          )
          :
          <React.Fragment>
            <label>{label}</label>
            <BlocksContainer fieldId={fieldId} id={value[key]} />
          </React.Fragment>
        }
      </div>
    );
  };

  get html() {
    const {html, blockDefinition} = this.props;
    if (html !== undefined) {
      return (
        <div dangerouslySetInnerHTML={{__html: html}} />
      );
    }
    if (blockDefinition.html !== undefined) {
      return (
        <div dangerouslySetInnerHTML={{__html: blockDefinition.html}} />
      );
    }
    if (isField(blockDefinition)) {
      return this.getFieldHtml(blockDefinition, this.inputName);
    }
    return blockDefinition.children.map(
      childBlockDefinition => this.getFieldHtml(
        childBlockDefinition, this.getChildInputName(childBlockDefinition))
    );
  }

  onChange = event => {
    const input = event.target;
    const inputName = input.getAttribute('data-name');
    let value;
    if (input.type === 'file') {
      value = input.files;
    } else if (input.type === 'checkbox' || input.type === 'radio') {
      const boxes = this._inputs[inputName];
      value = boxes.filter(box => box.checked).map(box => box.value);
    } else if (input.tagName === 'SELECT') {
      value = input.options[input.selectedIndex].value;
    } else {
      value = input.value;
    }
    if (isStruct(this.props.blockDefinition)) {
      this.props.changeBlockValue(this.props.childIdsByInputName[inputName],
                                  value);
    } else {
      this.props.changeBlockValue(this.props.blockId, value);
    }
  };

  get height() {
    return this.props.closed ? 0 : 'auto';
  }

  focusFirstInput = () => {
    const {blockDefinition} = this.props;
    if (isField(blockDefinition)) {
      this._inputs[blockDefinition.key][0].focus();
    }
    if (isStruct(blockDefinition)) {
      if (blockDefinition.children.length > 1) {
        this._inputs[blockDefinition.children[0].key][0].focus();
      }
    }
  };

  render() {
    const {fieldId, blockId, blockDefinition} = this.props;
    return (
      <AnimateHeight height={this.height} easing="ease-in-out"
                     className="content-container"
                     contentClassName={classNames('content',
                                                  blockDefinition.className)}>
        <div ref={this.htmlRef}>
          {this.html}
        </div>
        {this.htmlRef.current === null ?
          null
          :
          // FIXME: Reverse the logic of this to fetch DOM **after** iterating over children block definitions.
          this.streamChildrenContainers.map((streamChildrenNode, index) =>
            ReactDOM.createPortal(
              <BlocksContainer key={index} fieldId={fieldId} id={blockId} />,
              streamChildrenNode
            )
        )}
      </AnimateHeight>
    );
  }
}


BlockContent.propTypes = {
  fieldId: PropTypes.string.isRequired,
  blockId: PropTypes.string.isRequired,
};


export default BlockContent;
