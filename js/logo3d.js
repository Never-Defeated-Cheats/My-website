/* ==========================================================================
   CREATIVE VIBE - 3D BRAND LOGO ANIMATION & LOGO UPLOAD MANAGER
   ========================================================================== */

class Brand3DManager {
  constructor() {
    this.canvas = document.getElementById('brand3dCanvas');
    this.container = document.querySelector('.brand-3d-box');
    this.customImg = document.querySelector('.brand-custom-img');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mesh = null;
    this.mouse = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.animId = null;

    this.init();
  }

  init() {
    if (!this.canvas) return;

    // Check if custom logo is saved
    const profile = window.appData ? window.appData.getData().profile : null;
    if (profile && profile.customLogoUrl) {
      this.displayCustomLogo(profile.customLogoUrl);
    }

    if (window.THREE) {
      this.initThreeJS();
    } else {
      this.initCanvasFallback();
    }

    this.bindEvents();
  }

  initThreeJS() {
    const width = this.canvas.clientWidth || 44;
    const height = this.canvas.clientHeight || 44;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.z = 3.2;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create stylish 3D geometric video diamond/prism emblem
    const geometry = new THREE.IcosahedronGeometry(1.2, 0);
    
    // Shader or metallic material with nice calming blue/teal sheen
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b66f5,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0d9488,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    this.mesh = new THREE.Mesh(geometry, material);
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    this.mesh.add(wireMesh);

    this.scene.add(this.mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b66f5, 2.5, 50);
    pointLight1.position.set(2, 3, 4);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0d9488, 2.0, 50);
    pointLight2.position.set(-2, -3, 2);
    this.scene.add(pointLight2);

    this.animateThree();
  }

  animateThree() {
    this.animId = requestAnimationFrame(() => this.animateThree());

    if (this.mesh) {
      this.mesh.rotation.y += 0.015;
      this.mesh.rotation.x += 0.008;

      // Smooth mouse follow
      this.mesh.rotation.y += (this.targetRotation.y - this.mesh.rotation.y) * 0.05;
      this.mesh.rotation.x += (this.targetRotation.x - this.mesh.rotation.x) * 0.05;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  initCanvasFallback() {
    const ctx = this.canvas.getContext('2d');
    const width = this.canvas.width = 44;
    const height = this.canvas.height = 44;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(angle);

      // Draw modern gradient geometric camera aperture/diamond
      const grad = ctx.createLinearGradient(-15, -15, 15, 15);
      grad.addColorStop(0, '#3b66f5');
      grad.addColorStop(1, '#0d9488');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(14, 0);
      ctx.lineTo(0, 14);
      ctx.lineTo(-14, 0);
      ctx.closePath();
      ctx.fill();

      // Inner play triangle
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-3, -5);
      ctx.lineTo(5, 0);
      ctx.lineTo(-3, 5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      angle += 0.02;
      requestAnimationFrame(render);
    };

    render();
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.targetRotation.x = y * 2;
      this.targetRotation.y = x * 2;
    });

    this.container.addEventListener('mouseleave', () => {
      this.targetRotation.x = 0;
      this.targetRotation.y = 0;
    });

    this.container.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playPop();
    });
  }

  displayCustomLogo(url) {
    if (this.customImg && url) {
      this.customImg.src = url;
      this.customImg.style.display = 'block';
      if (this.canvas) this.canvas.style.display = 'none';
    }
  }

  removeCustomLogo() {
    if (this.customImg) {
      this.customImg.src = '';
      this.customImg.style.display = 'none';
      if (this.canvas) this.canvas.style.display = 'block';
    }
  }
}

window.initBrand3D = () => {
  window.brand3D = new Brand3DManager();
};
