import axios from "axios";

export default {

    getAllAvailablePets() {
        return axios.get("http://localhost:9000/availablePets");
    },
    
    addNewPet(pet) {
        return axios.post("http://localhost:9000/availablePets", pet);
    },

    deleteFromPets(id) {
        return axios.delete(`http://localhost:9000/availablePets/${id}`);
    }
}
