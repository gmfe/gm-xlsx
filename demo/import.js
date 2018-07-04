import React from 'react'
import _ from 'lodash'
import {sheetToJson} from '../src/index'

class Import extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      result: {}
    }

    this.handleFileLoad = ::this.handleFileLoad
  }

  handleFileLoad (e) {
    const files = e.target.files

    if (!files || files.length === 0) {
      return
    }

    const file = files[0]

    sheetToJson(file).then((res) => {
      this.setState({result: res})
    })
  }

  render () {
    return (
      <div style={{padding: '15px'}}>
        <input type='file' onChange={this.handleFileLoad} />
        <div>
                    导入数据:&nbsp;
          <span style={{color: 'blue'}}>
            {_.isEmpty(this.state.result) ? '尚未上传数据' : JSON.stringify(this.state.result)}
          </span>
        </div>
      </div>
    )
  }
}

export default Import
