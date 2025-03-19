import Cookies from 'js-cookie';
import axios from 'axios';

export const prepareCreateData = (data, time) => {
  const userId = Cookies.get('user_id') || 'system';

  const now = new Date();
  const dateStr = formatDate(now);
  const timeStr = formatTime(now);

  return {
    ...data,
    create_user: userId,
    create_date: dateStr,
    update_user: userId,
    update_date: dateStr,
    ...(time && { create_time: timeStr, update_time: timeStr }) 
  };
};
export const prepareUpdateData = (data, time) => {
  const userId = Cookies.get('user_id') || 'system';
  
  const now = new Date();
  
  return {
    ...data,
    update_user: userId,
    update_date: formatDate(now),
    ...(time && { update_time: formatTime(now) })
  };
};

export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const formatTime = (date) => {
  return date.toTimeString().split(' ')[0];
};

export const createRecord = async (endpoint, data, time) => {
  try {
    const preparedData = prepareCreateData(data, time);
    
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/${endpoint}`, preparedData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}`
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to create record');
    }
    throw error;
  }
};

export const updateRecord = async (endpoint, id, data, time) => {
  try {
    const preparedData = prepareUpdateData(data, time);
    
    const response = await axios({
      method: 'PUT',
      url: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/${endpoint}/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}`
      },
      data: preparedData
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to create record');
    }
    throw error;
  }
};

export const deleteRecord = async (endpoint, id) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/${endpoint}/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}`
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to delete record');
    }
    throw error;
  }
};


export const handleFormSubmit = async (endpoint, id, data, time) => {
  if (id === 'create') {
    return await createRecord(endpoint, data, time);
  } else {
    return await updateRecord(endpoint, id, data, time);
  }
};

export const validateForm = (data, requiredFields = []) => {
    // If requiredFields is empty, validate all keys in data
    const fieldsToCheck = requiredFields.length > 0 ? requiredFields : Object.keys(data);

    // Check if any required field is empty or missing
    const hasMissingField = fieldsToCheck.some(field => !data[field] || data[field].toString().trim() === '');

    return !hasMissingField;
};
export const fetchPartnerCodeOptions = async (company, entity_code) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/customer/customer_code`, { headers: { Authorization: `Bearer ${Cookies.get('jwt')}` } , params: { company: company, entity_code: entity_code }});
        const data = await response.data;
        console.log("customerData", data); 
        return data;
    } catch (error) {
        console.error('Error fetching partner code options:', error);
        return [];
    }
};