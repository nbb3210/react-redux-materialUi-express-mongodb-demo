import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-upload'

export default class UploadingphotosV extends Component {

  render() {
    return (
      <div>
        {(this.props.photoList.length == 0)
          ?
          <FlatButton
            label="木有皂片在"
            labelPosition="before"
            disabled={true}
            icon={<CloudUploadIcon />}
            />
          :
          <Grid fluid>
            <Row>
              {this.props.photoList.map((photo, i) => {
                return (
                  <Col style={{ marginBottom: 10 }}
                    xs={12} sm={6} md={4} lg={3}
                    key={i}>
                    <Paper zDepth={3} >
                      <img style={{ width: '96%', marginTop: '2%', marginLeft: '2%' }} src={photo.preview} />
                    </Paper>
                  </Col>
                )
              })
              }
            </Row>
          </Grid>
        }
      </div>
    )
  }

}