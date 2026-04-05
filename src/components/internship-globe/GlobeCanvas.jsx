import { Suspense, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, useTexture } from '@react-three/drei';

import InternshipTooltip from './InternshipTooltip';

const latLngToVector3 = (lat, lng, radius = 1) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

const FocusCamera = ({ activeLocation, controlsRef }) => {
  const { camera } = useThree();
  const targetPositionRef = useRef(new THREE.Vector3(0, 0, 2.9));

  useFrame((_, delta) => {
    if (!activeLocation) return;

    targetPositionRef.current
      .copy(latLngToVector3(activeLocation.lat, activeLocation.lng, 1.2))
      .normalize()
      .multiplyScalar(2.35);

    camera.position.lerp(targetPositionRef.current, 1 - Math.exp(-delta * 3.5));
    controlsRef.current?.target.lerp(new THREE.Vector3(0, 0, 0), 1 - Math.exp(-delta * 5));
    controlsRef.current?.update();
  });

  return null;
};

FocusCamera.propTypes = {
  activeLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  controlsRef: PropTypes.shape({ current: PropTypes.object })
};

const InternshipMarker = ({
  location,
  isSelected,
  onHover,
  onLeave,
  onSelect
}) => {
  const markerRef = useRef();
  const pulseRef = useRef();

  const markerPosition = useMemo(
    () => latLngToVector3(location.lat, location.lng, 1.03),
    [location.lat, location.lng]
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (markerRef.current) {
      const baseScale = isSelected ? 1.2 : 1;
      markerRef.current.scale.setScalar(baseScale + Math.sin(time * 4) * 0.06);
    }

    if (pulseRef.current) {
      const pulse = (Math.sin(time * 3) + 1) / 2;
      pulseRef.current.scale.setScalar(1 + pulse * 2.2);
      pulseRef.current.material.opacity = 0.25 - pulse * 0.22;
    }
  });

  return (
    <group position={markerPosition}>
      <mesh
        ref={pulseRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(location);
        }}
        onPointerOut={onLeave}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(location);
        }}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
      </mesh>

      <mesh
        ref={markerRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(location);
        }}
        onPointerOut={onLeave}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(location);
        }}
      >
        <sphereGeometry args={[0.02, 20, 20]} />
        <meshStandardMaterial color={isSelected ? '#7dd3fc' : '#38bdf8'} emissive="#38bdf8" emissiveIntensity={2.4} />
      </mesh>

      {isSelected && (
        <Html distanceFactor={1.2} position={[0.12, 0.14, 0]} style={{ pointerEvents: 'none' }}>
          <InternshipTooltip location={location} showLink={false} />
        </Html>
      )}
    </group>
  );
};

InternshipMarker.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string,
    company: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

const GlobeModel = ({ locations, activeLocation, setHoveredLocation, setActiveLocation }) => {
  const controlsRef = useRef(null);
  const earthTexture = useTexture('/images/earth-map.jpg');
  earthTexture.colorSpace = THREE.SRGBColorSpace;
  earthTexture.wrapS = THREE.RepeatWrapping;
  earthTexture.repeat.set(1, 1);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 2, 3]} intensity={2} color="#ffffff" />
      <directionalLight position={[-2, 1, -2]} intensity={0.6} color="#e0f2fe" />
      <pointLight position={[-2, -2, -2]} intensity={0.85} color="#93c5fd" />

      <mesh
        onClick={(e) => {
          e.stopPropagation();
          setActiveLocation(null);
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          color="#ffffff"
          emissive="#000000"
          emissiveIntensity={0}
          metalness={0}
          roughness={1}
          transparent
          opacity={1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.08, 60, 60]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.015} side={THREE.BackSide} />
      </mesh>

      {locations.map((location) => (
        <InternshipMarker
          key={location.id}
          location={location}
          isSelected={activeLocation?.id === location.id}
          onHover={setHoveredLocation}
          onLeave={() => setHoveredLocation(null)}
          onSelect={(location) =>
            setActiveLocation((current) => (current?.id === location.id ? null : location))
          }
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={1.65}
        maxDistance={3.4}
        autoRotate
        autoRotateSpeed={0.45}
      />

      <FocusCamera activeLocation={activeLocation} controlsRef={controlsRef} />
    </>
  );
};

GlobeModel.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeLocation: PropTypes.shape({ id: PropTypes.string }),
  setHoveredLocation: PropTypes.func.isRequired,
  setActiveLocation: PropTypes.func.isRequired
};

const GlobeCanvas = ({ locations, activeLocation, setHoveredLocation, setActiveLocation }) => {
  return (
    <div style={{ height: '420px', width: '100%', borderRadius: '14px 14px 0 0', background: 'linear-gradient(180deg, #0d1117 0%, #080e14 100%)' }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 2.9], fov: 50 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      >
        <Suspense fallback={null}>
          <GlobeModel
            locations={locations}
            activeLocation={activeLocation}
            setHoveredLocation={setHoveredLocation}
            setActiveLocation={setActiveLocation}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

GlobeCanvas.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeLocation: PropTypes.shape({ id: PropTypes.string }),
  setHoveredLocation: PropTypes.func.isRequired,
  setActiveLocation: PropTypes.func.isRequired
};

export default GlobeCanvas;
