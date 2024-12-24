import React from 'react';
import { useParams } from 'react-router-dom';

const BannerFromComponent = ({ isEdit, isDetail }) => { 
  const { id } = useParams();
  return (
    <div>
      {isDetail ? (
        <h1>Detail Banner</h1> 
      ) : isEdit ? (
        <h1>Edit Banner</h1>
      ) : (
        <h1>Add Banner</h1>
      )}
      <p>data = {id}</p>
    </div>
  );
};

export default BannerFromComponent;