import objectMapper from 'object-mapper'
import React, { Component } from 'react'

import { Editor } from '../components'

export class App extends Component {
  get id() {
    return `app-${Math.random()
      .toString(16)
      .substring(2)}`
  }

  get output() {
    const { input, map } = this.state
    const output = objectMapper(input, map)
    return JSON.stringify(output, null, '  ')
  }

  constructor(props) {
    super(props)
    this.state = { input: {}, map: {}, errors: { input: '', map: '' } }
  }

  evaluate(input, cb, error) {
    try {
      eval(`input=${input}`)
      cb(input)
    } catch (e) {
      error(e.message)
    }
  }

  onChange = path => evt =>
    this.evaluate(
      evt.target.textContent,
      output =>
        this.setState({
          [path]: output,
          errors: { ...this.state.errors, [path]: '' }
        }),
      error =>
        this.setState({ errors: { ...this.state.errors, [path]: error } })
    )

  render() {
    const { errors } = this.state
    
    return (
      <div id={this.id} className="grid thirds">
        <div className="col">
          <label htmlFor="input-editor">Input</label>
          <Editor
            id="input-editor"
            tagName="code"
            onChange={this.onChange('input')}
          />
          <div className={'error ' + (errors.input ? 'in' : '')}>
            {errors.input}
          </div>
        </div>
        <div className="col">
          <label htmlFor="map-editor">Map</label>
          <Editor
            id="map-editor"
            tagName="code"
            onChange={this.onChange('map')}
          />
          <div className={'error ' + (errors.map ? 'in' : '')}>
            {errors.map}
          </div>
        </div>
        <div className="col">
          <label htmlFor="output-editor">Output</label>
          <Editor id="output-editor" tagName="code" html={this.output} />
        </div>
      </div>
    )
  }
}
