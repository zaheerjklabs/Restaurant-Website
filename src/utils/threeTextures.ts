import * as THREE from 'three';

/**
 * Creates a high-resolution procedural brushed gold texture with specular noise
 */
export function createGoldRimTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#FFE29F');
    grad.addColorStop(0.25, '#D4AF37');
    grad.addColorStop(0.5, '#FFF2C6');
    grad.addColorStop(0.75, '#AA771C');
    grad.addColorStop(1, '#FFDF78');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Fine brushed metal streaks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let i = 0; i < 500; i++) {
      const y = Math.random() * 512;
      ctx.fillRect(0, y, 512, Math.random() * 2);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Creates porcelain plate surface texture with fine gilded filigree accents
 */
export function createPorcelainPlateTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Ivory porcelain base with soft radial gradient
    const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 512);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.85, '#F9F8F5');
    grad.addColorStop(1, '#ECE8DF');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle concentric golden rings
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(512, 512, 480, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(512, 512, 465, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(233, 106, 36, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(512, 512, 320, 0, Math.PI * 2);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Creates realistic seared sea bass fillet texture with golden char marks and herbs
 */
export function createSearedFishTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Fresh pearlescent fish flesh
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#FCF6EE');
    grad.addColorStop(0.5, '#F5EDE0');
    grad.addColorStop(1, '#EFE4D2');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Diagonal hearth wood-fire grill marks
    ctx.strokeStyle = 'rgba(150, 65, 15, 0.65)';
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    for (let x = -200; x < 700; x += 110) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 240, 512);
      ctx.stroke();
    }

    // Secondary intense sear caramelized spots
    ctx.fillStyle = 'rgba(105, 40, 5, 0.45)';
    for (let i = 0; i < 40; i++) {
      const rx = 100 + Math.random() * 312;
      const ry = 100 + Math.random() * 312;
      const radius = 6 + Math.random() * 14;
      ctx.beginPath();
      ctx.arc(rx, ry, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Green herb / chive flecks
    ctx.fillStyle = '#2D5A27';
    for (let i = 0; i < 120; i++) {
      const hx = Math.random() * 512;
      const hy = Math.random() * 512;
      ctx.fillRect(hx, hy, 3 + Math.random() * 4, 2 + Math.random() * 3);
    }

    // Gold leaf shimmering particles
    ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
    for (let i = 0; i < 60; i++) {
      const gx = Math.random() * 512;
      const gy = Math.random() * 512;
      ctx.beginPath();
      ctx.arc(gx, gy, 2 + Math.random() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Creates luxury Grand Cru wine label texture with classical typography & gold stamp
 */
export function createWineLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Parchment antique paper background
    ctx.fillStyle = '#FAF7EE';
    ctx.fillRect(0, 0, 1024, 1024);

    // Gilded vintage double border
    ctx.strokeStyle = '#997A2F';
    ctx.lineWidth = 8;
    ctx.strokeRect(50, 50, 924, 924);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(66, 66, 892, 892);

    // Typography & Graphics
    ctx.textAlign = 'center';
    
    // Top crest / crown icon simulation
    ctx.fillStyle = '#B8860B';
    ctx.beginPath();
    ctx.arc(512, 170, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 24px "Times New Roman", serif';
    ctx.fillStyle = '#8B6508';
    ctx.letterSpacing = '8px';
    ctx.fillText('DOMAINE & CHÂTEAU', 512, 250);

    ctx.font = 'italic 700 68px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#1A1815';
    ctx.fillText('MAISON L\'AMBRE', 512, 350);

    ctx.font = '600 32px "Times New Roman", serif';
    ctx.fillStyle = '#A33319';
    ctx.fillText('GRAND CRU CLASSÉ', 512, 420);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 460);
    ctx.lineTo(674, 460);
    ctx.stroke();

    ctx.font = '400 28px "Georgia", serif';
    ctx.fillStyle = '#4A4742';
    ctx.fillText('APPELLATION MARGAUX CONTRÔLÉE', 512, 530);

    ctx.font = 'bold 110px "Playfair Display", serif';
    ctx.fillStyle = '#1F1D1A';
    ctx.fillText('2015', 512, 670);

    ctx.font = 'italic 26px "Georgia", serif';
    ctx.fillStyle = '#6E6B65';
    ctx.fillText('Vieilles Vignes · Élevé en Fûts de Chêne', 512, 740);

    ctx.font = '600 24px "Courier New", monospace';
    ctx.fillStyle = '#8C6C38';
    ctx.fillText('MIS EN BOUTEILLE AU DOMAINE · 750 ML · 13.5% VOL', 512, 830);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Creates soft glowing particle texture for embers and steam
 */
export function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 200, 100, 0.85)');
    grad.addColorStop(0.6, 'rgba(233, 106, 36, 0.4)');
    grad.addColorStop(1, 'rgba(233, 106, 36, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
