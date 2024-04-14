import React from 'react';
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { StyleSheet } from 'react-native';

const Gradient = ({ width, height }) => {
  const diagonalLength = Math.sqrt(width * width + height * height);

  return (
    <Canvas style={[styles.canvas, { width, height }]}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(width / 2 - diagonalLength / 2, height / 2 - diagonalLength / 2)}
          end={vec(width / 2 + diagonalLength / 2, height / 2 + diagonalLength / 2)}
          colors={['#FF1B6B', '#BA5CA2', '#7B97D4', '#45CAFF']}
        />
      </Rect>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
  },
});

export default Gradient;
