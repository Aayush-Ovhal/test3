import * as React from 'react';
import { Header } from 'react-native-elements';

const CustomHeader = (header) => {
  return (
    <Header
      centerComponent={{ text: header.title, style: { color: '#26BFA3', fontSize:20,fontWeight:"bold" } }}
      backgroundColor = "#183940"
    />
  );
};

export default CustomHeader;