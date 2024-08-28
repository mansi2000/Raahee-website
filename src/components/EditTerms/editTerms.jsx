import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { updateCancellationPolicy, updateConfidentiality, updateMainTerms } from '../../actions/therapyTerms';
import './editTerms.scss';

const EditTerms = ({ ...props }) => {
  const [addData, setAddData] = useState(props.data);
  const dispatch = useDispatch();

  useEffect(() => {
    setAddData(props.data);
  }, [props.data]);

  const handleChange = (e, editor) => {
    const newdata = editor.getData();
    setAddData(newdata);
  };

  const handleSubmit = () => {
    if (props.selected === 'mainTerms') {
      dispatch(updateMainTerms(props.id, addData)).then(() => {
        alert('Saved successfully');
      });
    } else if (props.selected === 'cancellationPolicy') {
      dispatch(updateCancellationPolicy(props.id, addData)).then(() => {
        alert('Saved successfully');
      });
    } else if (props.selected === 'confidentiality') {
      dispatch(updateConfidentiality(props.id, addData)).then(() => {
        alert('Saved successfully');
      });
    }
  };
  return (
    <div className="termsEditor">
      <CKEditor
        editor={ClassicEditor}
        data={addData}
        onChange={handleChange}
      />
      <div className="termsEditor-saveButton">
        <button onClick={() => handleSubmit()}>
          Save
        </button>
      </div>

    </div>
  );
};

export default EditTerms;
