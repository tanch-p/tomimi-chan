export const countdownShaders = {
    vertex: `
        attribute mat4 instanceMatrix;
        attribute float time;
        attribute float maxTime;
        attribute vec3 instanceColor;
        varying vec2 vUv;
        varying float vTime;
        varying float vMaxTime;
        varying vec3 vColor;
        // Constants for rendering digits
        const float DIGIT_WIDTH = 0.4;
        const float DIGIT_HEIGHT = 0.6;

        void main() {
            vUv = uv;
            vTime = time;
            vMaxTime = maxTime;
            vColor = instanceColor;
            vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragment: `
        varying vec2 vUv;
        varying float vTime;
        varying float vMaxTime;
        varying vec3 vColor;

        // SDF functions for digit rendering
        float sdBox(vec2 p, vec2 b) {
            vec2 d = abs(p) - b;
            return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
        }

        float sdSegment(vec2 p, vec2 a, vec2 b, float w) {
            vec2 pa = p - a, ba = b - a;
            float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
            return length(pa - ba * h) - w;
        }

        // Function to render a single digit using SDF
        float drawDigit(vec2 uv, float number) {
            float d = 1e6;
            float w = 0.12; // Increased segment width
            
            // Scale factor for bigger digits
            float scale = 1.5; // Increased from original size
            uv = uv * (1.0 / scale); // Scale the UV coordinates
            
            // Define digit segments positions with larger spacing
            vec2 c = vec2(0.0);
            vec2 s1 = vec2(-0.2, 0.35); // Increased spacing
            vec2 s2 = vec2(0.2, 0.35);
            vec2 s3 = vec2(-0.2, 0.0);
            vec2 s4 = vec2(0.2, 0.0);
            vec2 s5 = vec2(-0.2, -0.35);
            vec2 s6 = vec2(0.2, -0.35);

            // Draw segments based on number
            if (number < 0.5) { // 0
                d = min(d, sdSegment(uv, s1, s2, w));
                d = min(d, sdSegment(uv, s1, s5, w));
                d = min(d, sdSegment(uv, s2, s6, w));
                d = min(d, sdSegment(uv, s5, s6, w));
            } else if (number < 1.5) { // 1
                d = min(d, sdSegment(uv, s2, s6, w));
            } else if (number < 2.5) { // 2
                d = min(d, sdSegment(uv, s1, s2, w));
                d = min(d, sdSegment(uv, s2, s4, w));
                d = min(d, sdSegment(uv, s3, s5, w));
                d = min(d, sdSegment(uv, s5, s6, w));
            }
            // Add more numbers as needed...
            
            return smoothstep(0.015, 0.0, d); // Adjusted smoothstep for sharper edges
        }

        void main() {
            // Calculate base timer display
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            
            // Circle with smooth edges
            float circle = smoothstep(0.5, 0.48, dist);
            
            // Progress ring
            float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
            float normalizedAngle = angle * 0.15915494309;
            float progress = 1.0 - (vTime / vMaxTime);
            float ring = step(normalizedAngle, progress);
            
            // Ring thickness
            float ringThickness = smoothstep(0.5, 0.48, dist) - smoothstep(0.45, 0.43, dist);
            
            // Number rendering
            float number = ceil(vTime);
            vec2 digitUV = (vUv - vec2(0.5)) * 2.0;
            float digit = drawDigit(digitUV, mod(number, 10.0));
            
            // Combine effects
            vec3 baseColor = vColor;
            vec3 ringColor = vec3(0.4, 0.4, 0.4);
            vec3 digitColor = vec3(1.0);
            vec3 color = mix(ringColor, baseColor, circle * (1.0 - ringThickness));
            float alpha = max(circle * (1.0 - ringThickness), ringThickness * ring);
            
            // Add digit
            color = mix(color, digitColor, digit);
            alpha = max(alpha, digit);
            
            gl_FragColor = vec4(color, alpha);
        }
    `
};