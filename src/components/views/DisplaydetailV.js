import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export default class DisplaydetailV extends Component {

  render() {
    const photo = this.props.photo
    return (
      <div style={{ flexGrow: 1, height: '100%' }}>
        <Card style={{ height: '100%' }}
          containerStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
          <CardHeader
            title={photo.profile_name}
            avatar="images/jsa-128.jpg"
            />
          <CardTitle title={photo.name} />
          <CardText>{photo.caption}</CardText>
          <CardActions style={{ alignSelf: 'flex-end' }}>
            <FlatButton label="View Comments"
              onTouchTap={() => this.props.clickComments()} />
            <FlatButton label="Get Original" href={photo.url} target="_blank" />
          </CardActions>
        </Card>
      </div>
    )
  }

}