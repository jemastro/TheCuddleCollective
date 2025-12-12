import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


/* 
  This will make EVERYTHING on the display part of a slider.
  Primary goal is to figure out how to make only PART of the Homepage a slideshow.
  Backup goal:  Make a second view specifically for adopted pets that will slide through the photos.

  If we use a secondary view, set a grid and specifically assign a part of the grid to be like a slideshow.
  Specifically label a CLASS for the slideshow view and use <AdoptedPetCarousel /> to mark it.  
*/


export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

   return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
    </Slider>
  );
}