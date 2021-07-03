import React, { useEffect, useState } from 'react';
import { fetchCompleteCollection } from '../Helper';
import SponsorCard, { SponsorData } from '../Common/SponsorCard';

const statusRanking = {
  "Sponsoring": 1,
  "In Communication": 2,
  "No Response": 3,
  "Rejected": 4
}

/**
 * ViewSponsors component
 */
export const ViewSponsors: React.FC = () => {
  const [sponsors, setSponsors] = useState([]);

  const sortSponsors = (sponsorsList: Array<SponsorData>) => {
    sponsorsList.sort((a, b) => statusRanking[a.status] - statusRanking[b.status]);
    setSponsors(sponsorsList);
  }

  useEffect(() => {
    fetchCompleteCollection("sponsor", sortSponsors);
  }, [])

  return (
    <div>
      <br />
      <div className="flex-wrap-container" style={{ justifyContent: "space-between", gap: "20px" }}>
        {sponsors.map((s, i) => (
          <SponsorCard key={`sponsor-card-${i}`} edit={true} data={s} />
        ))}
      </div>
    </div>
  );
};

export default ViewSponsors;
