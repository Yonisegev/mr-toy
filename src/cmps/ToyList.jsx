import React, { memo } from 'react';
import { ToyPreview } from './ToyPreview';

export const ToyList = memo(({ toys }) => {
  return (
    <ul className='toy-list'>
      {toys.map((toy) => (
        <ToyPreview key={toy._id} toy={toy} />
      ))}
    </ul>
  );
});
