import { addToDatabase } from '../Helper';
import React, { useEffect, useState } from 'react';
import { Button, Input, Select, useToasts } from '@geist-ui/react';
import { industries, packagePerks, sponsorTypes, statuses } from '../constants';

/**
 * NewSponsor component
 */
export const NewSponsor: React.FC = () => {
  const [member, setMember] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [sponsorType, setSponsorType] = useState('');
  const [perks, setPerks] = useState([]);
  const [amountSponsored, setAmountSponsored] = useState(0);
  const [, setToast] = useToasts();

  const getFloatValue = str => isNaN(parseFloat(str)) ? 0 : parseFloat(str);

  const validateData = () => {
    if (company.length > 0 && industry.length > 0) {
      if (status == "Sponsoring") {
        if (perks.length > 0 && amountSponsored >= 2000 && amountSponsored <= 15000) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }

  const createItem = (item) => addToDatabase('sponsor', item, setToast);
  const processItem = () => {
    if (validateData()) {
      let finalObj = {
        member: member,
        company: company,
        industry: industry,
        description: description,
        img: imgUrl.length == 0 ? "https://picsum.photos/250" : imgUrl,
        status: status,
        sponsorType: sponsorType,
        perks: perks,
        amountSponsored: amountSponsored,
      }
      createItem(finalObj)
    }
    else {
      setToast({ text: "Invalid data", type: 'error', delay: 3000 })
    }
  }

  useEffect(() => {
    setSponsorType('');
    setPerks([]);
    setAmountSponsored(0);
  }, [status])

  return (
    <div className="form-container">
      <Input onChange={e => setMember(e.target.value)} className="inp-full-width" label="Who R U" placeholder="Some Rando" />
      <Input onChange={e => setCompany(e.target.value)} className="inp-full-width" label="Company" placeholder="Dell" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="custom-label">Industry</span>
        <Select onChange={v => setIndustry(v.toString())} placeholder="Choose one" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
          {industries.map((ind, i) => <Select.Option key={`ind-opt-${i}`} value={ind}>{ind}</Select.Option>)}
        </Select>
      </div>
      <Input onChange={e => setImgUrl(e.target.value)} className="inp-full-width" label="Image URL (optional)" placeholder="https://tamudatathon.com/static/img/sponsors/current/dell_logo.svg" />
      <Input onChange={e => setDescription(e.target.value)} className="inp-full-width" label="Description (optional)" placeholder="Meeting with a recruiter on July 18th." />
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="custom-label">Status</span>
        <Select onChange={v => setStatus(v.toString())} placeholder="Choose one" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
          {statuses.map((s, i) => <Select.Option key={`status-opt-${i}`} value={s}>{s}</Select.Option>)}
        </Select>
      </div>
      {status == "Sponsoring" && (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="custom-label">Sponsor Type</span>
            <Select onChange={v => setSponsorType(v.toString())} placeholder="Choose one" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
              {sponsorTypes.map((s, i) => <Select.Option key={`spon-type-opt-${i}`} value={s}>{s}</Select.Option>)}
            </Select>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="custom-label">Package Perks</span>
            <Select onChange={v => typeof v == "string" ? setPerks([v]) : setPerks(v)} placeholder="Choose all applicable" multiple width="200px">
              {packagePerks.map((p, i) => <Select.Option key={`perk-opt-${i}`} value={p}>{p}</Select.Option>)}
            </Select>
          </div>
          <Input onChange={e => setAmountSponsored(getFloatValue(e.target.value))} className="inp-full-width" label="Amount Sponsored" placeholder="5000" />
          <br />
        </>
      )}
      <Button type="secondary" onClick={processItem}>SUBMIT</Button>
    </div>
  );
};

export default NewSponsor;
