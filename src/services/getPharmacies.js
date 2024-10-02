import api from '../utils/axiosInstance';

const getPharmacies = async() => {

  const response = await api.get('/pharmacies');
  return response.data
};

export default getPharmacies;
