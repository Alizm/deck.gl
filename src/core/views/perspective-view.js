import View from './view';
import Viewport from '../viewports/viewport';

import mat4_lookAt from 'gl-mat4/lookAt';
import mat4_perspective from 'gl-mat4/perspective';

const DEGREES_TO_RADIANS = Math.PI / 180;

export default class PerspectiveView extends View {
  _getViewport(props) {
    const {
      // viewport arguments
      x,
      y,
      width, // Width of viewport
      height, // Height of viewport

      viewState
    } = props;

    const {
      // view matrix arguments
      eye, // Defines eye position
      lookAt = [0, 0, 0], // Which point is camera looking at, default origin
      up = [0, 1, 0], // Defines up direction, default positive y axis
      // projection matrix arguments
      fovy = 75, // Field of view covered by camera
      near = 1, // Distance of near clipping plane
      far = 100 // Distance of far clipping plane
    } = viewState;

    let {
      // automatically calculated
      aspect = null // Aspect ratio (set to viewport widht/height)
    } = viewState;

    const fovyRadians = fovy * DEGREES_TO_RADIANS;
    aspect = Number.isFinite(aspect) ? aspect : width / height;
    return new Viewport({
      x,
      y,
      width,
      height,
      viewMatrix: mat4_lookAt([], eye, lookAt, up),
      projectionMatrix: mat4_perspective([], fovyRadians, aspect, near, far)
    });
  }
}

PerspectiveView.displayName = 'PerspectiveView';
