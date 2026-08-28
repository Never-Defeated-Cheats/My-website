/* ==========================================================================
   CREATIVE VIBE - ZERO-CPU/GPU EFFICIENT 3D BRAND LOGO
   On-Demand WebGL Rendering Engine:
   Renders statically on load; only animates on mouse interaction.
   0% Idle CPU & 0% Idle GPU Overhead.
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
    this.isHovered = false;
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
      antialias: true,
      powerPreference: "low-power"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Create stylish 3D geometric video diamond emblem
    const geometry = new THREE.IcosahedronGeometry(1.2, 0);
    
    const material = new THREE.MeshStandardMaterial({
      color: 0x537568,
      metalness: 0.7,
      roughness: 0.3
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x7ae7f9,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    this.mesh = new THREE.Mesh(geometry, material);
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    this.mesh.add(wireMesh);

    this.scene.add(this.mesh);

    // Subtle lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x537568, 2.0, 50);
    pointLight.position.set(2, 3, 4);
    this.scene.add(pointLight);

    // Initial single render (0% CPU background cost)
    this.renderSingleFrame();
  }

  renderSingleFrame() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  startInteractiveLoop() {
    if (this.animId) return;

    const loop = () => {
      if (!this.isHovered) {
        this.animId = null;
        return;
      }

      if (this.mesh) {
        this.mesh.rotation.y += 0.02;
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += (this.targetRotation.y - this.mesh.rotation.y) * 0.1;
        this.mesh.rotation.x += (this.targetRotation.x - this.mesh.rotation.x) * 0.1;
      }

      this.renderSingleFrame();
      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);
  }

  initCanvasFallback() {
    const ctx = this.canvas.getContext('2d');
    const width = this.canvas.width = 44;
    const height = this.canvas.height = 44;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);

    const grad = ctx.createLinearGradient(-15, -15, 15, 15);
    grad.addColorStop(0, '#537568');
    grad.addColorStop(1, '#7ae7f9');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(14, 0);
    ctx.lineTo(0, 14);
    ctx.lineTo(-14, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-3, -5);
    ctx.lineTo(5, 0);
    ctx.lineTo(-3, 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.startInteractiveLoop();
      if (window.soundFX) window.soundFX.playHover();
    });

    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.targetRotation.x = y * 2;
      this.targetRotation.y = x * 2;
      if (!this.animId) this.startInteractiveLoop();
    });

    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.targetRotation.x = 0;
      this.targetRotation.y = 0;
      setTimeout(() => this.renderSingleFrame(), 100);
    });

    this.container.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playPop();
    });
  }

  displayCustomLogo(url) {
    if (this.customImg) {
      this.customImg.src = url;
      this.customImg.style.display = 'block';
      if (this.canvas) this.canvas.style.display = 'none';
    }
  }
}

window.initBrand3D = () => {
  window.brand3DManager = new Brand3DManager();
};
