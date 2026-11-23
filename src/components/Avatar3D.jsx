import { useRef, useEffect, Suspense } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import {
  OrbitControls,
  useGLTF,
  Environment
} from "@react-three/drei";

import * as THREE from "three";


function AvatarModel() {

  const group = useRef();

  // References to the avatar's head and neck bones
  const head = useRef(null);
const neck = useRef(null);

const leftEye = useRef(null);
const rightEye = useRef(null);

  // Store the original bone rotations
  const headBase = useRef(null);
  const neckBase = useRef(null);

  const { scene } = useGLTF("/models/tiaan-model.glb");

  const { pointer } = useThree();


  // Find the head and neck bones inside the 3D model
  useEffect(() => {

    scene.traverse((object) => {

      if (object.isBone && object.name === "Head") {
        head.current = object;
        headBase.current = object.rotation.clone();
      }

      if (object.isBone && object.name === "Neck") {
        neck.current = object;
        neckBase.current = object.rotation.clone();
      }
      if (object.isBone && object.name === "LeftEye") {
  leftEye.current = object;
}

if (object.isBone && object.name === "RightEye") {
  rightEye.current = object;
}
// 4. Make the eyes follow the mouse
if (leftEye.current && rightEye.current) {

  const eyeRotationY = pointer.x * 0.12;
  const eyeRotationX = -pointer.y * 0.08;

  leftEye.current.rotation.y = THREE.MathUtils.damp(
    leftEye.current.rotation.y,
    eyeRotationY,
    5,
    delta
  );

  rightEye.current.rotation.y = THREE.MathUtils.damp(
    rightEye.current.rotation.y,
    eyeRotationY,
    5,
    delta
  );

  leftEye.current.rotation.x = THREE.MathUtils.damp(
    leftEye.current.rotation.x,
    eyeRotationX,
    5,
    delta
  );

  rightEye.current.rotation.x = THREE.MathUtils.damp(
    rightEye.current.rotation.x,
    eyeRotationX,
    5,
    delta
  );

}

    });

    console.log("Head bone found:", head.current);
    console.log("Neck bone found:", neck.current);

  }, [scene]);


  // Animate the avatar
  useFrame((state, delta) => {

    if (!group.current) return;

    const time = state.clock.elapsedTime;


    // 1. Gentle floating / breathing movement
    group.current.position.y =
      -1 + Math.sin(time * 1.5) * 0.025;


    // 2. Make the head follow the mouse
    if (head.current && headBase.current) {

      const targetY =
        headBase.current.y + pointer.x * 0.35;

      const targetX =
        headBase.current.x - pointer.y * 0.20;


      head.current.rotation.y = THREE.MathUtils.damp(
        head.current.rotation.y,
        targetY,
        4,
        delta
      );

      head.current.rotation.x = THREE.MathUtils.damp(
        head.current.rotation.x,
        targetX,
        4,
        delta
      );

    }


    // 3. Give the neck subtle movement
    if (neck.current && neckBase.current) {

      const targetNeckY =
        neckBase.current.y + pointer.x * 0.08;

      neck.current.rotation.y = THREE.MathUtils.damp(
        neck.current.rotation.y,
        targetNeckY,
        3,
        delta
      );

    }

  });


  return (

    <group ref={group}>

      <primitive
        object={scene}
        scale={1.9}
        position={[0, 0, 0]}
      />

    </group>

  );

}


function Avatar3D() {

  return (

    <div className="avatar-3d-container">

      <Canvas camera={{ position: [0, 1.5, 4], fov: 40 }}>

        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <Suspense fallback={null}>

          <AvatarModel />

          <Environment preset="city" />

        </Suspense>

        <OrbitControls
          enablePan={false}
          enableRotate={true}
          enableZoom={true}
          minDistance={2}
          maxDistance={6}
          target={[0, 1, 0]}
        />

      </Canvas>

    </div>

  );

}


export default Avatar3D;