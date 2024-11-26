// Initialize Fabric.js canvas
const canvas = new fabric.Canvas('designCanvas', {
    backgroundColor: '#ffffff',
    preserveObjectStacking: true
});

// Add Text
document.getElementById('addText').addEventListener('click', () => {
    const text = new fabric.Textbox('Your Text Here', {
        left: 50,
        top: 50,
        fontSize: 24,
        fill: '#333',
    });
    canvas.add(text).setActiveObject(text);
});

// Upload Image
document.getElementById('uploadImage').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            fabric.Image.fromURL(event.target.result, (img) => {
                img.scaleToWidth(200);
                canvas.add(img).setActiveObject(img);
            });
        };
        reader.readAsDataURL(file);
    };
    input.click();
});

// Preview in 3D
document.getElementById('preview3D').addEventListener('click', () => {
    const previewContainer = document.getElementById('preview3DContainer');
    previewContainer.innerHTML = ''; // Clear previous 3D preview

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    previewContainer.appendChild(renderer.domElement);

    // Create a 3D object (e.g., a T-shirt)
    const geometry = new THREE.BoxGeometry(1, 1.5, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const shirt = new THREE.Mesh(geometry, material);
    scene.add(shirt);

    camera.position.z = 5;

    // Animation loop
    const animate = function () {
        requestAnimationFrame(animate);
        shirt.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    animate();
});
