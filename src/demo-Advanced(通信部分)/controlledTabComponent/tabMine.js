import React, { Component } from 'react'

export default class tabMine extends Component {
  render() {
    return (
        <div className={this.props.className}  onClick={(event) => { this.props.callback(event) }} >我的 - 组件</div>
    )
  }
}
