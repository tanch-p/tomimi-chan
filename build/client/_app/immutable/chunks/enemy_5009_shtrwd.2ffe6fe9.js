const A="data:image/webp;base64,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";export{A as default};
