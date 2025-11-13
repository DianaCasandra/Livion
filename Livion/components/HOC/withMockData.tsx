import React from 'react';
import { useMockData } from '../providers/MockDataProvider';

export const withMockData = (Component: any) => {
  return (props: any) => {
    const mock = useMockData();
    return <Component {...props} mock={mock} />;
  };
};