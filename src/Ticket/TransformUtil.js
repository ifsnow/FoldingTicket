// @flow
// Reference: https://medium.freecodecamp.org/how-to-build-a-flip-timer-in-react-native-e208e54baf58

import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

const {
  createIdentityMatrix,
  reusePerspectiveCommand,
  multiplyInto,
} = MatrixMath;

function applyTranslate(matrix: any, origin: any) {
  const {
    x, y, z,
  } = origin;
  const translate = createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
  multiplyInto(matrix, translate, matrix);
}

function applyUntranslate(matrix: any, origin: any) {
  const {
    x, y, z,
  } = origin;
  const unTranslate = createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(unTranslate, -x, -y, -z);
  multiplyInto(matrix, matrix, unTranslate);
}

function applyRotateX(matrix: any, deg: number) {
  const rad = (Math.PI / 180) * deg;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rotate = [
    1, 0, 0, 0,
    0, cos, -sin, 0,
    0, sin, cos, 0,
    0, 0, 0, 1,
  ];

  multiplyInto(matrix, matrix, rotate);
}

function applyRotateY(matrix: any, deg: number) {
  const rad = (Math.PI / 180) * deg;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rotate = [
    cos, 0, sin, 0,
    0, 1, 0, 0,
    -1 * sin, 0, cos, 0,
    0, 0, 0, 1,
  ];

  multiplyInto(matrix, matrix, rotate);
}

function applyPerspective(matrix: any, value: number) {
  const perspective = createIdentityMatrix();
  reusePerspectiveCommand(perspective, value);
  multiplyInto(matrix, matrix, perspective);
}

function rotateX(deg: number, y: number, perspective: number = 1500) {
  const matrix = createIdentityMatrix();
  applyTranslate(matrix, {
    x: 0,
    y,
    z: 0,
  });
  applyPerspective(matrix, perspective);
  applyRotateX(matrix, deg);
  applyUntranslate(matrix, {
    x: 0,
    y,
    z: 0,
  });
  return matrix;
}

function rotateY(deg: number, x: number, perspective: number = 1500) {
  const matrix = createIdentityMatrix();
  applyTranslate(matrix, {
    x,
    y: 0,
    z: 0,
  });
  applyPerspective(matrix, perspective);
  applyRotateY(matrix, deg);
  applyUntranslate(matrix, {
    x,
    y: 0,
    z: 0,
  });
  return matrix;
}

export default {
  createIdentityMatrix,
  applyTranslate,
  applyUntranslate,
  applyRotateX,
  applyPerspective,
  rotateX,
  rotateY,
};
