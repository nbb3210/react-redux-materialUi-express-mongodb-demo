import React from 'react'
import Lightbox from 'react-image-lightbox'

const DisplayimgV = (props) => (
  <div style={{ height: '100%' }}>
    <img style={{ height: '100%', cursor: 'pointer' }} src={props.photo.src} onTouchTap={() => props.openLightbox()} />
    {props.lightboxOpen &&
      <Lightbox
        mainSrc={props.photo.url}
        mainSrcThumbnail={props.photo.src}
        onCloseRequest={() => props.closeLightbox()}
        />
    }
  </div>
)

export default DisplayimgV