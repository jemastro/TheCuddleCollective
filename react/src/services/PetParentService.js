import axios from "axios";

const API_URL = "/petparents";

const getAll = async () => {
     const response = await axios.get(API_URL);
     return response.data;
};

const getById = async (id) => {
     const response = await axios.get(`${API_URL}/${id}`);
     return response.data;
};

const add = async (parent) => {
     const response = await axios.post(`${API_URL}/addPetParent`, parent);
     return response.data;
};

const update = async (id, parent) => {
     const response = await axios.put(`${API_URL}/${id}`, parent);
     return response.data;
};

export default {
     getAll,
     getById,
     add,
     update,
};
