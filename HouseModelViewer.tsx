"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  ContactShadows, 
  Html,
  PerspectiveCamera,
  useProgress,
  Loader
} from "@react-three/drei";
import * as THREE from "three";

// Loading indicator component
function LoadingIndicator() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white bg-black/50 p-4 rounded-lg">
        <div className="text-lg font-bold mb-2">Loading 3D Model</div>
        <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}

// Modern house model
function ModernHouseModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, onLoaded }) {
  const groupRef = useRef();
  // Using a locally hosted or reliable 3D model source
  const [modelError, setModelError] = useState(false);
  const { scene } = useGLTF("/models/modern_house.glb", undefined, 
    (error) => {
      console.error("Error loading modern house model:", error);
      setModelError(true);
    }
  );
  
  // Apply some default materials if needed
  useEffect(() => {
    if (scene) {
      try {
        scene.traverse((child) => {
          if (child.isMesh) {
            // Enable shadows
            child.castShadow = true;
            child.receiveShadow = true;
            
            // If the material looks too dark, we can adjust it
            if (child.material) {
              // Ensure materials are properly lit
              child.material.roughness = Math.min(child.material.roughness || 0.5, 0.8);
              child.material.metalness = Math.min(child.material.metalness || 0.2, 0.5);
            }
          }
        });
        
        // Signal that the model loaded successfully
        if (onLoaded) onLoaded();
      } catch (e) {
        console.error("Error setting up model materials:", e);
      }
    }
  }, [scene, onLoaded]);
  
  // Add some subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });
  
  // If there's an error loading the model, show a fallback cube
  if (modelError) {
    return (
      <group
        ref={groupRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 1, 2]} />
          <meshStandardMaterial color="#4287f5" />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <coneGeometry args={[1.5, 1, 4]} />
          <meshStandardMaterial color="#3277e5" />
        </mesh>
        <Html position={[0, 2, 0]}>
          <div className="bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
            Model unavailable - using placeholder
          </div>
        </Html>
      </group>
    );
  }
  
  return (
    <group 
      ref={groupRef} 
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <primitive object={scene} />
    </group>
  );
}

// Simplified house model that doesn't rely on external resources
function SimpleHouseModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, type = "modern" }) {
  const groupRef = useRef();
  
  // Add some subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });
  
  const colors = type === "modern" 
    ? { main: "#4287f5", roof: "#3277e5", details: "#ffffff" }
    : { main: "#8a6d3b", roof: "#7a5d2b", details: "#d9c0a3" };
    
  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Main house body */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 1.5]} />
        <meshStandardMaterial color={colors.main} />
      </mesh>
      
      {/* Roof */}
      {type === "modern" ? (
        <mesh castShadow position={[0, 1.1, 0]}>
          <boxGeometry args={[2.2, 0.2, 1.7]} />
          <meshStandardMaterial color={colors.roof} />
        </mesh>
      ) : (
        <mesh castShadow position={[0, 1.3, 0]}>
          <coneGeometry args={[1.5, 0.8, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={colors.roof} />
        </mesh>
      )}
      
      {/* Door */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0.76]}>
        <boxGeometry args={[0.4, 0.8, 0.05]} />
        <meshStandardMaterial color={colors.details} />
      </mesh>
      
      {/* Windows */}
      <mesh castShadow receiveShadow position={[-0.7, 0.5, 0.76]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color={colors.details} />
      </mesh>
      
      <mesh castShadow receiveShadow position={[0.7, 0.5, 0.76]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color={colors.details} />
      </mesh>
      
      {/* Back windows */}
      <mesh castShadow receiveShadow position={[-0.5, 0.5, -0.76]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color={colors.details} />
      </mesh>
      
      <mesh castShadow receiveShadow position={[0.5, 0.5, -0.76]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color={colors.details} />
      </mesh>
      
      {/* Side windows */}
      <mesh castShadow receiveShadow position={[-1.01, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.4]} />
        <meshStandardMaterial color={colors.details} />
      </mesh>
      
      <mesh castShadow receiveShadow position={[1.01, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.4]} />
        <meshStandardMaterial color={colors.details} />
      </mesh>
    </group>
  );
}

// House with property info
function HouseWithInfo({ position = [0, 0, 0], scale = 1, houseType = "modern", onModelLoaded }) {
  const [showInfo, setShowInfo] = useState(false);
  const [infoPosition, setInfoPosition] = useState([0, 2, 0]);
  const [useSimpleModel, setUseSimpleModel] = useState(false);
  
  // Property details based on house type
  const propertyInfo = houseType === "modern" 
    ? {
        address: "123 Modern Avenue",
        price: "$750,000",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2850,
        year: 2023,
        features: ["Smart Home Technology", "Solar Panels", "Home Office"]
      }
    : {
        address: "456 Heritage Lane",
        price: "$580,000",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2100,
        year: 1995,
        features: ["Recently Renovated", "Large Backyard", "Fireplace"]
      };
  
  return (
    <group position={position}>
      {/* The house model based on type and availability */}
      {useSimpleModel ? (
        <SimpleHouseModel 
          position={[0, 0, 0]} 
          rotation={[0, houseType === "modern" ? Math.PI / 6 : Math.PI / 4, 0]} 
          scale={scale * 1.2} 
          type={houseType}
        />
      ) : houseType === "modern" ? (
        <ModernHouseModel 
          position={[0, 0, 0]} 
          rotation={[0, Math.PI / 6, 0]} 
          scale={scale} 
          onLoaded={onModelLoaded}
        />
      ) : (
        <SimpleHouseModel 
          position={[0, 0, 0]} 
          rotation={[0, Math.PI / 4, 0]} 
          scale={scale} 
          type="traditional"
        />
      )}
      
      {/* Interactive hotspot */}
      <mesh 
        position={[0, 1.5, 0]} 
        onPointerOver={() => setShowInfo(true)}
        onPointerOut={() => setShowInfo(false)}
        visible={false}
      >
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Property info card */}
      {showInfo && (
        <Html
          position={infoPosition}
          center
          distanceFactor={10}
          zIndexRange={[0, 40]}
        >
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-blue-200 w-64">
            <h3 className="text-xl font-bold text-blue-800 mb-2">{propertyInfo.address}</h3>
            <p className="text-2xl font-bold text-green-700 mb-3">{propertyInfo.price}</p>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <div className="font-bold">{propertyInfo.bedrooms}</div>
                <div className="text-xs text-gray-600">Beds</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{propertyInfo.bathrooms}</div>
                <div className="text-xs text-gray-600">Baths</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{propertyInfo.sqft}</div>
                <div className="text-xs text-gray-600">SqFt</div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="text-sm text-gray-600">Year Built: {propertyInfo.year}</div>
            </div>
            
            <div className="text-sm">
              <div className="font-bold mb-1">Features:</div>
              <ul className="list-disc pl-4">
                {propertyInfo.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Main component
export default function HouseModelViewer() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [houseType, setHouseType] = useState("modern");
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Handle model loading success
  const onModelLoaded = () => {
    setModelLoaded(true);
    console.log("3D model loaded successfully");
  };
  
  if (errorMessage) {
    return (
      <div className="h-full w-full rounded-lg flex items-center justify-center bg-gray-800">
        <div className="bg-red-900/50 text-white p-4 rounded-lg max-w-md text-center">
          <p>{errorMessage}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full rounded-lg overflow-hidden bg-gradient-to-b from-blue-100 to-sky-200 relative">
      {/* House type switcher */}
      <div className="absolute top-4 right-4 z-10 bg-white/70 backdrop-blur-sm rounded-full p-1 shadow-lg">
        <div className="flex text-sm">
          <button 
            className={`px-3 py-1 rounded-full transition-colors ${houseType === "modern" ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
            onClick={() => setHouseType("modern")}
          >
            Modern
          </button>
          <button 
            className={`px-3 py-1 rounded-full transition-colors ${houseType === "traditional" ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
            onClick={() => setHouseType("traditional")}
          >
            Traditional
          </button>
        </div>
      </div>
      
      {/* Success message when model is loaded */}
      {modelLoaded && (
        <div className="absolute top-4 left-4 z-10 bg-green-500/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          Model loaded successfully
        </div>
      )}
      
      {/* Using key to force re-mount of Canvas when house type changes to prevent context conflicts */}
      <Canvas 
        key={`house-canvas-${houseType}`}
        shadows 
        onCreated={(state) => {
          // Log the renderer initialization
          console.log("Canvas created with renderer:", state.gl.name);
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          logarithmicDepthBuffer: true, // Helps with z-fighting
        }}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <PerspectiveCamera makeDefault position={[10, 5, 10]} fov={30} />
          
          {/* Lighting setup for realistic rendering */}
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* The house with property info */}
          <HouseWithInfo 
            position={[0, -1, 0]} 
            scale={0.7} 
            houseType={houseType} 
            onModelLoaded={onModelLoaded}
          />
          
          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.01, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <shadowMaterial opacity={0.5} />
          </mesh>
          
          {/* Grassy ground material */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial 
              color={houseType === "modern" ? "#417E3A" : "#5d8f4f"}
              roughness={0.9}
              metalness={0}
            />
          </mesh>
          
          {/* Environment and controls */}
          <Environment preset={houseType === "modern" ? "sunset" : "park"} />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={5}
            maxDistance={20}
            makeDefault
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 bg-black/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        Hover over the house to see property details
      </div>
      
      {/* Loader for GLTF assets */}
      <Loader 
        containerStyles={{
          background: 'transparent',
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: 'auto',
          height: 'auto'
        }}
      />
    </div>
  );
}