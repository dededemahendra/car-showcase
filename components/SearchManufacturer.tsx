'use client';

import { SearchManufacturerProps } from '@/types';
import React from 'react';

import { useState, Fragment } from 'react';

import Image from 'next/image';
import { manufacturers } from '@/constants';

//Headless UI
import { Combobox, Transition } from '@headlessui/react';

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
  const [query, setQuery] = useState('');

  const filteredManufacturers = 
  query === '' 
  ? manufacturers 
  : manufacturers.filter((item) => (
    item.toLowerCase()
    .replace(/\s+/g, '')
    .includes(query.toLocaleLowerCase().replace(/\s+/g, ''))

  ))

  return (
    <div className='search-manufacturer'>
      <Combobox>
        <div className='relative w-full'>
          <Combobox.Button className='absolute top-[14px]'>
            <Image src='/car-logo.svg' alt='Car Logo' width={20} height={20} className='ml-4' />
          </Combobox.Button>
          <Combobox.Input className='search-manufacturer__input' placeholder='Volkswagen' displayValue={(manufacturer: string) => manufacturer} onChange={(e) => setQuery(e.target.value)} />
          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0' afterLeave={() => setQuery('')}>
            <Combobox.Options>
              {filteredManufacturers.length === 0 && query !== "" && (
                <Combobox.Option value={query} className='search-manufacturer__option'>
                  Create "{query}"
                </Combobox.Option>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
