import axios from "../../util/axios";

export const fetchTransactionAPI = async () => {
  const response = await axios.get("transactions");
  return response.data;
};
export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(`transactions/${id}`);

  return response.data;
};
export const editTransactionAPI = async (data, id) => {
  const response = await axios.put(`transactions/${id}`, data);

  return response.data;
};
export const addTransactionAPI = async (data) => {
  const response = await axios.post(`transactions/`, data);

  return response.data;
};
