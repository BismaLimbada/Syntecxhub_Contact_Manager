import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/contacts';

const handleError = (err) => {
  const message =
    err.response?.data?.message ||
    err.response?.data?.errors?.map((e) => e.message).join(', ') ||
    'Something went wrong. Please try again.';
  throw new Error(message);
};

export const getContacts = async (search = '') => {
  try {
    const res = await axios.get(API_BASE_URL, { params: search ? { search } : {} });
    return res.data.data;
  } catch (err) {
    handleError(err);
  }
};

export const createContact = async (contact) => {
  try {
    const res = await axios.post(API_BASE_URL, contact);
    return res.data.data;
  } catch (err) {
    handleError(err);
  }
};

export const updateContact = async (id, contact) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/${id}`, contact);
    return res.data.data;
  } catch (err) {
    handleError(err);
  }
};

export const deleteContact = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/${id}`);
    return res.data.data;
  } catch (err) {
    handleError(err);
  }
};
