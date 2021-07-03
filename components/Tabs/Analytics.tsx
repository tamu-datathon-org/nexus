import React, { useEffect, useState } from 'react';
import { SponsorData } from '../Common/SponsorCard';
import { fetchCompleteCollection } from '../Helper';
import { RadialChart } from 'react-vis';

const statusBgColors = { "Sponsoring": "darkgreen", "In Communication": "darkmagenta", "No Response": "#333", "Rejected": "firebrick" };
const industriesBgColors = { "Technology": "#e6194b", "Energy": "#f58231", "Consulting": "#ffe119", "Finance": "#bfef45", "Transportation": "#3cb44b", "Education": "#42d4f4", "Sports": "#4363d8", "Healthcare": "#911eb4", "Aerospace": "#f032e6", "Insurance": "#a9a9a9", "Retail": "#dcbeff", "Public Policy": "#fabed4" };

/**
 * Analytics component
 */
export const Analytics: React.FC = () => {
  const [sponsors, setSponsors] = useState<Array<SponsorData>>([]);

  useEffect(() => {
    fetchCompleteCollection("sponsor", setSponsors);
  }, [])

  let statusCount = {};
  let industryCount = {};
  let totalBudget = 0;

  sponsors.map(s => {
    if (!(s.industry in industryCount)) industryCount[s.industry] = 1;
    else industryCount[s.industry] += 1;

    if (!(s.status in statusCount)) statusCount[s.status] = 1;
    else statusCount[s.status] += 1;

    totalBudget += s.amountSponsored;
  });
  const statusData = Object.keys(statusCount).map(k => {
    const percent = Math.round(statusCount[k]*100/sponsors.length)
    return { label: `${percent}%`, value: statusCount[k], angle: percent, color: statusBgColors[k] };
  });
  const industryData = Object.keys(industryCount).map(ind => {
    const percent = Math.round(industryCount[ind]*100/sponsors.length)
    return { label: `${percent}%`, value: industryCount[ind], angle: percent, color: industriesBgColors[ind] };
  });

  return (
    <>
    <br />
      <h2>Total Budget: <span style={{ color: "darkgreen" }}>${totalBudget}</span></h2>
      <br />
      <div className="flex-wrap-container" style={{ justifyContent: "space-between" }}>
        <div style={{ width: "450px", display: "flex" }}>
          <RadialChart
            data={statusData}
            width={250}
            height={250}
            showLabels={true}
            labelsAboveChildren={true}
            labelsRadiusMultiplier={1}
            animation={true}
            colorType="literal" />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {Object.keys(statusBgColors).map((s, i) => <h5 key={`label-${i}`} style={{ color: statusBgColors[s] }}>{s}</h5>)}
          </div>
        </div>
        <div style={{ width: "450px", display: "flex" }}>
          <RadialChart
            data={industryData}
            width={250}
            height={250}
            showLabels={true}
            labelsAboveChildren={true}
            labelsRadiusMultiplier={1}
            animation={true}
            colorType="literal" />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {Object.keys(industriesBgColors).map((s, i) => <h5 key={`label-${i}`} style={{ color: industriesBgColors[s] }}>{s}</h5>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
