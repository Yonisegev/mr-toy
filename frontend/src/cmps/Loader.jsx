import LoaderSvg from '../assets/img/loader.svg';

export const Loader = () => {
  return (
    <>
      <div style={{display: 'grid', placeContent: 'center'}}>
        <img
          style={{ width: '300px', height: '300px' }}
          src={LoaderSvg}
          alt='Loading'
        />
        ;
      </div>
    </>
  );
};
