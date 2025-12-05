import React from 'react';
import { useMockData } from '../providers/MockDataProvider';

/**
 * withMockData HOC
 * Higher-order component that injects mock data into wrapped components
 * 
 * Usage:
 * const EnhancedComponent = withMockData(YourComponent);
 */
export function withMockData<P extends object>(
  Component: React.ComponentType<P & { patientData: any }>
) {
  return function WithMockDataWrapper(props: P) {
    const { patientData } = useMockData();

    return <Component {...props} patientData={patientData} />;
  };
}

/**
 * Example usage:
 * 
 * const MyComponent = ({ patientData, ...otherProps }) => {
 *   return (
 *     <View>
 *       <Text>{patientData.name}</Text>
 *     </View>
 *   );
 * };
 * 
 * export default withMockData(MyComponent);
 */
