import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Edit, Trash2 } from '@geist-ui/react-icons';
import { statusCardTypeDict } from '../constants';
import { deleteFromDatabase, updateDatabase } from '../Helper';
import { Button, Input, Select, useToasts } from '@geist-ui/react';
import { industries, packagePerks, sponsorTypes, statuses } from '../constants';

/**
 * SponsorCard component
 */
export interface SponsorData {
  _id?: string;
  member: string;
  company: string;
  industry: string;
  status: string;
  sponsorType: string;
  img: string;
  description: string;
  amountSponsored: number;
  perks: Array<string>;
}
interface SponsorCardProps {
  data: SponsorData;
  edit: boolean;
}
export const SponsorCard: React.FC<SponsorCardProps> = (props) => {
  const [, setToast] = useToasts();
  const [displayEditSection, setDisplayEditSection] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [item, setItem] = useState(props.data);

  const getFloatValue = str => isNaN(parseFloat(str)) ? 0 : parseFloat(str);
  const updateItem = (key, val) => setItem({ ...item, [key]: val });

  const imgUrl = item.img.length == 0 ? "https://picsum.photos/250" : item.img;

  const deleteSponsor = () => {
    setDeleted(true);
    deleteFromDatabase('sponsor', props.data._id, setToast);
  }
  const updateSponsor = (sponsorObj) => {
    setItem(sponsorObj);
    updateDatabase('sponsor', sponsorObj, setToast);
    setDisplayEditSection(false);
  }

  const validateData = () => {
    if (item.company.length > 0 && item.industry.length > 0) {
      if (item.status == "Sponsoring") {
        if (item.amountSponsored >= 2000 && item.amountSponsored <= 15000) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }
  const processItem = () => {
    if (validateData()) {
      updateSponsor({
        _id: props.data._id,
        member: item.member,
        company: item.company,
        industry: item.industry,
        description: item.description,
        img: item.img.length == 0 ? "https://picsum.photos/250" : item.img,
        status: item.status,
        sponsorType: item.sponsorType,
        perks: item.perks,
        amountSponsored: item.amountSponsored,
      })
    }
    else {
      setToast({ text: "Invalid data", type: 'error', delay: 3000 })
    }
  }

  if (deleted) return <></>

  return (
    <div className="editable-card-container">
      <div className="item-card">
        {item.sponsorType == "Title" && <div className="item-card-discount-tag">TITLE</div>}
        <div className="item-card-img-container">
          <img className="item-card-img" src={imgUrl} alt="" />
        </div>
        <div className={`item-card-details-container ${statusCardTypeDict[item.status]}`}>
          <div style={{ height: '100px', display: 'flex' }}>
            <div style={{ width: '100%' }}>
              <h3 className="item-card-title">{item.company}</h3>
              <h5 style={{ marginBottom: "5px" }}>{item.industry}</h5>
              <h5>{item.member}</h5>
              {item.status == "Sponsoring"
                ? <i>{item.perks.map((p, i) => (i < item.perks.length - 1) ? <span key={`perk-${i}`}>{p}, </span> : <span key={`perk-${i}`}>{p}</span>)}</i>
                : <i>{item.description}</i>
              }
            </div>
            <span style={{ color: '#666', float: "right" }}>${item.amountSponsored}</span>
          </div>
          {props.edit && <div className="card-btns-container">
            <Button onClick={() => setDisplayEditSection(!displayEditSection)} size="small" type="success-light" icon={<Edit />} auto />
            <Button onClick={deleteSponsor} size="small" type="error-light" icon={<Trash2 />} auto />
          </div>}
        </div>
      </div>
      <div className={`card-edit-section ${displayEditSection && "show"}`}>
        <Input onChange={e => updateItem('member', e.target.value)} initialValue={item.member} className="inp-full-width" label="Member" placeholder="Some Rando" />
        <Input onChange={e => updateItem('company', e.target.value)} initialValue={item.company} className="inp-full-width" label="Company" placeholder="Dell" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="custom-label">Industry</span>
          <Select initialValue={item.industry} onChange={v => updateItem('industry', v.toString())} placeholder="Choose one" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
            {industries.map((ind, i) => <Select.Option key={`ind-opt-${i}`} value={ind}>{ind}</Select.Option>)}
          </Select>
        </div>
        <Input initialValue={item.img} onChange={e => updateItem('img', e.target.value)} className="inp-full-width" label="Image URL (optional)" placeholder="https://tamudatathon.com/static/img/sponsors/current/dell_logo.svg" />
        <Input initialValue={item.description} onChange={e => updateItem('description', e.target.value)} className="inp-full-width" label="Description (optional)" placeholder="Meeting with a recruiter on July 18th." />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="custom-label">Status</span>
          <Select initialValue={item.status} onChange={v => updateItem('status', v.toString())} placeholder="Choose one" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
            {statuses.map((s, i) => <Select.Option key={`status-opt-${i}`} value={s}>{s}</Select.Option>)}
          </Select>
        </div>
        {item.status == "Sponsoring" && (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="custom-label">Sponsor Type</span>
              <Select initialValue={item.sponsorType} onChange={v => updateItem('sponsorType', v.toString())} placeholder="Choose one" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
                {sponsorTypes.map((s, i) => <Select.Option key={`spon-type-opt-${i}`} value={s}>{s}</Select.Option>)}
              </Select>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="custom-label">Package Perks</span>
              <Select initialValue={item.perks} onChange={v => typeof v == "string" ? updateItem('perks', [v]) : updateItem('perks', v)} placeholder="Choose all applicable" multiple width="200px">
                {packagePerks.map((p, i) => <Select.Option key={`perk-opt-${i}`} value={p}>{p}</Select.Option>)}
              </Select>
            </div>
            <Input initialValue={item.amountSponsored.toString()} onChange={e => updateItem('amountSponsored', getFloatValue(e.target.value))} className="inp-full-width" label="Amount Sponsored" placeholder="5000" />
            <br />
          </>
        )}
        <div className="flex-wrap-container" style={{ justifyContent: "space-between", gap: "10px" }}>
          <Button type="secondary" onClick={processItem}>SUBMIT</Button>
          <Button type="secondary" onClick={() => setDisplayEditSection(false)}>CANCEL</Button>
        </div>
      </div>
    </div>
  );
};

SponsorCard.propTypes = {
  data: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired
};

export default SponsorCard;
