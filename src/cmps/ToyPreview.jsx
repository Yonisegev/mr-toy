import React, { memo } from 'react';

export const ToyPreview = memo(({ toy }) => {
  return (
    <article className='toy-preview'>
      Toy Preview works
      <pre>{toy && JSON.stringify(toy, null, 2)}</pre>
    </article>
  );
});
