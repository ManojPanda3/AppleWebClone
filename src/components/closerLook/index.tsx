import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useState } from 'react';

export default function TakeALook() {
  const [isModelVisible, setModelVisible] = useState<boolean>(true);
  return (
    <section className="bg-black mt-8">
      <p className="pt-32 px-6 lg:px-24 md:px-12 text-white font-bold text-5xl">Take a closer look.</p>
      <button onClick={() => setModelVisible(!isModelVisible)}> {isModelVisible ? "Off" : "On"} the model</button>
      {isModelVisible && <Model />}
    </section>
  )
}

function Model() {
  const { scene, nodes, materials } = useGLTF('../../assets/iphone_16.glb');
  if (!scene && !nodes && !materials) return <>Error</>
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Stage>
        <primitive object={scene} />
      </Stage>
      <OrbitControls />
    </Canvas>
  );
}
