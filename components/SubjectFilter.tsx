'use client';

import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { subjects } from '@/constants';

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('subject') || 'all';

  // ✅ Initialize with value from query string
  const [subject, setSubject] = useState(query);

  useEffect(() => {
    let newUrl = '';

    if (subject === 'all') {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject'],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'subject',
        value: subject,
      });
    }

    router.push(newUrl, { scroll: false });
  }, [subject]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className='input capitalize'>
        <SelectValue placeholder='Subject' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All Subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem
            key={subject}
            value={subject}
            className='capitalize'
          >
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
