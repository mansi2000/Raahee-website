import React, { useEffect } from 'react';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import filter from '../../assets/filter.png';
import './therapistFilterModal.scss';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
let specialities = [];
let filteredSpeciality = [];
let values = [0, 2000];

function getCommon(arr1, arr2) {
  const common = [];
  for (let i = 0; i < arr1.length; i += 1) {
    for (let j = 0; j < arr2.length; j += 1) {
      if (arr1[i] === arr2[j]) {
        common.push(arr1[i]);
      }
    }
  }
  return common;
}

const selectedTherapist = (mhps) => {
  const specialitiesArray = [];
  mhps.map((mhp, idx) => mhp.speciality?.split('$').map((speciality) => (filteredSpeciality.includes(speciality) ? specialitiesArray.push(mhps[idx]) : null)));
  const priceArray = mhps.filter((mhp) => mhp.fees >= values[0] && mhp.fees <= values[1]);
  const commonTherapist = getCommon(specialitiesArray, priceArray);
  if (commonTherapist.length === 0 && filteredSpeciality.length !== 0) {
    return [];
  } if (commonTherapist.length === 0 && filteredSpeciality.length === 0) {
    return priceArray;
  }
  return commonTherapist;
};

function handleFilterSpeciality(e, speciality) {
  if (e.target.checked) {
    filteredSpeciality.push(speciality);
  } else {
    const tempArray = filteredSpeciality.filter((item) => item !== speciality);
    filteredSpeciality = tempArray;
  }
}

function handleChange(value) {
  values = value;
}

function handleSubmit(props) {
  const tempArray = selectedTherapist(props.mhps);
  const newArray = new Set(tempArray);
  props.setFilteredTherapist(Array.from(newArray));
  props.setPriceRange(values);
  props.setCount(1);
  props.setLoading(true);
  props.onHide();
}

// async function check(speciality) {
//   return filteredSpeciality.includes(speciality);
// }
function clearStateFunc(setFilteredTherapist, setCount, setPriceRange, onHide) {
  setFilteredTherapist([]);
  setCount(0);
  filteredSpeciality = [];
  setPriceRange([0, 2000]);
  values = [0, 2000];
  onHide();
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="therapistFilter__title">
          Filter from specialities and price range
          <Button variant="primary" className="filter-button" onClick={() => clearStateFunc(props.setFilteredTherapist, props.setCount, props.setPriceRange, props.onHide)}>
            Clear
          </Button>
        </Modal.Title>
      </Modal.Header>
      {/* <Button onClick={() => handleSubmit(props)} style={{ marginLeft: '5px' }}>Done</Button> */}
      <Modal.Body>
        <h4>Price Range</h4>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '1rem', marginBottom: '0' }}>0</p>
          <Range
            allowCross={false}
            defaultValue={props.priceRange}
            step={100}
            min={0}
            max={2000}
            tipFormatter={(value) => `Rs.${value}`}
            onChange={handleChange}
          />
          <p style={{ marginBottom: '0', marginLeft: '8px' }}>2000</p>
        </div>
        <h4>Specialities</h4>
        <Form className="d-flex search-form">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={props.search.length > 0 ? props.search : null}
            onChange={(e) => props.setSearch(e.target.value.toLowerCase())}
          />
        </Form>
        {
          specialities.filter((speciality) => {
            if (props.search === '') {
              return speciality;
            } if (speciality.toLowerCase().includes(props.search)) {
              return speciality;
            }
            return null;
          }).map((speciality) => (
            <div key={speciality} className="mb-3">
              <Form.Check
                type="checkbox"
                label={speciality}
                defaultChecked={filteredSpeciality.includes(speciality)}
                onClick={(e) => handleFilterSpeciality(e, speciality)}
              />
            </div>
          ))
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSubmit(props)}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}

function TherapistFilterModal({ mhps, setLoading, setFilteredTherapist, setCount, setSpecialities }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState(values);
  const [search, setSearch] = React.useState('');
  const specialityArr = mhps[0]?.speciality?.split('$');
  specialityArr?.map((data) => specialities.push(data));
  mhps?.map((mhp) => mhp.speciality?.split('$').filter((speciality) => !specialities.includes(speciality)).map((data) => specialities.push(data)));
  const tempArray = new Set(specialities);
  specialities = Array.from(tempArray);

  useEffect(() => {
    setCount(1);
    const tempArray = selectedTherapist(mhps);
    const newArray = new Set(tempArray);
    setFilteredTherapist(Array.from(newArray));
  }, [filteredSpeciality, values]);

  return (
    <>
      <Button variant="primary" className="filter-button" onClick={() => setModalShow(true)}>
        <img src={filter} alt="filter" style={{ height: '1.3rem', width: '1rem', marginRight: '0.4rem' }} />
        Filter
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        mhps={mhps}
        setFilteredTherapist={setFilteredTherapist}
        setPriceRange={setPriceRange}
        setLoading={setLoading}
        priceRange={priceRange}
        setCount={setCount}
        search={search}
        setSpecialities={setSpecialities}
        setSearch={setSearch}
      />
    </>
  );
}

export default TherapistFilterModal;
