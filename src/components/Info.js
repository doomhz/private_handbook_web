import React from 'react'
import {browserHistory} from 'react-router'
import {TYPE_TITLES} from '../constants'
import {TextInfo} from './TextInfo'
import {Button, Icon} from '@sketchpixy/rubix'

export default class Info extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: props.params.type,
    }
  }
  render() {
    return (
      <div className='info-cnt'>
        <h1>
          {TYPE_TITLES[this.state.type]} ({this.state.type.toUpperCase()})
          <Button bsStyle="link" onClick={browserHistory.goBack}>
            <Icon glyph='icon-fontello-back'/>
          </Button>
        </h1>
        <TextInfo type={this.state.type} />
      </div>
    )
  }
}
