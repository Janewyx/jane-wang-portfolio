const dialog = document.querySelector('#figure-viewer');
if (dialog) {
let opener = null;

document.querySelectorAll('[data-figure]').forEach((button) => {
  button.addEventListener('click', () => {
    opener = button;
    const src = button.dataset.figure;
    const title = button.dataset.title || button.dataset.alt || 'Figure';
    document.querySelector('#viewer-title').textContent = title;
    const img = document.querySelector('#viewer-image');
    img.src = src;
    img.alt = title;
    const original = document.querySelector('#viewer-original');
    original.href = src;
    original.textContent = src.endsWith('.svg') ? 'Open original SVG ↗' : 'Open full-size figure ↗';
    dialog.showModal();
  });
});

document.querySelector('#viewer-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => opener?.focus());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

}
