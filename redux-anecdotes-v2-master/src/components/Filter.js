import React from 'react'
import { filterSetting } from '../reducers/anecdoteReducer'
import {connect} from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
        console.log('handle Change')
        //this.props.store.dispatch(filterSetting(event.target.value))
        this.props.filterSetting(event.target.value)
    }
    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
  }
  
  const mapDispatchToProps = {
    filterSetting
  }
  
  const ConnectedFilter = connect(
    null,
    mapDispatchToProps
  )(Filter)

  export default ConnectedFilter