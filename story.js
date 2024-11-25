import * as THREE from 'three';

let scene, camera, renderer, book, pages, currentPage = 0;
const texts = [
  "Once upon a time, there was a boy who was happy with his life.",
  "But he didn't have many friends. He often felt lonely.",
  "One day, he discovered he might have a personality disorder.",
  "This made him sad. He doubted himself deeply.",
  "Eventually, he realized he didn't have a disorder, and he felt relieved.",
  "He learned to embrace his uniqueness and cherish life."
];

function init() {
  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  // Light
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Book model
  const bookGeometry = new THREE.BoxGeometry(2, 0.1, 3);
  const bookMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  book = new THREE.Mesh(bookGeometry, bookMaterial);
  scene.add(book);

  // Pages
  pages = [];
  for (let i = 0; i < texts.length; i++) {
    const pageGeometry = new THREE.PlaneGeometry(2, 3);
    const pageMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const page = new THREE.Mesh(pageGeometry, pageMaterial);
    page.position.set(0, 0.06 * (i + 1), 0.01 * (i + 1));
    page.rotation.y = Math.PI / 2;
    page.userData.text = texts[i];
    pages.push(page);
    book.add(page);
  }

  document.addEventListener('click', onPageClick);

  animate();
}

function onPageClick() {
  if (currentPage < pages.length) {
    const page = pages[currentPage];
    flipPage(page);
    showText(page.userData.text);
    currentPage++;
  }
}

function flipPage(page) {
  const startY = page.rotation.y;
  const endY = 0;
  let progress = 0;

  const animation = setInterval(() => {
    progress += 0.05;
    page.rotation.y = startY + progress * (endY - startY);

    if (progress >= 1) {
      clearInterval(animation);
    }
  }, 16);
}

function showText(text) {
  const textElement = document.createElement('div');
  textElement.className = 'story-text';
  textElement.innerText = text;
  document.body.appendChild(textElement);
  textElement.style.display = 'block';

  setTimeout(() => {
    textElement.style.display = 'none';
    document.body.removeChild(textElement);
  }, 4000);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.onload = init;
