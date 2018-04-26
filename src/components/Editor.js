import { createElement, Component } from 'react'

export class Editor extends Component {
  shouldComponentUpdate(nextProps) {
    const { props, htmlEl } = this
    
    // Component not there yet
    if (!htmlEl) {
      return true
    }

    // HTML has changed programatically, not by user edit
    if (nextProps.html !== htmlEl.innerHTML && nextProps.html !== props.html) {
      return true
    }

    // Handle additional properties
    return ['style', 'className', 'disabled', 'tagName'].some(
      k => props[k] !== nextProps[k]
    )
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      // Update the DOM manually
      this.htmlEl.innerHTML = this.props.html
    }
  }

  down = evt => {
    switch (evt.key) {
      case 'Tab': // Do not move out of the editor on `TAB`, rather do it on `Alt + Tab` only...
        if (!evt.altKey) {
          evt.preventDefault()
          this._insertTab(evt)
        }
        break

      default:
        // Do nothing
        break
    }
  }

  _insertTab() {
    const { htmlEl } = this
    const doc = htmlEl.ownerDocument.defaultView
    const selection = doc.getSelection()
    const range = selection.getRangeAt(0)
    const tabNode = document.createTextNode(`  `)

    range.insertNode(tabNode)
    range.setStartAfter(tabNode)
    range.setEndAfter(tabNode)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  emitChange = evt => {
    if (!this.htmlEl) {
      return
    }

    const html = this.htmlEl.innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        ...evt,
        target: { value: html, textContent: this.htmlEl.textContent }
      })
      this.lastHtml = html
    }
  }

  render() {
    const { tagName, html, ...props } = this.props
    
    return createElement(
      tagName || 'div',
      {
        ...props,
        ref: e => (this.htmlEl = e),
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        onKeyDown: this.down,
        contentEditable: !this.props.disabled
      },
      this.props.children
    )
  }
}
