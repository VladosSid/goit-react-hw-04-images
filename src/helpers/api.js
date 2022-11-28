import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '30211191-8b572bab8f9e1a1e26903cf16';

export const fetchImagesWithQuery = async (searchQuery, pageNumber = '1') => {
  try {
    const response = await axios.get(
      `/?q=${searchQuery}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line
export default { fetchImagesWithQuery };
