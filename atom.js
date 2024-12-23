// Grab the canvas and create renderer
const canvas = document.querySelector("#atomCanvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a scene, camera, and controls
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020); // Neutral dark background
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting setup
const light = new THREE.PointLight(0xffffff, 1, 0);
light.position.set(50, 50, 50);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
scene.add(ambientLight);

// Atom parts and state
const nucleusMaterial = new THREE.MeshPhongMaterial({ color: 0xff5733 });
const electronMaterial = new THREE.MeshPhongMaterial({ color: 0x1e90ff });
let nucleus;
const electronGroups = [];
let highlightedObject = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Helper functions to create atom components
function createNucleus(size) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    return new THREE.Mesh(geometry, nucleusMaterial);
}

function createElectronRings(atomicNumber) {
    const electronShells = [2, 8, 18, 32]; // Electron shell distribution
    let electronsRemaining = atomicNumber;
    const orbits = [];

    electronShells.forEach((maxElectrons, shellIndex) => {
        if (electronsRemaining <= 0) return;

        const numElectrons = Math.min(maxElectrons, electronsRemaining);
        const group = new THREE.Group();
        const radius = 10 + shellIndex * 10;

        for (let i = 0; i < numElectrons; i++) {
            const angle = (i / numElectrons) * Math.PI * 2;
            const electron = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), electronMaterial);
            electron.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
            group.add(electron);
        }

        group.rotation.x = Math.random() * Math.PI;
        group.rotation.y = Math.random() * Math.PI;
        orbits.push(group);
        scene.add(group);
        electronsRemaining -= numElectrons;
    });

    return orbits;
}

function resetAtom(atomicNumber) {
    // Clear existing atom
    if (nucleus) scene.remove(nucleus);
    electronGroups.forEach(group => scene.remove(group));
    electronGroups.length = 0;

    // Create nucleus
    const nucleusSize = Math.log(atomicNumber + 1) * 3;
    nucleus = createNucleus(nucleusSize);
    scene.add(nucleus);

    // Create electrons
    const newElectronGroups = createElectronRings(atomicNumber);
    electronGroups.push(...newElectronGroups);
}

// Initial atom setup
resetAtom(1);

// Animate the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the nucleus and electron groups
    if (nucleus) nucleus.rotation.y += 0.01;
    electronGroups.forEach(group => group.rotation.y += 0.02);

    controls.update();
    renderer.render(scene, camera);
}

animate();

// Handle atom selection
document.getElementById("atom-select").addEventListener("change", e => {
    const atomicNumber = Number(e.target.value);
    resetAtom(atomicNumber);
});

// Handle mouse movement for raycasting
function onMouseMove(event) {
    // Convert mouse coordinates to normalized device coordinates (-1 to +1) for both axes
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster's picking ray based on the mouse coordinates
    raycaster.ray.origin.copy(camera.position);
    raycaster.ray.direction.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize();

    // Find intersected objects
    const intersects = raycaster.intersectObjects([nucleus, ...electronGroups.flat()]);

    // If there is an intersection, highlight the object and show info
    if (intersects.length > 0) {
        const object = intersects[0].object;

        // If a new object is highlighted, remove the old highlight
        if (highlightedObject !== object) {
            if (highlightedObject) {
                highlightedObject.material.emissive.setHex(0x000000); // Reset the emissive color
            }

            highlightedObject = object;
            highlightedObject.material.emissive.setHex(0xffffff); // Set emissive color to white (highlight)

            showInfo(object); // Show information based on the object
        }
    } else {
        // No intersection, reset the highlight and hide info
        if (highlightedObject) {
            highlightedObject.material.emissive.setHex(0x000000); // Reset highlight
            highlightedObject = null;
        }
        hideInfo();
    }
}

// Display information about the hovered atom part
function showInfo(object) {
    const infoBox = document.getElementById("fission-info");
    const infoText = document.getElementById("energy-counter");
    const infoRadiation = document.getElementById("radiation-level");
    const infoRadius = document.getElementById("danger-radius");

    // Update info box content based on the object
    if (object === nucleus) {
        infoBox.style.display = "block";
        infoText.innerText = "Nucleus: Contains protons and neutrons.";
        infoRadiation.innerText = "Stable";
        infoRadius.innerText = "Radius of the nucleus.";
    } else if (object.material === electronMaterial) {
        infoBox.style.display = "block";
        infoText.innerText = "Electron: Negatively charged particle.";
        infoRadiation.innerText = "Non-radiative";
        infoRadius.innerText = "Electrons orbit around nucleus.";
    }
}

// Hide the information box
function hideInfo() {
    document.getElementById("fission-info").style.display = "none";
}

// Event listener for mouse movement
window.addEventListener("mousemove", onMouseMove, false);

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
