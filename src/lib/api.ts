import axios from 'axios';
import { Car, CarsResponse, SortOrder } from '@/types/cars';

const api = axios.create({
  baseURL: '/api',
});

export const getCars = async (page: number = 1, sort?: SortOrder): Promise<CarsResponse> => {
  try {
    const params = new URLSearchParams({
      _limit: '12',
      _page: page.toString(),
    });

    if (sort) {
      params.append('_sort', 'price');
      params.append('_order', sort);
    }

    const response = await fetch(`https://testing-api.ru-rating.ru/cars?${params}`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const responseData = await response.json();
    
    // Map the API response to match our Car interface
    const cars = responseData.data.map((car: any) => ({
      mark_id: car.mark_id,
      folder_id: car.folder_id,
      modification_id: car.modification_id,
      complectation_name: car.complectation_name,
      body_type: car.body_type,
      price: car.price,
      image: car.images?.image?.[0] || ''
    }));

    return {
      data: cars,
      currentPage: page,
      totalPages: responseData.meta.last_page || 1,
      totalItems: responseData.meta.total || 0
    };
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
}; 