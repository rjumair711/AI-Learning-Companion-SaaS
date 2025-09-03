import CompanionComponent from '@/components/CompanionComponent';
import { getCompanion } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

interface CompanionSessionPageProps {
  params: { id: string }; 
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params; 
  const companion = await getCompanion(id);

  if (!companion) {
    // No record found → redirect
    redirect('/companions');
  }

  const { name, subject, title, topic, duration } = companion;
  const user = await currentUser();

  if (!user) redirect('/sign-in');
  if (!name) redirect('/companions');

  return (
    <main>
      <article className="flex max-md:flex-col rounded-border justify-between p-6">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center max-md:hidden rounded-lg"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              width={35}
              height={35}
              alt={subject}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>
      <CompanionComponent {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession;
