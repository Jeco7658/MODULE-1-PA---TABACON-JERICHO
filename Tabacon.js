const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 15);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// FLOOR
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0xe0e0e0 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// WALLS
const wallHeight = 10;
const wallThickness = 0.5;
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });

// Back Wall
const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(20, wallHeight, wallThickness),
  wallMaterial
);
backWall.position.set(0, wallHeight / 2 - 0.5, -10);
backWall.receiveShadow = true;
scene.add(backWall);

// WINDOW 
const windowWidth = 8;
const windowHeight = 6;
const windowY = 5; 
const windowZ = -9.74; 

// Glass pane
const windowGlass = new THREE.Mesh(
  new THREE.BoxGeometry(windowWidth, windowHeight, 0.1),
  new THREE.MeshStandardMaterial({
    color: 0x87ceeb,
    transparent: true,
    opacity: 0.5
  })
);
windowGlass.position.set(0, windowY, windowZ);
windowGlass.castShadow = false;
scene.add(windowGlass);

// window frame
const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const frameThickness = 0.15;

// Top frame
const windowFrameTop = new THREE.Mesh(
  new THREE.BoxGeometry(windowWidth + frameThickness, frameThickness, frameThickness),
  frameMaterial
);
windowFrameTop.position.set(0, windowY + windowHeight / 2, windowZ);
scene.add(windowFrameTop);

// Bottom frame
const windowFrameBottom = windowFrameTop.clone();
windowFrameBottom.position.set(0, windowY - windowHeight / 2, windowZ);
scene.add(windowFrameBottom);

// Left frame
const windowFrameLeft = new THREE.Mesh(
  new THREE.BoxGeometry(frameThickness, windowHeight, frameThickness),
  frameMaterial
);
windowFrameLeft.position.set(-windowWidth / 2, windowY, windowZ);
scene.add(windowFrameLeft);

// Right frame
const windowFrameRight = windowFrameLeft.clone();
windowFrameRight.position.set(windowWidth / 2, windowY, windowZ);
scene.add(windowFrameRight);


// Left Wall
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallThickness, wallHeight, 20),
  wallMaterial
);
leftWall.position.set(-10, wallHeight / 2 - 0.5, 0);
leftWall.receiveShadow = true;
scene.add(leftWall);

// Right Wall
const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallThickness, wallHeight, 20),
  wallMaterial
);
rightWall.position.set(10, wallHeight / 2 - 0.5, 0);
rightWall.receiveShadow = true;
scene.add(rightWall);

// BED
const bedY = 1;
const bedFrame = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.5, 7),
  new THREE.MeshStandardMaterial({ color: 0x444444 })
);
bedFrame.position.set(-5, bedY, 1.7);
bedFrame.castShadow = true;
scene.add(bedFrame);

const mattress = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.6, 7),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
mattress.position.set(-5, bedY + 0.55, 1.8);
mattress.castShadow = true;
scene.add(mattress);

const headboard = new THREE.Mesh(
  new THREE.BoxGeometry(6, 2, 0.3),
  new THREE.MeshStandardMaterial({ color: 0x444444 })
);
headboard.position.set(-5, bedY + 1.25, -1.65);
headboard.castShadow = true;
scene.add(headboard);

// Bed legs
const bedLegOffsets = [
  [-2.5, -3], [2.5, -3],
  [-2.5, 3], [2.5, 3]
];
bedLegOffsets.forEach(offset => {
  const leg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 1, 16),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  leg.position.set(bedFrame.position.x + offset[0], bedY - 0.5, bedFrame.position.z + offset[1]);
  leg.castShadow = true;
  scene.add(leg);
});

// Pillows
const pillow1 = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.4, 0.8),
  new THREE.MeshStandardMaterial({ color: 0x808080 })
);
pillow1.position.set(-6, bedY + 0.9, -0.5);
pillow1.castShadow = true;
scene.add(pillow1);

const pillow2 = pillow1.clone();
pillow2.position.set(-4, bedY + 0.9, -0.5);
scene.add(pillow2);


// STUDY AREA
const tableY = 1;
const tableTop = new THREE.Mesh(
  new THREE.BoxGeometry(4, 0.3, 2),
  new THREE.MeshStandardMaterial({ color: 0xf5f5f5 })
);
tableTop.position.set(5, tableY, -2);
tableTop.castShadow = true;
scene.add(tableTop);

const tableLegOffsets = [
  [-1.8, -0.8], [1.8, -0.8],
  [-1.8, 0.8], [1.8, 0.8]
];
tableLegOffsets.forEach(offset => {
  const leg = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 2, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  leg.position.set(tableTop.position.x + offset[0], tableY - 1, tableTop.position.z + offset[1]);
  leg.castShadow = true;
  scene.add(leg);
});

// Monitor
const monitorScreen = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.2, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x000000 })
);
monitorScreen.position.set(5, tableY + 1, -2.8);
monitorScreen.castShadow = true;
scene.add(monitorScreen);

const monitorStand = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.6, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x000000 })
);
monitorStand.position.set(5, tableY + 0.3, -2.3);
monitorStand.castShadow = true;
scene.add(monitorStand);

// CHAIR 
const chairY = 0.5;
const chairSeat = new THREE.Mesh(
  new THREE.BoxGeometry(1.8, 0.3, 1.8),
  new THREE.MeshStandardMaterial({ color: 0x808080 })
);
chairSeat.position.set(5, chairY, 2.5);
chairSeat.castShadow = true;
scene.add(chairSeat);

const chairBack = new THREE.Mesh(
  new THREE.BoxGeometry(1.8, 1.5, 0.3),
  new THREE.MeshStandardMaterial({ color: 0x808080 })
);
chairBack.position.set(5, chairY + 0.75, 3.4);
chairBack.castShadow = true;
scene.add(chairBack);

// Chair legs
const chairLegOffsets = [
  [-0.8, -0.8], [0.8, -0.8],
  [-0.8, 0.8], [0.8, 0.8]
];
chairLegOffsets.forEach(offset => {
  const leg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 1, 16),
    new THREE.MeshStandardMaterial({ color: 0x555555 })
  );
  leg.position.set(chairSeat.position.x + offset[0], chairY - 0.5, chairSeat.position.z + offset[1]);
  leg.castShadow = true;
  scene.add(leg);
});

// RESIZE HANDLER
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
