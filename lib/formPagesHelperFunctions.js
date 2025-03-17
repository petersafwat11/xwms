import Cookies from 'js-cookie';
import axios from 'axios';

export const prepareCreateData = (data) => {
  const userId = Cookies.get('user_id') || 'system';
  
  const now = new Date();
  const dateStr = formatDate(now);
  const timeStr = formatTime(now);
  
  return {
    ...data,
    create_user: userId,
    create_date: dateStr,
    create_time: timeStr,
    update_user: userId,
    update_date: dateStr,
    update_time: timeStr
  };
};

export const prepareUpdateData = (data) => {
  const userId = Cookies.get('user_id') || 'system';
  
  const now = new Date();
  
  return {
    ...data,
    update_user: userId,
    update_date: formatDate(now),
    update_time: formatTime(now)
  };
};

export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const formatTime = (date) => {
  return date.toTimeString().split(' ')[0];
};

export const createRecord = async (endpoint, data) => {
  try {
    const preparedData = prepareCreateData(data);
    
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/${endpoint}`, preparedData);
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to create record');
    }
    throw error;
  }
};

export const updateRecord = async (endpoint, id, data) => {
  try {
    const preparedData = prepareUpdateData(data);
    
    const response = await axios({
      method: 'PUT',
      url: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/${endpoint}/${id}`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${Cookies.get('jwt')}`
    //   },
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


export const handleFormSubmit = async (endpoint, id, data) => {
  if (id === 'create') {
    return await createRecord(endpoint, data);
  } else {
    return await updateRecord(endpoint, id, data);
  }
};

export const validateForm = (data, requiredFields = []) => {
    // If requiredFields is empty, validate all keys in data
    const fieldsToCheck = requiredFields.length > 0 ? requiredFields : Object.keys(data);

    // Check if any required field is empty or missing
    const hasMissingField = fieldsToCheck.some(field => !data[field] || data[field].toString().trim() === '');

    return !hasMissingField;
};
