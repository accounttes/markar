'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Car, SortOrder } from '@/types/cars';
import { getCars } from '@/lib/api';
import { CarCard } from './CarCard';
import { SortSelect } from './SortSelect';
import { Pagination } from './Pagination';

export function CarsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = Number(searchParams.get('page')) || 1;
  const sort = (searchParams.get('sort') as SortOrder) || null;

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });
      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleSortChange = (newSort: SortOrder) => {
    const queryString = createQueryString({ sort: newSort, page: '1' });
    router.push(`${pathname}?${queryString}`);
  };

  const handlePageChange = (newPage: number) => {
    const queryString = createQueryString({ page: String(newPage) });
    router.push(`${pathname}?${queryString}`);
  };

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getCars(currentPage, sort);
        console.log('Response in component:', response);
        setCars(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
        setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [currentPage, sort]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="w-full max-w-xs">
        <SortSelect value={sort} onChange={handleSortChange} />
      </div>

      {!cars || cars.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          Нет доступных автомобилей
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((car, index) => (
              <CarCard 
                key={`${car.mark_id}-${car.folder_id}-${car.modification_id}-${index}`} 
                car={car} 
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
} 