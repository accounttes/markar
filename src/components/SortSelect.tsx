'use client';

import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { SortOrder } from '@/types/cars';
import clsx from 'clsx';

const sortOptions = [
  { id: null, name: 'Без сортировки' },
  { id: 'asc', name: 'По возрастанию цены' },
  { id: 'desc', name: 'По убыванию цены' },
] as const;

interface SortSelectProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const selectedOption = sortOptions.find((option) => option.id === value) || sortOptions[0];

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
          <span className="block truncate">{selectedOption.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
          {sortOptions.map((option) => (
            <Listbox.Option
              key={String(option.id)}
              value={option.id}
              className={({ active }) =>
                clsx(
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                  active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                )
              }
            >
              {({ selected }) => (
                <>
                  <span className={clsx('block truncate', selected ? 'font-medium' : 'font-normal')}>
                    {option.name}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
} 