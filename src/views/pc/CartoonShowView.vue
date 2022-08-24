<template>
  <div id="scene"> </div>
</template>
<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import * as THREE from "three";
const initThree = () => {
  const scene = new THREE.Scene();
//   scene.background = new THREE.Color("#eee");
  const canvas = document.querySelector("#scene");
  const renderer = new THREE.WebGLRenderer();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth-300, window.innerHeight-30);
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);
  // 平面
  let planeGeometry = new THREE.PlaneGeometry(60, 20);
  let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  scene.add(plane);
  // 立方体
  let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  let cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000//, wireframe: true
  });
  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(5, 3, 0);
  scene.add(cube);
    // 球体
  let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  let sphereMaterial = new THREE.MeshPhongMaterial({color: 0x666666});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(25, 3, 0)
    scene.add(sphere);
    
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);
    
    canvas?.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // 光源
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
};
onMounted(() => {
  initThree();
});
</script>
<style scoped>
#scene {
  width: 100%;
  height: 100%;
  /* position: fixed;
  left: 0;
  top: 0; */
}
</style>