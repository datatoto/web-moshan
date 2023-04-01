import * as THREE from "three";

// https://discourse.threejs.org/t/adding-compass-to-the-scene/8727/2
// https://stackoverflow.com/questions/14813902/three-js-get-the-direction-in-which-the-camera-is-looking?rq=3
// https://stackoverflow.com/questions/68772352/set-camera-angle-react-three-fiber
function getCameraRotateDeg(camera) {
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);

  const sph = new THREE.Spherical();
  sph.setFromVector3(dir);
  const deg = THREE.MathUtils.radToDeg(sph.theta) - 180;
  return deg;
}

export { getCameraRotateDeg };
