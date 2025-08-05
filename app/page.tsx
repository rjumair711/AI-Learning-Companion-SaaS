// app/page.tsx
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { recentSessions } from '@/constants';
import React from 'react';

const Page = () => {
  return (
    <main>
      <div>
        <h1>Popular Companions</h1>
        <section className="home-section mb-4">
          <CompanionCard
            id="123"
            name="Neura the Brainy Explorer"
            topic="Neural Network of the Brain"
            subject="science"
            duration={45}
            color="#ffda6e"
          />
          <CompanionCard
            id="456"
            name="Countsy the Number Wizard"
            topic="Derivatives & Integrals"
            subject="Maths"
            duration={30}
            color="#e5d0ff"
          />
          <CompanionCard
            id="789"
            name="Verba the Vocabulary Builder"
            topic="Language"
            subject="English Literature"
            duration={30}
            color="#BDE7FF"
          />
        </section>

        <section className="home-section">
          <CompanionsList
            title="Recently completed sessions"
            companions={recentSessions}
            classNames="w-2/3 max-lg:w-full"
          />
          <CTA />
        </section>
      </div>
    </main>
  );
};

export default Page;
