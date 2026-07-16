/**
 * cert-lightbox.js — Certificate Preview Engine.
 * Opens a fullscreen lightbox to preview and download certificates.
 * Loaded only on certifications.html — single responsibility, as the gods intended.
 */

'use strict';

/**
 * Opens the certificate lightbox.
 * @param {string} path  - Relative path to the certificate image.
 * @param {string} title - Display name for the certificate.
 */
function viewCert(path, title) {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    document.getElementById('cert-modal-title').textContent = title;
    document.getElementById('cert-modal-img').src           = path;
    document.getElementById('cert-modal-img').alt           = title;
    document.getElementById('cert-download').href           = path;
    document.getElementById('cert-download').download       = title;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

/** Closes the certificate lightbox and clears the image src. */
function closeCert() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.getElementById('cert-modal-img').src = '';
}

// ── Event Listeners ───────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCert();
});
