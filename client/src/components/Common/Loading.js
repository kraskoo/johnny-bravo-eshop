import React from 'react';
import { ClipLoader } from 'react-spinners';
import './loading.css';

function Loading(loading) {
  return (
    <div className="sweet-loding clip-loader-123">
      <ClipLoader
        sizeUnit={'px'}
        size={150}
        color={'#123abc'}
        loading={loading} />
    </div>
  );
}

export default Loading;