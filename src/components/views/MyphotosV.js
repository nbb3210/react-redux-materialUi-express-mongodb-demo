import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo'

const MyphotosV = (props) => (
  <div>
    {(props.photoList.length == 0)
      ?
      <FlatButton
        label="添加照片"
        labelPosition="before"
        icon={<AddPhotoIcon />}
        onTouchTap={() => props.addImg()}
        />
      :
      <Grid fluid>
        <Row>
          {props.photoList.map((photo) => {
            return (
              <Col style={{ marginBottom: 10 }}
                xs={12} sm={6} md={4} lg={3}
                key={photo._id}>
                <Card>
                  <CardMedia>
                    <img style={{ width: '100%', cursor: 'pointer' }}
                      src={(photo.hasOwnProperty('preview')) ? photo.preview : photo.src}
                      onTouchTap={props.clickImg.bind(this, photo)} />
                  </CardMedia>
                  <CardTitle title={photo.name} showExpandableButton={true} />
                  <CardText expandable={true}>{photo.caption}</CardText>
                  <CardActions expandable={true}>
                    <FlatButton label="获得原图" href={photo.url} target="_blank" />
                    <FlatButton label="删除照片" onTouchTap={props.deletePhoto.bind(this, photo._id)} />
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

export default MyphotosV