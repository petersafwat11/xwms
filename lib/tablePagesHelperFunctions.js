import Cookies from 'js-cookie';
import axios from 'axios';

export const fetchRecordById = async (endpoint, id) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/${endpoint}/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}`
      }
    });
    console.log('response', response?.data)
    return response?.data?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch record');
    }
    throw error;
  }
};

export const fetchRecords = async (endpoint, params = {}) => {
  try {
    // Construct query string from params
    const queryString = Object.keys(params)
      .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
    console.log('url', url)
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt')}`
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch records');
    }
    throw error;
  }
};

export const determineFormMode = (id) => {
  const isCreateMode = id === 'create';
  const pageTitle = isCreateMode ? 'Create New Record' : 'Edit Record';
  
  return { isCreateMode, pageTitle };
};


export const initializeFormData = async (endpoint, id, defaultValues) => {
  try {
    if (id === 'create') {
      return defaultValues;
    } else {
      const data = await fetchRecordById(endpoint, id);
      return data;
    }
  } catch (error) {
    throw error;
  }
};
