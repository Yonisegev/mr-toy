import React, { memo, useCallback, useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Loader } from '../cmps/Loader';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 32.089820,
  lng: 34.782870,
};

const branches = [
  {
    title: 'Tel-Aviv Branch',
    position: { lat: 32.089820, lng: 34.782870 },
    address: 'Ibn Gbirol 154',
    tel: '03-123456',
    open: 'Sunday-Thursday 8AM - 8PM',
  },
  {
    title: 'Rishon Lezion Branch',
    position: { lat: 31.991300, lng: 34.770700 },
    address: 'David Saharov 23',
    tel: '03-123456',
    open: 'Sunday-Thursday 8AM - 8PM',
  },
  {
    title: 'Yavne Branch',
    position: { lat: 31.886490, lng: 34.733700 },
    address: 'Ha-Kishon 7',
    tel: '08-123456',
    open: 'Sunday-Thursday 8AM - 8PM',
  },
];

export const About = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDCdZ8RItKP9Q3-hCXKS3HqnfnRXbpVLk8',
  });

  const [map, setMap] = useState(null);
  const [isInfoWindowShown, setIsInfowWindowShown] = useState(false);
  const [selectedBranchIdx, setSelectedBranchIdx] = useState(0);

  const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onBranchClicked = idx => {
    setIsInfowWindowShown(true);
    setSelectedBranchIdx(idx);
    map.panTo(branches[selectedBranchIdx].position)
  };

  const closeInfoWindow = () => {
    setIsInfowWindowShown(false);
  };

  return isLoaded ? (
    <section className='store-branches'>
      <div className='map-container'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          initialLatLng={center}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {branches.map((branch, idx) => (
            <Marker
              key={idx}
              position={branch.position}
              name={branch.title}
              onClick={() => onBranchClicked(idx)}
            />
          ))}
          {isInfoWindowShown && (
            <InfoWindow
              onCloseClick={closeInfoWindow}
              position={branches[selectedBranchIdx].position}
            >
              <>
                <h1>{branches[selectedBranchIdx].title}</h1>
                <p>Address: {branches[selectedBranchIdx].address}</p>
                <p>Tel: {branches[selectedBranchIdx].tel}</p>
                <p>Hours: {branches[selectedBranchIdx].open}</p>
              </>
            </InfoWindow>
          )}
          <></>
        </GoogleMap>
      </div>
      <div className='branch-list'>
        <h3>Our branches</h3>
        {branches.map((branch, idx) => (
          <div key={idx} className='branch'>
            <p onClick={() => onBranchClicked(idx)} className='branch-name'>{branch.title}</p>
            <p>Address: {branch.address}</p>
            <p>Hours: {branch.open}</p>
            <p>Tel: {branch.tel}</p>
          </div>
        ))}
      </div>
    </section>
  ) : (
    <Loader />
  );
};
