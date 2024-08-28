import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { firestore } from '../../../firebase/firebase.utils';

const AddTestimonial = ({ eventId }) => {
  const user = useSelector((state) => state.user);
  const [testimonial, setTestimonial] = useState('');

  const handleTestimonialChange = (event) => {
    setTestimonial(event.target.value);
  };

  const addTestimonialHandler = () => {
    firestore.collection('events').doc(eventId).update({
      [`testimonials.${user.displayName}`]: testimonial,
    });
  };

  return (
    user && (
      <div className="container mt-3 mb-5">
        <h4 className="text-center">Add Testimonial</h4>
        <form>
          <div className="form-row justify-content-center">
            <div className="col-6">
              <textarea
                onChange={handleTestimonialChange}
                value={testimonial}
                className="form-control"
              />
            </div>
            <button onClick={addTestimonialHandler} className="btn btn-secondary text-capitalize">
              Post
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default AddTestimonial;
