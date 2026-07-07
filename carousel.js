document.addEventListener('DOMContentLoaded', () => {
    // --- MAIN SLIDER LOGIC ---
    const mainInput = document.getElementById('main-input');
    const mainPill = document.getElementById('main-pill');
    const mainLabelL = document.getElementById('main-label-l');
    const mainLabelR = document.getElementById('main-label-r');
    const viewAbout = document.getElementById('view-about');
    const viewProjects = document.getElementById('view-projects');

    let isMainDragging = false;

    // Detect true dragging vs clicking
    mainInput.addEventListener('mousedown', () => isMainDragging = false);
    mainInput.addEventListener('mousemove', () => isMainDragging = true);
    mainInput.addEventListener('touchstart', () => isMainDragging = false);
    mainInput.addEventListener('touchmove', () => isMainDragging = true);

    function updateMainSlider(isSnapping = false) {
        const val = mainInput.value;
        
        mainPill.style.left = `calc(${val / 100} * 50% + 2px)`; 

        if (val < 50) {
            mainLabelL.style.color = 'var(--bg-color)';
            mainLabelR.style.color = 'var(--text-muted)';
        } else {
            mainLabelL.style.color = 'var(--text-muted)';
            mainLabelR.style.color = 'var(--bg-color)';
        }

        if (!isSnapping) {
            // "make it so when the slide is the in the middle, its fully blank"
            // Fades out completely from 0 to 50, stays blank, then fades in from 50 to 100
            let opacity1 = 0;
            let opacity2 = 0;
            if (val <= 50) {
                opacity1 = 1 - (val / 50);
            } else {
                opacity2 = (val - 50) / 50;
            }
            
            viewAbout.style.opacity = opacity1;
            viewProjects.style.opacity = opacity2;
            
            if (val > 0 && val < 100) {
                viewAbout.classList.add('dragging');
                viewProjects.classList.add('dragging');
            }
        }
    }

    mainInput.addEventListener('input', () => {
        if (!isMainDragging) return; // Ignore instant jumps from clicks, let change event handle the smooth fade
        updateMainSlider(false);
    });

    mainInput.addEventListener('change', () => {
        const val = mainInput.value;
        mainPill.style.transition = 'left 0.3s ease';
        
        viewAbout.classList.remove('dragging');
        viewProjects.classList.remove('dragging');
        viewAbout.style.opacity = '';
        viewProjects.style.opacity = '';
        
        if (val < 50) {
            mainInput.value = 0;
            viewAbout.classList.add('active');
            viewProjects.classList.remove('active');
        } else {
            mainInput.value = 100;
            viewProjects.classList.add('active');
            viewAbout.classList.remove('active');
        }
        
        updateMainSlider(true);
        setTimeout(() => { mainPill.style.transition = 'none'; }, 300);
    });

    updateMainSlider(true);

    // --- SUB SLIDER LOGIC ---
    const subInput = document.getElementById('sub-input');
    const subPill = document.getElementById('sub-pill');
    const subLabelL = document.getElementById('sub-label-l');
    const subLabelR = document.getElementById('sub-label-r');
    const projTextInnex = document.getElementById('proj-text-innex1');
    const projGalleryInnex = document.getElementById('proj-gallery-innex1');
    const projTextUas = document.getElementById('proj-text-uas');
    const projGalleryUas = document.getElementById('proj-gallery-uas');

    let isSubDragging = false;

    subInput.addEventListener('mousedown', () => isSubDragging = false);
    subInput.addEventListener('mousemove', () => isSubDragging = true);
    subInput.addEventListener('touchstart', () => isSubDragging = false);
    subInput.addEventListener('touchmove', () => isSubDragging = true);

    function updateSubSlider(isSnapping = false) {
        const val = subInput.value;
        
        subPill.style.left = `calc(${val / 100} * 50% + 2px)`;

        if (val < 50) {
            subLabelL.style.color = 'var(--bg-color)';
            subLabelR.style.color = 'var(--text-muted)';
        } else {
            subLabelL.style.color = 'var(--text-muted)';
            subLabelR.style.color = 'var(--bg-color)';
        }

        if (!isSnapping) {
            let opacity1 = 0;
            let opacity2 = 0;
            if (val <= 50) {
                opacity1 = 1 - (val / 50);
            } else {
                opacity2 = (val - 50) / 50;
            }
            
            projTextInnex.style.opacity = opacity1;
            projGalleryInnex.style.opacity = opacity1;
            projTextUas.style.opacity = opacity2;
            projGalleryUas.style.opacity = opacity2;
            
            if (val > 0 && val < 100) {
                projTextInnex.classList.add('dragging');
                projGalleryInnex.classList.add('dragging');
                projTextUas.classList.add('dragging');
                projGalleryUas.classList.add('dragging');
            }
        }
    }

    subInput.addEventListener('input', () => {
        if (!isSubDragging) return;
        updateSubSlider(false);
    });

    subInput.addEventListener('change', () => {
        const val = subInput.value;
        subPill.style.transition = 'left 0.3s ease';
        
        projTextInnex.classList.remove('dragging');
        projGalleryInnex.classList.remove('dragging');
        projTextUas.classList.remove('dragging');
        projGalleryUas.classList.remove('dragging');
        
        projTextInnex.style.opacity = '';
        projGalleryInnex.style.opacity = '';
        projTextUas.style.opacity = '';
        projGalleryUas.style.opacity = '';
        
        if (val < 50) {
            subInput.value = 0;
            projTextInnex.classList.add('active');
            projGalleryInnex.classList.add('active');
            projTextUas.classList.remove('active');
            projGalleryUas.classList.remove('active');
        } else {
            subInput.value = 100;
            projTextUas.classList.add('active');
            projGalleryUas.classList.add('active');
            projTextInnex.classList.remove('active');
            projGalleryInnex.classList.remove('active');
        }
        
        updateSubSlider(true);
        setTimeout(() => { subPill.style.transition = 'none'; }, 300);
    });

    updateSubSlider(true);

    // --- INNEX MINI SLIDER LOGIC ---
    const innexInput = document.getElementById('innex-input');
    const innexPill = document.getElementById('innex-pill');
    const innexLabelL = document.getElementById('innex-label-l');
    const innexLabelR = document.getElementById('innex-label-r');
    const innexTextElec = document.getElementById('innex-text-elec');
    const innexGalleryElec = document.getElementById('innex-gallery-elec');
    const innexTextSoft = document.getElementById('innex-text-soft');
    const innexGallerySoft = document.getElementById('innex-gallery-soft');

    let isInnexDragging = false;

    innexInput.addEventListener('mousedown', () => isInnexDragging = false);
    innexInput.addEventListener('mousemove', () => isInnexDragging = true);
    innexInput.addEventListener('touchstart', () => isInnexDragging = false);
    innexInput.addEventListener('touchmove', () => isInnexDragging = true);

    function updateInnexSlider(isSnapping = false) {
        const val = innexInput.value;
        
        innexPill.style.left = `calc(${val / 100} * 50% + 2px)`;

        if (val < 50) {
            innexLabelL.style.color = 'var(--bg-color)';
            innexLabelR.style.color = 'var(--text-muted)';
        } else {
            innexLabelL.style.color = 'var(--text-muted)';
            innexLabelR.style.color = 'var(--bg-color)';
        }

        if (!isSnapping) {
            let opacity1 = 0;
            let opacity2 = 0;
            if (val <= 50) {
                opacity1 = 1 - (val / 50);
            } else {
                opacity2 = (val - 50) / 50;
            }
            
            innexTextElec.style.opacity = opacity1;
            innexGalleryElec.style.opacity = opacity1;
            innexTextSoft.style.opacity = opacity2;
            innexGallerySoft.style.opacity = opacity2;
            
            if (val > 0 && val < 100) {
                innexTextElec.classList.add('dragging');
                innexGalleryElec.classList.add('dragging');
                innexTextSoft.classList.add('dragging');
                innexGallerySoft.classList.add('dragging');
            }
        }
    }

    innexInput.addEventListener('input', () => {
        if (!isInnexDragging) return;
        updateInnexSlider(false);
    });

    innexInput.addEventListener('change', () => {
        const val = innexInput.value;
        innexPill.style.transition = 'left 0.3s ease';
        
        innexTextElec.classList.remove('dragging');
        innexGalleryElec.classList.remove('dragging');
        innexTextSoft.classList.remove('dragging');
        innexGallerySoft.classList.remove('dragging');
        
        innexTextElec.style.opacity = '';
        innexGalleryElec.style.opacity = '';
        innexTextSoft.style.opacity = '';
        innexGallerySoft.style.opacity = '';
        
        if (val < 50) {
            innexInput.value = 0;
            innexTextElec.classList.add('active');
            innexGalleryElec.classList.add('active');
            innexTextSoft.classList.remove('active');
            innexGallerySoft.classList.remove('active');
        } else {
            innexInput.value = 100;
            innexTextSoft.classList.add('active');
            innexGallerySoft.classList.add('active');
            innexTextElec.classList.remove('active');
            innexGalleryElec.classList.remove('active');
        }
        
        updateInnexSlider(true);
        setTimeout(() => { innexPill.style.transition = 'none'; }, 300);
    });

    updateInnexSlider(true);

    // --- UAS MINI SLIDER LOGIC ---
    const uasInput = document.getElementById('uas-input');
    const uasPill = document.getElementById('uas-pill');
    const uasLabelL = document.getElementById('uas-label-l');
    const uasLabelR = document.getElementById('uas-label-r');
    const uasTextCfd = document.getElementById('uas-text-cfd');
    const uasGalleryCfd = document.getElementById('uas-gallery-cfd');
    const uasTextAvi = document.getElementById('uas-text-avi');
    const uasGalleryAvi = document.getElementById('uas-gallery-avi');

    let isUasDragging = false;

    uasInput.addEventListener('mousedown', () => isUasDragging = false);
    uasInput.addEventListener('mousemove', () => isUasDragging = true);
    uasInput.addEventListener('touchstart', () => isUasDragging = false);
    uasInput.addEventListener('touchmove', () => isUasDragging = true);

    function updateUasSlider(isSnapping = false) {
        const val = uasInput.value;
        
        uasPill.style.left = `calc(${val / 100} * 50% + 2px)`;

        if (val < 50) {
            uasLabelL.style.color = 'var(--bg-color)';
            uasLabelR.style.color = 'var(--text-muted)';
        } else {
            uasLabelL.style.color = 'var(--text-muted)';
            uasLabelR.style.color = 'var(--bg-color)';
        }

        if (!isSnapping) {
            let opacity1 = 0;
            let opacity2 = 0;
            if (val <= 50) {
                opacity1 = 1 - (val / 50);
            } else {
                opacity2 = (val - 50) / 50;
            }
            
            uasTextCfd.style.opacity = opacity1;
            uasGalleryCfd.style.opacity = opacity1;
            uasTextAvi.style.opacity = opacity2;
            uasGalleryAvi.style.opacity = opacity2;
            
            if (val > 0 && val < 100) {
                uasTextCfd.classList.add('dragging');
                uasGalleryCfd.classList.add('dragging');
                uasTextAvi.classList.add('dragging');
                uasGalleryAvi.classList.add('dragging');
            }
        }
    }

    uasInput.addEventListener('input', () => {
        if (!isUasDragging) return;
        updateUasSlider(false);
    });

    uasInput.addEventListener('change', () => {
        const val = uasInput.value;
        uasPill.style.transition = 'left 0.3s ease';
        
        uasTextCfd.classList.remove('dragging');
        uasGalleryCfd.classList.remove('dragging');
        uasTextAvi.classList.remove('dragging');
        uasGalleryAvi.classList.remove('dragging');
        
        uasTextCfd.style.opacity = '';
        uasGalleryCfd.style.opacity = '';
        uasTextAvi.style.opacity = '';
        uasGalleryAvi.style.opacity = '';
        
        if (val < 50) {
            uasInput.value = 0;
            uasTextCfd.classList.add('active');
            uasGalleryCfd.classList.add('active');
            uasTextAvi.classList.remove('active');
            uasGalleryAvi.classList.remove('active');
        } else {
            uasInput.value = 100;
            uasTextAvi.classList.add('active');
            uasGalleryAvi.classList.add('active');
            uasTextCfd.classList.remove('active');
            uasGalleryCfd.classList.remove('active');
        }
        
        updateUasSlider(true);
        setTimeout(() => { uasPill.style.transition = 'none'; }, 300);
    });

    updateUasSlider(true);
});
// --- GALLERY MINI SLIDER LOGIC ---
const innexGalleryInput = document.getElementById('innex-gallery-input');
const innexGalleryPill = document.getElementById('innex-gallery-pill');
const innexGalleryLabelL = document.getElementById('innex-gallery-label-l');
const innexGalleryLabelR = document.getElementById('innex-gallery-label-r');
const innexElecSchematics = document.getElementById('innex-elec-schematics');
const innexElecProduct = document.getElementById('innex-elec-product');

if (innexGalleryInput) {
    let isGalleryDragging = false;

    innexGalleryInput.addEventListener('mousedown', () => isGalleryDragging = false);
    innexGalleryInput.addEventListener('mousemove', () => isGalleryDragging = true);
    innexGalleryInput.addEventListener('touchstart', () => isGalleryDragging = false);
    innexGalleryInput.addEventListener('touchmove', () => isGalleryDragging = true);

    function updateGallerySlider(isSnapping = false) {
        const val = innexGalleryInput.value;
        
        innexGalleryPill.style.left = `calc(${val / 100} * 50% + 2px)`;

        if (val < 50) {
            innexGalleryLabelL.style.color = 'var(--bg-color)';
            innexGalleryLabelR.style.color = 'var(--text-muted)';
        } else {
            innexGalleryLabelL.style.color = 'var(--text-muted)';
            innexGalleryLabelR.style.color = 'var(--bg-color)';
        }

        if (!isSnapping) {
            let opacity1 = 0;
            let opacity2 = 0;
            if (val <= 50) {
                opacity1 = 1 - (val / 50);
            } else {
                opacity2 = (val - 50) / 50;
            }
            
            innexElecSchematics.style.opacity = opacity1;
            innexElecProduct.style.opacity = opacity2;
            
            if (val > 0 && val < 100) {
                innexElecSchematics.classList.add('dragging');
                innexElecProduct.classList.add('dragging');
            }
        }
    }

    innexGalleryInput.addEventListener('input', () => {
        if (!isGalleryDragging) return;
        updateGallerySlider(false);
    });

    innexGalleryInput.addEventListener('change', () => {
        const val = innexGalleryInput.value;
        innexGalleryPill.style.transition = 'left 0.3s ease';
        
        if (val < 50) {
            innexGalleryInput.value = 0;
            innexElecSchematics.classList.add('active');
            innexElecProduct.classList.remove('active');
        } else {
            innexGalleryInput.value = 100;
            innexElecSchematics.classList.remove('active');
            innexElecProduct.classList.add('active');
        }
        
        innexElecSchematics.classList.remove('dragging');
        innexElecProduct.classList.remove('dragging');
        
        innexElecSchematics.style.opacity = '';
        innexElecProduct.style.opacity = '';
        
        updateGallerySlider(true);
        setTimeout(() => { innexGalleryPill.style.transition = 'none'; }, 300);
    });

    document.addEventListener('DOMContentLoaded', () => {
        updateGallerySlider(true);
    });
}
