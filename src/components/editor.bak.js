import React, { Component } from 'react'
import { capitalize } from 'lodash'

export class Editor extends Component {

  get className() {
    return `column ${this.props.id || 'editor'}`
  }

  componentDidMount() {
    this.refs.code.textContent = ''
    this.setState({ content: '' })
  }

  componentDidUpdate() {
    const { onInput } = this.props
    const { content } = this.state
    if (onInput && content) {
      onInput({ value: content });
    }
  }

  handleKeyup = (evt) => this.setState({ content: this.refs.code.textContent })

  handleKeydown = (evt) => {
    // Do not move out of the editor on 'Tab'
    // rather do it on 'SHIFT + Tab' only...
    if (evt.key === "Tab" && !evt.altKey) {
      const { code } = this.refs;
      const doc = code.ownerDocument.defaultView;
      const selection = doc.getSelection();
      const range = selection.getRangeAt(0);
      const tabNode = document.createTextNode("\t");
      
      evt.preventDefault();
      range.insertNode(tabNode);

      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  render = ({ id, readonly }) => (
    <div className={this.className}>
      <h2>{capitalize(id)}</h2>
      <code onKeyup={this.handleKeyup}
            onKeydown={this.handleKeydown}
            ref={(code) => this.refs.code = code}
            contenteditable={!readonly}></code>
    </div>
  )
}
