import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import ImageIcon from 'material-ui/svg-icons/image/image'

const FriendphotosV = (props) => (
  <div>
    {(props.photoList.length == 0)
      ?
      <FlatButton
        label="木有"
        labelPosition="before"
        disabled={true}
        icon={<ImageIcon />}
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
                    <img style={{ width: '100%', cursor: 'pointer' }} src={photo.src}
                      onTouchTap={props.clickImg.bind(this, photo)} />
                  </CardMedia>
                  <CardTitle title={photo.name} />
                  <CardText>{photo.caption}</CardText>
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

export default FriendphotosV