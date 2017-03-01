import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { NavigationC, DisplayimgC, DisplaydetailC, DisplaycommentC } from '../containers'
import Paper from 'material-ui/Paper'

const styles = {
  root: {
    flexGrow: 1,
    height: '100%'
  },
  container: {
    height: 'calc(100% - 56px)',
    width: '100%',
    display: 'flex'
  }
}

class Detail extends Component {

  render() {
    return (
      <Paper style={styles.root} zDepth={5}>
        <NavigationC />
        <div style={styles.container}>
          <DisplayimgC />
          {(this.props.displayDetail)
            ?
            <DisplaydetailC />
            :
            <DisplaycommentC />
          }
        </div>
      </Paper>
    )
  }

}

const stateToProps = (state) => {
  return {
    displayDetail: state.photo.displayDetail
  }
}

const dispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(stateToProps, dispatchToProps)(Detail)