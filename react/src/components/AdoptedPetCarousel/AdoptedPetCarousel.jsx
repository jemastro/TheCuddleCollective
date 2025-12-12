// import React from "react";
import Slider from "react-slick";
import PetService from "../../services/PetService";

export default function AdoptedPetCarousel({pet, onPetAdd}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function addAdoptedPet(){
    PetService.addNewPet(pet)
    .then((response) => {
      onPetAdd((previous) => [...previous, response.data]);
    })
  }
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