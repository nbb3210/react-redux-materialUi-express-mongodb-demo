import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import Detail from './Detail'
import { ToolbarC, UploadC, MyphotosC, UploadingphotosC, FriendphotosC, MessageC } from '../containers'
import Paper from 'material-ui/Paper'

const styles = {
  root: {
    height: 'calc(100% - 40px)',
    width: 'calc(100% - 40px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20
  },
  main: {
    flexGrow: 1,
    height: '100%'
  },
  photoListContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    overflowY: 'auto',
    overflowX: 'auto',
    height: 'calc(100% - 120px)'
  }
}

class Home extends Component {

  render() {
    return (
      <div style={styles.root}>
        {(this.props.displayPhoto)
          ?
          <Detail />
          :
          <Paper style={styles.main} zDepth={5}>
            <ToolbarC />
            <div style={styles.photoListContainer}>
              {(this.props.photoListType == 1)
                &&
                <FriendphotosC />
              }
              {(this.props.photoListType == 2)
                &&
                <MyphotosC />
              }
              {(this.props.photoListType == 3)
                &&
                <UploadingphotosC />
              }
            </div>
          </Paper>
        }
        <UploadC />
        <MessageC />
      </div>
    )
  }

}

const stateToProps = (state) => {
  return {
    displayPhoto: state.photo.displayPhoto,
    photoListType: state.photo.photoListType
  }
}

const dispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(stateToProps, dispatchToProps)(Home)