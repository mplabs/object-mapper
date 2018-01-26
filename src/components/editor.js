import { createElement, Component } from 'react'

export class Editor extends Component {
  render() {
    const { tagName, html, ...props } = this.props

    return createElement(
      tagName || 'div',
      {
        ...props,
        ref: (e) => this.htmlEl = e,
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        onKeydown: this.down,
        contentEditable: !this.props.disabled
      },
      this.props.children
    )
  }

  shouldComponentUpdate(nextProps) {
    const { props, htmlEl } = this

    // Component is not therem yet...
    if (!htmlEl) {
      return true
    }

    /// HTML has changed programatically, not by user edit
    if (nextProps.html !== htmlEl.innerHTML && nextProps.html !== props.html) {
      return true;
    }

    // Handle additional properties
    return ['style', 'className', 'disabled', 'tagName'].some(key => props[key] !== nextProps[key]);
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      // Update the DOM manually
      this.htmlEl.innerHTML = this.props.html
    }
  }

  down = (evt) => {
    // Do not move out of the editor on 'Tab'
    // rather do it on 'SHIFT + Tab' only...
    if (evt.key === "Tab" && !evt.altKey) {
      const { htmlEl } = this;
      const doc = htmlEl.ownerDocument.defaultView;
      const selection = doc.getSelection();
      const range = selection.getRangeAt(0);
      const tabNode = document.createTextNode("  ");
      
      evt.preventDefault();
      range.insertNode(tabNode);

      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  emitChange = (evt) => {
    if (!this.htmlEl) {
      return
    }

    const html = this.htmlEl.innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        ...evt,
        target: {
          value: html,
          textContent: this.htmlEl.textContent
        }
      })
    }
    this.lastHtml = html
  }
}
