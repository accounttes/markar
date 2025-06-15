import { Suspense } from 'react';
import { CarsList } from '@/components/CarsList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог автомобилей</h1>
        <Suspense fallback={<div>Загрузка...</div>}>
          <CarsList />
        </Suspense>
      </div>
    </main>
  );
}
