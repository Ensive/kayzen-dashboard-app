import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="Loading">
      <FontAwesomeIcon icon={faSpinner} size="lg" spin />
    </div>
  );
};

export default Loading;
