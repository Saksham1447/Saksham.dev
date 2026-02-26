'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Character3D = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const actionsRef = useRef({});
  
  // Cursor tracking
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  
  // Scroll tracking
  const scrollProgressRef = useRef(0);
  const isTypingRef = useRef(false);
  const typingTimeoutRef = useRef(null);

  // Lerp function
  const lerp = (a, b, t) => a + (b - a) * t;

  // Clamp function
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  useEffect(() => {
    if (!containerRef.current) return;

    // ==================== SCENE SETUP ====================
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f1e);
    scene.fog = new THREE.Fog(0x0f0f1e, 100, 1000);
    sceneRef.current = scene;

    // ==================== CAMERA SETUP ====================
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 3);
    camera.lookAt(0, 1, 0);
    cameraRef.current = camera;

    // ==================== RENDERER SETUP ====================
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ==================== LIGHTING SETUP ====================
    // Hemisphere Light (ambient)
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x666666, 1.5);
    scene.add(hemisphereLight);

    // Directional Light (key light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 8, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);

    // Accent Light (fill light)
    const accentLight = new THREE.DirectionalLight(0x9d4edd, 0.8);
    accentLight.position.set(-5, 4, 3);
    scene.add(accentLight);

    // Point light for extra visibility
    const pointLight = new THREE.PointLight(0x9d4edd, 0.6);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // ==================== GROUND PLANE ====================
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // ==================== PLACEHOLDER GEOMETRY ====================
    function createPlaceholder(scene) {
      const group = new THREE.Group();

      // Head
      const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
      const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xd4a574,
        metalness: 0.3,
        roughness: 0.6,
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 1.6;
      head.castShadow = true;
      head.receiveShadow = true;
      group.add(head);

      // Body
      const bodyGeometry = new THREE.BoxGeometry(0.6, 1, 0.35);
      const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3a4a6a,
        metalness: 0.1,
        roughness: 0.7,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.9;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      // Left Arm
      const armGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.2);
      const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xd4a574,
        metalness: 0.2,
        roughness: 0.6,
      });
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-0.45, 1.1, 0);
      leftArm.castShadow = true;
      leftArm.receiveShadow = true;
      group.add(leftArm);

      // Right Arm
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(0.45, 1.1, 0);
      rightArm.castShadow = true;
      rightArm.receiveShadow = true;
      group.add(rightArm);

      // Desk/Table
      const deskGeometry = new THREE.BoxGeometry(2, 0.15, 1);
      const deskMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a3a,
        metalness: 0.4,
        roughness: 0.5,
      });
      const desk = new THREE.Mesh(deskGeometry, deskMaterial);
      desk.position.set(0, 0.25, 0.5);
      desk.castShadow = true;
      desk.receiveShadow = true;
      group.add(desk);

      // Laptop on desk
      const laptopGeometry = new THREE.BoxGeometry(0.8, 0.02, 0.5);
      const laptopMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a2a,
        metalness: 0.8,
        roughness: 0.2,
      });
      const laptop = new THREE.Mesh(laptopGeometry, laptopMaterial);
      laptop.position.set(0.2, 0.45, 0.5);
      laptop.castShadow = true;
      laptop.receiveShadow = true;
      group.add(laptop);

      group.scale.set(1.2, 1.2, 1.2);
      scene.add(group);
      modelRef.current = group;
    }

    // ==================== MODEL LOADING ====================
    const loader = new GLTFLoader();
    let loadedModel = null;
    let modelLoadAttempted = false;

    // Try to load model - will fallback to placeholder if not found
    const loadModel = () => {
      loader.load(
        '/models/character.glb',
        (gltf) => {
          loadedModel = gltf.scene;
          loadedModel.position.set(0, 0, 0);
          loadedModel.scale.set(1, 1, 1);

          // Setup shadows
          loadedModel.traverse((node) => {
            if (node.isMesh) {
              node.castShadow = true;
              node.receiveShadow = true;
            }
          });

          scene.add(loadedModel);
          modelRef.current = loadedModel;

          // ==================== ANIMATION MIXER ====================
          const mixer = new THREE.AnimationMixer(loadedModel);
          mixerRef.current = mixer;

          // Cache available animations
          if (gltf.animations && gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
              actionsRef.current[clip.name] = mixer.clipAction(clip);
            });
          }

          // Auto-play idle animation if available
          const idleAction = Object.values(actionsRef.current)[0];
          if (idleAction) {
            idleAction.play();
          }
        },
        undefined,
        (error) => {
          // Model not found - create placeholder instead
          if (!modelLoadAttempted) {
            modelLoadAttempted = true;
            createPlaceholder(scene);
          }
        }
      );
    };

    // Start model loading
    loadModel();

    // ==================== MOUSE TRACKING ====================
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Calculate target rotation based on cursor position
      targetRotationRef.current.y = mouseRef.current.x * 0.5; // Clamp to ±0.5 radians
      targetRotationRef.current.x = mouseRef.current.y * 0.3; // Clamp to ±0.3 radians
    };

    // ==================== SCROLL TRACKING ====================
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      scrollProgressRef.current = window.scrollY / documentHeight;

      // Trigger typing animation
      isTypingRef.current = true;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        isTypingRef.current = false;
      }, 1500);

      // Update animation time if mixer exists
      if (mixerRef.current && actionsRef.current) {
        const typingAction = Object.values(actionsRef.current).find(
          (action) => action.getClip().name.toLowerCase().includes('typ')
        );

        if (typingAction) {
          const animationDuration = typingAction.getClip().duration;
          typingAction.time = (scrollProgressRef.current % 1) * animationDuration;
        }
      }
    };

    // ==================== ANIMATION LOOP ====================
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Update mixer
      if (mixerRef.current) {
        mixerRef.current.update(delta * 0.5); // Slow down animations slightly
      }

      // Smooth head rotation (lerp)
      if (modelRef.current) {
        currentRotationRef.current.x = lerp(
          currentRotationRef.current.x,
          targetRotationRef.current.x,
          0.1
        );
        currentRotationRef.current.y = lerp(
          currentRotationRef.current.y,
          targetRotationRef.current.y,
          0.1
        );

        // Apply rotation to head if it exists
        const head = modelRef.current.getObjectByName('Head') ||
                     modelRef.current.getObjectByName('Armature.001') ||
                     modelRef.current.children[0];

        if (head) {
          head.rotation.x = clamp(currentRotationRef.current.x, -0.5, 0.5);
          head.rotation.y = clamp(currentRotationRef.current.y, -0.8, 0.8);
        }

        // Slight body rotation based on scroll
        modelRef.current.rotation.z = (scrollProgressRef.current - 0.5) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ==================== EVENT LISTENERS ====================
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);

    // ==================== WINDOW RESIZE ====================
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // ==================== CLEANUP ====================
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#a855f7',
          fontSize: '14px',
          opacity: 0.5,
          zIndex: 10,
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        <p>Move your cursor to interact with the character</p>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          Scroll to trigger animation
        </p>
      </div>
    </div>
  );
};

export default Character3D;
