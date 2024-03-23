import React, { useEffect } from 'react';
import * as Font from 'expo-font';

const FontLoader = ({ fonts, children }) => {
  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync(fonts);
  };

  return <React.Fragment>{children}</React.Fragment>;
};

export default FontLoader;
