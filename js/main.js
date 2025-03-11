// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('main-nav');
const prevModelBtn = document.getElementById('prev-model');
const nextModelBtn = document.getElementById('next-model');

// Wait for everything to load
window.addEventListener('load', () => {
    // Hide loading screen with animation
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize animations
    initAnimations();
});

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainNav.classList.add('nav-scrolled');
    } else {
        mainNav.classList.remove('nav-scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Three.js Scene
let scene, camera, renderer, stars = [];
let mouseX = 0, mouseY = 0;
let particleSystem;

function initThreeJS() {
    // Get the canvas element
    const canvas = document.getElementById('bg-canvas');
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    
    // Create stars
    createStars();
    
    // Create nebula particles
    createNebula();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    
    // Start animation loop
    animate();
}

function createStars() {
    // Create star geometry
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        transparent: true
    });
    
    // Create star positions
    const starVertices = [];
    for (let i = 0; i < 15000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    
    // Create star system
    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function createNebula() {
    // Create particles for nebula effect
    const particleCount = 5000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Color palette for nebula
    const palette = [
        new THREE.Color(0x8b5cf6), // Purple
        new THREE.Color(0x3b82f6), // Blue
        new THREE.Color(0xec4899), // Pink
        new THREE.Color(0x8b5cf6).lerp(new THREE.Color(0xffffff), 0.5) // Light purple
    ];
    
    // Create particles with positions and colors
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position in a cloud-like formation
        const radius = 100 + Math.random() * 150;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 50; // Offset y position
        positions[i3 + 2] = radius * Math.cos(phi) - 200; // Push back in z
        
        // Random color from palette
        const color = palette[Math.floor(Math.random() * palette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create particle material
    const particleMaterial = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate stars slowly
    stars.rotation.y += 0.0002;
    stars.rotation.z += 0.0001;
    
    // Move nebula based on mouse position
    if (particleSystem) {
        particleSystem.rotation.y += 0.0005;
        particleSystem.rotation.x = mouseY * 0.05;
        particleSystem.rotation.z = mouseX * 0.05;
    }
    
    // Subtle camera movement based on mouse
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.01;
    camera.position.y += (-mouseY * 5 - camera.position.y) * 0.01;
    
    // Render scene
    renderer.render(scene, camera);
}

// 3D Gallery
let galleryScene, galleryCamera, galleryRenderer;
let galleryModels = [];
let currentModelIndex = 0;
let galleryControls;

function initGallery() {
    const galleryContainer = document.getElementById('gallery-scene');
    
    // Create scene
    galleryScene = new THREE.Scene();
    galleryScene.background = new THREE.Color(0x0f172a);
    
    // Create camera
    galleryCamera = new THREE.PerspectiveCamera(75, galleryContainer.clientWidth / galleryContainer.clientHeight, 0.1, 1000);
    galleryCamera.position.z = 5;
    
    // Create renderer
    galleryRenderer = new THREE.WebGLRenderer({ antialias: true });
    galleryRenderer.setSize(galleryContainer.clientWidth, galleryContainer.clientHeight);
    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(galleryRenderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    galleryScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    galleryScene.add(directionalLight);
    
    // Create sample 3D objects for gallery
    createGalleryObjects();
    
    // Add controls
    galleryControls = new THREE.OrbitControls(galleryCamera, galleryRenderer.domElement);
    galleryControls.enableDamping = true;
    galleryControls.dampingFactor = 0.05;
    
    // Add event listeners for gallery navigation
    prevModelBtn.addEventListener('click', showPreviousModel);
    nextModelBtn.addEventListener('click', showNextModel);
    
    // Handle window resize
    window.addEventListener('resize', onGalleryResize);
    
    // Start animation
    animateGallery();
    
    // Show first model
    showModel(currentModelIndex);
}

function createGalleryObjects() {
    // Create some sample 3D objects for the gallery
    
    // Object 1: Torus Knot
    const geometry1 = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material1 = new THREE.MeshStandardMaterial({ 
        color: 0x8b5cf6,
        metalness: 0.7,
        roughness: 0.2
    });
    const torusKnot = new THREE.Mesh(geometry1, material1);
    
    // Object 2: Icosahedron
    const geometry2 = new THREE.IcosahedronGeometry(1.2, 1);
    const material2 = new THREE.MeshStandardMaterial({ 
        color: 0x3b82f6,
        metalness: 0.5,
        roughness: 0.4,
        wireframe: true
    });
    const icosahedron = new THREE.Mesh(geometry2, material2);
    
    // Object 3: Custom shape
    const geometry3 = new THREE.SphereGeometry(1, 32, 32);
    const material3 = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        metalness: 0.8,
        roughness: 0.2
    });
    const sphere = new THREE.Mesh(geometry3, material3);
    
    // Add objects to array
    galleryModels = [torusKnot, icosahedron, sphere];
}

function showModel(index) {
    // Remove current model from scene
    galleryScene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
            galleryScene.remove(child);
        }
    });
    
    // Add selected model to scene
    galleryScene.add(galleryModels[index]);
    
    // Reset controls
    galleryControls.reset();
}

function showNextModel() {
    currentModelIndex = (currentModelIndex + 1) % galleryModels.length;
    showModel(currentModelIndex);
}

function showPreviousModel() {
    currentModelIndex = (currentModelIndex - 1 + galleryModels.length) % galleryModels.length;
    showModel(currentModelIndex);
}

function onGalleryResize() {
    const galleryContainer = document.getElementById('gallery-scene');
    galleryCamera.aspect = galleryContainer.clientWidth / galleryContainer.clientHeight;
    galleryCamera.updateProjectionMatrix();
    galleryRenderer.setSize(galleryContainer.clientWidth, galleryContainer.clientHeight);
}

function animateGallery() {
    requestAnimationFrame(animateGallery);
    
    // Update controls
    galleryControls.update();
    
    // Rotate current model
    if (galleryScene.children.length > 0) {
        galleryScene.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                child.rotation.y += 0.005;
            }
        });
    }
    
    // Render scene
    galleryRenderer.render(galleryScene, galleryCamera);
}

// Animation on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.dimension-card, .section-title, .section-subtitle, .about-content, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize Three.js
initThreeJS();

// Initialize Gallery when the section is in view
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !galleryRenderer) {
            // Load OrbitControls
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
            script.onload = () => {
                initGallery();
            };
            document.head.appendChild(script);
            galleryObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

galleryObserver.observe(document.getElementById('gallery')); 