export const countdownShaders = {
    vertex: `
        varying vec2 vUv;
        varying float vTime;
        varying float vMaxTime;
        attribute float time;
        attribute float maxTime;
        attribute vec3 instanceColor;
        varying vec3 vColor;

        void main() {
            vUv = uv;
            vTime = time;
            vMaxTime = maxTime;
            vColor = instanceColor;
            
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    
    fragment: `
        varying vec2 vUv;
        varying float vTime;
        varying float vMaxTime;
        varying vec3 vColor;

        void main() {
            // Calculate distance from center
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            
            // Circle with smooth edges
            float circle = smoothstep(0.5, 0.48, dist);
            
            // Progress ring
            float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
            float normalizedAngle = angle * 0.15915494309; // 1/(2*PI)
            float progress = 1.0 - (vTime / vMaxTime);
            float ring = step(normalizedAngle, progress);
            
            // Ring thickness
            float ringThickness = smoothstep(0.5, 0.48, dist) - smoothstep(0.45, 0.43, dist);
            
            // Combine effects
            vec3 baseColor = vColor;
            vec3 ringColor = vec3(0.4, 0.4, 0.4);
            
            // Final color
            vec3 color = mix(ringColor, baseColor, circle * (1.0 - ringThickness));
            float alpha = max(circle * (1.0 - ringThickness), ringThickness * ring);
            
            gl_FragColor = vec4(color, alpha);
        }
    `
};