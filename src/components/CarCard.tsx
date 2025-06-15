import Image from 'next/image';
import { Car } from '@/types/cars';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        {car.image ? (
          <Image
            src={car.image}
            alt={`${car.mark_id} ${car.folder_id}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Нет фото</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {car.mark_id} {car.folder_id}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{car.modification_id}</p>
        <p className="text-sm text-gray-600">{car.complectation_name}</p>
        <p className="mt-2 text-xl font-bold text-blue-600">
          {formatPrice(car.price)}
        </p>
      </div>
    </div>
  );
} 