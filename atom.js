// === Setup Scene ===
const canvas = document.getElementById('atomCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 60;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// === Lights ===
scene.add(new THREE.AmbientLight(0x404040, 2));
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// === Materials ===
const protonMaterial = new THREE.MeshPhongMaterial({ color: 0xff4c4c });
const neutronMaterial = new THREE.MeshPhongMaterial({ color: 0x4c4cff });
const electronMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });

// === Atom Components ===
let nucleusGroup = new THREE.Group();
let electronShells = [];
scene.add(nucleusGroup);

// === Create Nucleus ===
function createNucleus(atomicNumber) {
    const protonCount = atomicNumber;
    const neutronCount = Math.round(protonCount * 1.3); // Approximation

    const totalParticles = protonCount + neutronCount;
    const particleSize = 1.5;

    nucleusGroup.clear();

    for (let i = 0; i < totalParticles; i++) {
        const material = i < protonCount ? protonMaterial : neutronMaterial;
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(particleSize, 16, 16), material);
        mesh.position.set(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
        );
        nucleusGroup.add(mesh);
    }
}

// === Create Electron Shells ===
function createElectronShells(atomicNumber) {
    electronShells.forEach(shell => scene.remove(shell.group));
    electronShells = [];

    const shellConfig = [2, 8, 18, 32, 32, 18, 8];
    let electronsLeft = atomicNumber;

    for (let i = 0; i < shellConfig.length && electronsLeft > 0; i++) {
        const electronsInShell = Math.min(electronsLeft, shellConfig[i]);
        const radius = 10 + i * 6;
        const group = new THREE.Group();

        for (let j = 0; j < electronsInShell; j++) {
            const angle = (j / electronsInShell) * Math.PI * 2;
            const electron = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), electronMaterial);
            electron.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
            group.add(electron);
        }

        scene.add(group);
        electronShells.push({ group, speed: 0.01 + i * 0.005 });
        electronsLeft -= electronsInShell;
    }
}

// === Reset Atom ===
function resetAtom(atomicNumber) {
    createNucleus(atomicNumber);
    createElectronShells(atomicNumber);
}

resetAtom(1);

// === Animate Scene ===
function animate() {
    requestAnimationFrame(animate);

    // Rotate the nucleus subtly
    nucleusGroup.rotation.x += 0.005;
    nucleusGroup.rotation.y += 0.005;

    // Rotate each electron shell
    electronShells.forEach(({ group, speed }) => {
        group.rotation.y += speed;
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

// === Handle Atom Select ===
document.getElementById("atom-select").addEventListener("change", e => {
    resetAtom(Number(e.target.value));
});

// === Resize ===
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
