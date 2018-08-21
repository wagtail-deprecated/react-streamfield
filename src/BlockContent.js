import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AnimateHeight from 'react-animate-height';
import {
  getLabel,
  getNestedBlockDefinition,
  isField,
  isStruct,
  shouldRunInnerScripts,
  structValueToObject,
  isRequired,
  getDescendantsIds, getFieldName,
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
  const hasDescendantError = getDescendantsIds(state, fieldId, blockId, true)
    .some(descendantBlockId => blocks[descendantBlockId].hasError);
  const newProps = {
    blockDefinition,
    blockId,
    html: block.html,
    closed: block.closed && !hasDescendantError,
  };
  if (isStruct(blockDefinition)) {
    const childIdsByType = {};
    const childBlocksByType = {};
    for (let childBlockId of value) {
      const childBlock = blocks[childBlockId];
      childIdsByType[childBlock.type] = childBlockId;
      childBlocksByType[childBlock.type] = childBlock;
    }
    newProps.childIdsByType = childIdsByType;
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
    this.bindInputEvents();
  }

  runInnerScripts() {
    if (shouldRunInnerScripts(this.props.blockDefinition)) {
      for (let script of ReactDOM.findDOMNode(this).querySelectorAll('script')) {
        script.parentNode.removeChild(script);
        window.eval(script.innerHTML);
      }
    }
  }

  bindInputEvents() {
    for (let inputs of Object.values(this._inputs)) {
      for (let input of inputs) {
        input.addEventListener('change', this.onChange);
      }
    }
  }

  findInput(blockId) {
    const name = getFieldName(blockId);
    const contentNode = ReactDOM.findDOMNode(this);
    const inputs = [...contentNode.querySelectorAll(`[name="${name}"]`)];
    if (inputs.length === 0) {
      throw Error(`Could not find input with name "${name}"`);
    }
    this._inputs[blockId] = inputs;
    for (let input of inputs) {
      if (input.type === 'hidden') {
        new MutationObserver(() => {
          input.dispatchEvent(new Event('change'));
        }).observe(input, {attributes: true, attributeFilter: ['value']});
      }
      input.id = blockId;
      // We remove the name attribute to remove inputs from the submitted form.
      input.removeAttribute('name');
    }
  }

  getChildId(childBlockDefinition) {
    if (isField(childBlockDefinition)) {
      const {childIdsByType} = this.props;
      return childIdsByType[childBlockDefinition.key];
    }
  }

  findInputs() {
    this._inputs = {};
    const {blockDefinition, blockId} = this.props;
    if (isField(blockDefinition)) {
      this.findInput(blockId);
    } else if (isStruct(blockDefinition)) {
      for (let childBlockDefinition of blockDefinition.children) {
        if (isField(childBlockDefinition)) {
          this.findInput(this.getChildId(childBlockDefinition));
        }
      }
    }
  }

  setInputValue(blockId, value) {
    if (value === undefined) {
      value = null;
    }
    const inputs = this._inputs[blockId];
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
    const {blockDefinition, blockId, value} = this.props;
    if (isStruct(blockDefinition)) {
      for (const childBlockDefinition of blockDefinition.children) {
        if (isField(childBlockDefinition)) {
          let blockType = childBlockDefinition.key;
          if (this.getChildHtml(childBlockDefinition) === undefined) {
            this.setInputValue(this.getChildId(childBlockDefinition),
                               value[blockType]);
          }
        }
      }
    } else if (isField(blockDefinition)) {
      this.setInputValue(blockId, value);
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

  formatHtml(html, id) {
    return html.replace(/__ID__/g, id);
  }

  getFieldInput = (blockDefinition, blockId=null) => {
    let {fieldId, value} = this.props;
    const {key} = blockDefinition;
    const label = getLabel(blockDefinition);
    const isParentStruct = isStruct(this.props.blockDefinition);
    if (isParentStruct) {
      value = value[key];
    }
    if (!isField(blockDefinition)) {
      return (
        <React.Fragment>
          <label>{label}</label>
          <BlocksContainer fieldId={fieldId} id={value} />
        </React.Fragment>
      );
    }
    let html;
    if (isParentStruct) {
      html = this.getChildHtml(blockDefinition);
    }
    if ((html === undefined) && (blockDefinition.html !== undefined)) {
      html = blockDefinition.html;
    }
    if (blockId === null) {
      blockId = this.getChildId(blockDefinition);
    }
    let input = html === undefined ?
      <input id={blockId} name={getFieldName(blockId)} type="text"
             defaultValue={value}/>
      :
      <div key={key} className="field"
           dangerouslySetInnerHTML={{__html: this.formatHtml(html, blockId)}}/>;
    if (isParentStruct) {
      return (
        <React.Fragment>
          <label htmlFor={blockId}>{label}</label>
          {input}
        </React.Fragment>
      );
    }
    return input;
  };

  getField = (blockDefinition, blockId=null) => {
    const {key} = blockDefinition;
    return (
      <div className={'field'
                      + (isRequired(blockDefinition) ? ' required' : '')}
           key={key}>
        {this.getFieldInput(blockDefinition, blockId)}
      </div>
    );
  };

  get html() {
    const {html, blockDefinition, fieldId, blockId} = this.props;
    if (html !== undefined) {
      return (
        <div dangerouslySetInnerHTML={
          {__html: this.formatHtml(html, blockId)}
        } />
      );
    }
    if (blockDefinition.html !== undefined) {
      return (
        <div dangerouslySetInnerHTML={
          {__html: this.formatHtml(blockDefinition.html, blockId)}
        } />
      );
    }
    if (isStruct(blockDefinition)) {
      return blockDefinition.children.map(
        childBlockDefinition => this.getField(childBlockDefinition)
      );
    }
    if (isField(blockDefinition)) {
      return this.getField(blockDefinition, blockId);
    }
    return <BlocksContainer fieldId={fieldId} id={blockId} />;
  }

  onChange = event => {
    const input = event.target;
    const blockId = input.id;
    let value;
    if (input.type === 'file') {
      value = input.files;
    } else if (input.type === 'checkbox' || input.type === 'radio') {
      const boxes = this._inputs[blockId];
      value = boxes.filter(box => box.checked).map(box => box.value);
    } else if (input.tagName === 'SELECT') {
      value = input.options[input.selectedIndex].value;
    } else {
      value = input.value;
    }
    this.props.changeBlockValue(blockId, value);
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
