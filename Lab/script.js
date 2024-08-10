let renderer,
    scene,
    camera,
    sphereBg,
    nucleus,
    stars,
    controls,
    container = document.getElementById("canvas_container"),
    timeout_Debounce,
    noise = new SimplexNoise(),
    cameraSpeed = 0,
    blobScale = 3;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 0, 230);

    const directionalLight = new THREE.DirectionalLight("#fff", 2);
    directionalLight.position.set(0, 50, -20);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1);
    ambientLight.position.set(0, 20, 20);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Initialize OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;
    controls.maxDistance = 350;
    controls.minDistance = 150;
    controls.enablePan = false;

    const loader = new THREE.TextureLoader();
    const textureSphereBg = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
    const texturenucleus = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
    const textureStar = loader.load("https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png");
    const texture1 = loader.load("https://i.ibb.co/F8by6wW/p2-b3gnym.png");  
    const texture2 = loader.load("https://i.ibb.co/yYS2yx5/p3-ttfn70.png");
    const texture4 = loader.load("https://i.ibb.co/yWfKkHh/p4-avirap.png");

    // Nucleus
    texturenucleus.anisotropy = 16;
    const icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
    const lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
    nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    scene.add(nucleus);

    // Sphere Background
    textureSphereBg.anisotropy = 16;
    const geometrySphereBg = new THREE.SphereBufferGeometry(150, 40, 40);
    const materialSphereBg = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: textureSphereBg,
    });
    sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
    scene.add(sphereBg);

    // Moving Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = [];
    for (let i = 0; i < 50; i++) {
        const particleStar = randomPointSphere(150); 
        starsPositions.push(particleStar.x, particleStar.y, particleStar.z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
        size: 5,
        color: "#ffffff",
        transparent: true,
        opacity: 0.8,
        map: textureStar,
        blending: THREE.AdditiveBlending,
    });
    starsMaterial.depthWrite = false;  
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Fixed Stars
    function createStars(texture, size, total) {
        const pointGeometry = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 0; i < total; i++) {
            const radius = THREE.MathUtils.randInt(70, 150); 
            const particles = randomPointSphere(radius);
            positions.push(particles.x, particles.y, particles.z);
        }
        pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        const pointMaterial = new THREE.PointsMaterial({
            size: size,
            map: texture,
            blending: THREE.AdditiveBlending,                      
        });

        return new THREE.Points(pointGeometry, pointMaterial);
    }

    scene.add(createStars(texture1, 15, 20));   
    scene.add(createStars(texture2, 5, 5));
    scene.add(createStars(texture4, 7, 5));

    function randomPointSphere(radius) {
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const dx = radius * Math.sin(phi) * Math.cos(theta);
        const dy = radius * Math.sin(phi) * Math.sin(theta);
        const dz = radius * Math.cos(phi);
        return new THREE.Vector3(dx, dy, dz);
    }
}

function animate() {
    // Stars Animation
    const starsPositions = stars.geometry.attributes.position.array;
    for (let i = 0; i < starsPositions.length; i += 3) {
        const x = starsPositions[i];
        const y = starsPositions[i + 1];
        const z = starsPositions[i + 2];
        starsPositions[i] += (0 - x) / 100; // Example value for velocity
        starsPositions[i + 1] += (0 - y) / 100;
        starsPositions[i + 2] += (0 - z) / 100;

        if (Math.abs(x) <= 5 && Math.abs(y) <= 5 && Math.abs(z) <= 5) {
            starsPositions[i] = x;
            starsPositions[i + 1] = y;
            starsPositions[i + 2] = z;
        }
    }
    stars.geometry.attributes.position.needsUpdate = true;

    // Nucleus Animation
    const nucleusVertices = nucleus.geometry.attributes.position.array;
    const time = Date.now();
    for (let i = 0; i < nucleusVertices.length; i += 3) {
        const x = nucleusVertices[i];
        const y = nucleusVertices[i + 1];
        const z = nucleusVertices[i + 2];
        const v = new THREE.Vector3(x, y, z).normalize();
        const distance = nucleus.geometry.parameters.radius + noise.noise3D(
            x + time * 0.0005,
            y + time * 0.0003,
            z + time * 0.0008
        ) * blobScale;
        nucleusVertices[i] = v.x * distance;
        nucleusVertices[i + 1] = v.y * distance;
        nucleusVertices[i + 2] = v.z * distance;
    }
    nucleus.geometry.attributes.position.needsUpdate = true;
    nucleus.geometry.computeVertexNormals();
    nucleus.geometry.computeFaceNormals();
    nucleus.rotation.y += 0.002;

    // Sphere Background Animation
    sphereBg.rotation.x += 0.002;
    sphereBg.rotation.y += 0.002;
    sphereBg.rotation.z += 0.002;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

/* Resize */
window.addEventListener("resize", () => {
    clearTimeout(timeout_Debounce);
    timeout_Debounce = setTimeout(onWindowResize, 80);
});

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}
