import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo'

export default class MyphotosV extends Component {

  render() {
    return (
      <div>
        {(this.props.photoList.length == 0)
          ?
          <FlatButton
            label="添加皂片"
            labelPosition="before"
            icon={<AddPhotoIcon />}
            />
          :
          <Grid fluid>
            <Row>
              {this.props.photoList.map((photo, i) => {
                return (
                  <Col style={{ marginBottom: 10 }}
                    xs={12} sm={6} md={4} lg={3}
                    key={i}>
                    <Card>
                      <CardMedia>
                        <img style={{ width: '100%' }}
                          src={(photo.hasOwnProperty('preview')) ? photo.preview : photo.src}
                          onTouchTap={this.props.clickImg.bind(this, photo)} />
                      </CardMedia>
                      <CardTitle title={photo.name} showExpandableButton={true} />
                      <CardText expandable={true}>{photo.caption}</CardText>
                      <CardActions expandable={true}>
                        <FlatButton label="Original" href={photo.url} target="_blank" />
                        <FlatButton label="Delete" onTouchTap={this.props.deletePhoto.bind(this, photo._id)} />
                      </CardActions>
                    </Card>
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