// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('atomCanvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create nucleus
const nucleusGeometry = new THREE.SphereGeometry(2, 32, 32);
const nucleusMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
scene.add(nucleus);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
camera.add(pointLight);
scene.add(camera);

// Electron parameters
let electrons = [];
const electronMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

// Function to create electrons
function createElectrons(atomicNumber) {
  // Remove existing electrons
  electrons.forEach(electron => scene.remove(electron.mesh));
  electrons = [];

  // Define electron shell configuration (simplified)
  const shellConfig = [2, 8, 18, 32, 32, 18, 8]; // Maximum electrons per shell
  let remainingElectrons = atomicNumber;
  let shellRadius = 5;

  for (let i = 0; i < shellConfig.length && remainingElectrons > 0; i++) {
    const electronsInShell = Math.min(remainingElectrons, shellConfig[i]);
    const angleIncrement = (2 * Math.PI) / electronsInShell;

    for (let j = 0; j < electronsInShell; j++) {
      const angle = j * angleIncrement;
      const x = shellRadius * Math.cos(angle);
      const y = shellRadius * Math.sin(angle);
      const electronGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electron.position.set(x, y, 0);
      scene.add(electron);
      electrons.push({ mesh: electron, radius: shellRadius, angle: angle, speed: 0.02 + Math.random() * 0.01 });
    }

    remainingElectrons -= electronsInShell;
    shellRadius += 5;
  }
}

// Animate electrons
function animateElectrons() {
  electrons.forEach(electron => {
    electron.angle += electron.speed;
    const x = electron.radius * Math.cos(electron.angle);
    const y = electron.radius * Math.sin(electron.angle);
    electron.mesh.position.set(x, y, 0);
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  animateElectrons();
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle atom selection
const atomSelect = document.getElementById('atom-select');
atomSelect.addEventListener('change', () => {
  const atomicNumber = parseInt(atomSelect.value);
  createElectrons(atomicNumber);
});

// Initialize with default atom
createElectrons(parseInt(atomSelect.value));

// Handle split atom button
const splitButton = document.getElementById('split-atom');
const fissleButton = document.getElementById('fissle-atom');
const energyCounter = document.getElementById('energy-counter');
const radiationLevel = document.getElementById('radiation-level');
const dangerRadius = document.getElementById('danger-radius');

splitButton.addEventListener('click', () => {
  // Simulate fission: change nucleus color and show fissle button
  nucleus.material.color.set(0xffff00); // Yellow
  fissleButton.style.display = 'inline-block';
});

// Handle fissle atom button
fissleButton.addEventListener('click', () => {
  // Simulate explosion: remove nucleus and electrons
  scene.remove(nucleus);
  electrons.forEach(electron => scene.remove(electron.mesh));
  electrons = [];

  // Update fission info
  energyCounter.textContent = '200';
  radiationLevel.textContent = '500';
  dangerRadius.textContent = '1000';

  fissleButton.style.display = 'none';
});
