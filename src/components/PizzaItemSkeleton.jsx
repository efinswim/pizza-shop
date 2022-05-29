import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaItemSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={456}
    viewBox='0 0 280 456'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}>
    <rect x='92' y='122' rx='0' ry='0' width='0' height='1' />
    <circle cx='100' cy='100' r='100' />
    <rect x='0' y='216' rx='6' ry='6' width='195' height='28' />
    <rect x='0' y='268' rx='6' ry='6' width='194' height='56' />
    <rect x='0' y='356' rx='0' ry='0' width='76' height='24' />
    <rect x='95' y='347' rx='16' ry='16' width='99' height='33' />
  </ContentLoader>
);

export default PizzaItemSkeleton;
