import * as THREE from 'three';

class SDFFontAtlas {
	constructor(fontFile, options = {}) {
		this.options = {
			fontSize: 64,
			charset: '0123456789',
			buffer: 4,
			...options
		};

		this.fontFile = fontFile;
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.texture = null;
		this.charMap = {};
	}

	load() {
		return new Promise<{ texture: THREE.Texture; charMap: Record<string, any> }>(
			(resolve, reject) => {
				const font = new FontFace('NotoSansMono', `url(${this.fontFile})`);

				font
					.load()
					.then(() => {
						try {
							document.fonts.add(font);

							// Calculate the closest power-of-two square size
							const charSize = this.options.fontSize;
							const charsPerRow = Math.floor(Math.sqrt(this.options.charset.length));
							const totalSize = charsPerRow * charSize;

							// Make sure the size is a power of two
							const squareSize = Math.pow(2, Math.ceil(Math.log2(totalSize)));

							this.canvas.width = squareSize;
							this.canvas.height = squareSize;
							this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

							this.ctx.font = `${this.options.fontSize}px NotoSansMono`;
							this.ctx.fillStyle = 'white';
							this.ctx.textBaseline = 'top';

							this.options.charset.split('').forEach((char, index) => {
								const row = Math.floor(index / charsPerRow);
								const col = index % charsPerRow;

								const x = col * charSize;
								const y = row * charSize;

								this.ctx.fillText(char, x, y);

								this.charMap[char] = {
									x: x / squareSize,
									y: 1.0 - (y + charSize) / squareSize, // Flip Y coordinate for top of character
									width: charSize / squareSize,
									height: charSize / squareSize
								};
								
							});
							this.texture = new THREE.CanvasTexture(this.canvas);
							this.texture.colorSpace = THREE.SRGBColorSpace;
							this.texture.magFilter = THREE.LinearFilter;
							this.texture.minFilter = THREE.LinearFilter;
							this.texture.transparent = true;

							// this.saveCanvasToImage();
							resolve({
								texture: this.texture,
								charMap: this.charMap
							});
						} catch (error) {
							reject(error);
						}
					})
					.catch(reject);
			}
		);
	}
	saveCanvasToImage() {
		const link = document.createElement('a');
		link.download = 'font-atlas.png';
		link.href = this.canvas.toDataURL();
		link.click();
	}
}

export default SDFFontAtlas;
