import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'

export default class DisplayimgV extends Component {

  constructor(){
    super()
    this.state = {
      lightboxOpen: false
    }
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <img style={{height:'100%'}} src={this.props.photo.src} onTouchTap={() => this.setState({ lightboxOpen: true })} />
        {this.state.lightboxOpen &&
          <Lightbox
            mainSrc={this.props.photo.url}
            mainSrcThumbnail={this.props.photo.src}
            onCloseRequest={() => this.setState({ lightboxOpen: false })}
            />
        }
      </div>
    )
  }

}