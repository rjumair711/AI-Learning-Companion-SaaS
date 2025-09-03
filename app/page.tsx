// app/page.tsx
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import React from 'react';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);
  
  
  return (
    <main>
      <div>
        <h1>Popular Companions</h1>
        <section className="home-section mb-2">
          {companions.map((companion) => (
            <CompanionCard 
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
            />
          ))}
          
        </section>

        <section className="home-section">
          <CompanionsList
            title="Recently completed sessions"
            companions={recentSessionsCompanions}
            classNames="w-2/3 max-lg:w-full"
          />
          <CTA />
        </section>
      </div>
    </main>
  );
};

export default Page;
