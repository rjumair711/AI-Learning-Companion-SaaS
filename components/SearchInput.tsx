'use client';

import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('topic') || '';

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'topic',
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === '/companions') {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['topic'],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    // ❗️Cleanup function to prevent memory leaks
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, searchParams, pathname]);

  return (
    <div className='flex gap-2 px-2 py-1 h-fit relative border border-black rounded-lg items-center'>
      <Image src='/icons/search.svg' alt='search' width={15} height={15} />
      <input
        placeholder='Search Companions...'
        className='outline-none'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
