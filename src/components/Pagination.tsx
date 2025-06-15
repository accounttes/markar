'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = window.innerWidth < 640 ? 1 : 2; // Reduce visible pages on mobile
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    range.push(totalPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center w-full overflow-x-auto py-2">
      <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer"
        >
          <span className="sr-only">Предыдущая</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {getVisiblePages().map((pageNumber, index) => (
          pageNumber === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="relative inline-flex items-center px-2 sm:px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${pageNumber}`}
              onClick={() => onPageChange(Number(pageNumber))}
              className={clsx(
                'relative inline-flex items-center px-2 sm:px-4 py-2 text-sm font-semibold cursor-pointer min-w-[2.5rem] justify-center',
                pageNumber === currentPage
                  ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
              )}
            >
              {pageNumber}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer"
        >
          <span className="sr-only">Следующая</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}