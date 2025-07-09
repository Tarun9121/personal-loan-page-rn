/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import PersonalLoan from './src/screens/PersonalLoan/PersonalLoan';
import BottomModalExample from './src/components/BottomModalExample';
import Demo from './src/components/Demo';
import TransactionDetails from './src/screens/TransactionDetails/TransactionDetails';
import BottomNavigations from './src/components/BottomNavigations';
import { View } from 'react-native';

function App(): React.JSX.Element {
  // return <BottomModalExample />
  // return <Demo />
  return <TransactionDetails />
}

export default App;
