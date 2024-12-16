self.onmessage = ({ data }) => {
    const { particles, canvasWidth, canvasHeight, mouse, mode } = data;
    const updatedParticles = particles.map((particle) => {
        const distX = particle.x - mouse.x;
        const distY = particle.y - mouse.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const force = mode === 'subtle' ? 50 : 200;

        if (distance < force) {
            const angle = Math.atan2(distY, distX);
            const influence = mode === 'subtle' ? 0.5 : 2;
            particle.dx += Math.cos(angle) * influence;
            particle.dy += Math.sin(angle) * influence;
        }

        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.dx *= 0.95;
        particle.dy *= 0.95;

        particle.life--;
        if (particle.life <= 0) {
            particle.x = Math.random() * canvasWidth;
            particle.y = Math.random() * canvasHeight;
            particle.dx = Math.random() * 2 - 1;
            particle.dy = Math.random() * 2 - 1;
            particle.life = Math.random() * 100 + 50;
        }

        return particle;
    });

    self.postMessage(updatedParticles);
};