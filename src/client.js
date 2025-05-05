// Include Lightbox
import PhotoSwipeLightbox from 'photoswipe/lightbox'

const lightbox = new PhotoSwipeLightbox({
  gallery: '.main-content',
  children: 'a.imageSwipe',
  pswpModule: () => import('photoswipe')
})
lightbox.init()
