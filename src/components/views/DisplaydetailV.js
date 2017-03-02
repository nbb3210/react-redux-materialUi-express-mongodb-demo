import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const DisplaydetailV = (props) => (
  <div style={{ flexGrow: 1, height: '100%' }}>
    <Card style={{ height: '100%' }}
      containerStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
      <CardHeader
        title={props.photo.profile_name}
        avatar="images/jsa-128.jpg"
        />
      <CardTitle title={props.photo.name} />
      <CardText>{props.photo.caption}</CardText>
      <CardActions style={{ alignSelf: 'flex-end' }}>
        <FlatButton label="查看评论"
          onTouchTap={() => props.clickComments()} />
        <FlatButton label="获得原图" href={props.photo.url} target="_blank" />
      </CardActions>
    </Card>
  </div>
)

export default DisplaydetailV