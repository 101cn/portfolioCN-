function initializeSlider(sliderContainerId, viewsArrays = [], onChangeCallback = null) {
    const container = document.getElementById(sliderContainerId);
    if (!container) return;

    const input = container.querySelector('.slider-input');
    const pill = container.querySelector('.slider-pill');
    const labels = Array.from(container.querySelectorAll('.slider-label'));
    const numLabels = Math.max(labels.length, 2); // default to 2 to avoid divide by zero if something goes wrong

    pill.style.width = `calc(${100 / numLabels}% - 4px)`;

    let isDragging = false;
    let lastIndex = -1;
    let transitionTimeout1 = null;
    let transitionTimeout2 = null;

    input.addEventListener('mousedown', () => isDragging = false);
    input.addEventListener('mousemove', () => isDragging = true);
    input.addEventListener('touchstart', () => isDragging = false);
    input.addEventListener('touchmove', () => isDragging = true);

    function switchView(oldIndex, newIndex) {
        if (viewsArrays.length === 0) return;
        
        clearTimeout(transitionTimeout1);
        clearTimeout(transitionTimeout2);

        viewsArrays.forEach(views => {
            if (views.length === numLabels) {
                if (oldIndex >= 0 && views[oldIndex]) {
                    views[oldIndex].style.opacity = '0';
                }
                views.forEach((v, i) => {
                    if (v && i !== oldIndex && i !== newIndex) {
                        v.style.opacity = '0';
                        v.classList.remove('active');
                    }
                });
            }
        });

        transitionTimeout1 = setTimeout(() => {
            viewsArrays.forEach(views => {
                if (views.length === numLabels) {
                    if (oldIndex >= 0 && views[oldIndex]) {
                        views[oldIndex].classList.remove('active');
                    }
                    const newView = views[newIndex];
                    if (newView) {
                        newView.classList.add('active');
                    }
                }
            });

            transitionTimeout2 = setTimeout(() => {
                viewsArrays.forEach(views => {
                    if (views.length === numLabels) {
                        const newView = views[newIndex];
                        if (newView) {
                            newView.style.opacity = '1';
                        }
                    }
                });
            }, 30);
        }, 250);
    }

    function updateSlider(isSnapping = false) {
        const val = input.value;
        const maxLeftPercent = ((numLabels - 1) / numLabels) * 100;
        pill.style.left = `calc(${(val / 100) * maxLeftPercent}% + 2px)`;

        const segmentSize = 100 / (numLabels - 1);
        const currentIndex = Math.round(val / segmentSize);

        if (currentIndex !== lastIndex) {
            if (onChangeCallback) onChangeCallback(currentIndex);
            if (lastIndex !== -1) {
                switchView(lastIndex, currentIndex);
            } else {
                viewsArrays.forEach(views => {
                    if (views.length === numLabels) {
                        views.forEach((v, i) => {
                            if (v) {
                                if (i === currentIndex) {
                                    v.classList.add('active');
                                    v.style.opacity = '1';
                                } else {
                                    v.classList.remove('active');
                                    v.style.opacity = '0';
                                }
                            }
                        });
                    }
                });
            }
            lastIndex = currentIndex;
        }

        labels.forEach((label, i) => {
            if (i === currentIndex) {
                label.style.color = 'var(--bg-color)';
            } else {
                label.style.color = 'var(--text-muted)';
            }
        });
    }

    input.addEventListener('input', () => {
        if (!isDragging) return;
        updateSlider(false);
    });

    input.addEventListener('change', () => {
        const segmentSize = 100 / (numLabels - 1);
        const currentIndex = Math.round(input.value / segmentSize);
        input.value = currentIndex * segmentSize;
        pill.style.transition = 'left 0.3s ease';
        updateSlider(true);
        setTimeout(() => { pill.style.transition = 'none'; }, 300);
    });

    updateSlider(true);
}

document.addEventListener('DOMContentLoaded', () => {
    // Main Slider
    initializeSlider('main-slider', [
        [document.getElementById('view-about'), document.getElementById('view-projects')]
    ]);

    // Sub Slider (Project Navigation) - Controls both Text Views AND Gallery Views
    // Now supports 3 tabs!
    const projectTimespans = [
        "September 2025 - Present", // Innex1
        "September 2025 - Present", // UAS Drone
        "September 2025 - March 2026" // SIC Carrier
    ];
    const subTimespanEl = document.getElementById('sub-timespan');

    initializeSlider('sub-slider', [
        [
            document.getElementById('proj-text-innex1'),
            document.getElementById('proj-text-uas'),
            document.getElementById('proj-text-sic')
        ],
        [
            document.getElementById('proj-gallery-innex1'),
            document.getElementById('proj-gallery-uas'),
            document.getElementById('proj-gallery-sic')
        ]
    ], (index) => {
        if (subTimespanEl) {
            subTimespanEl.innerText = projectTimespans[index];
        }
    });

    // Innex1 Mini Slider
    initializeSlider('innex-slider', [
        [
            document.getElementById('innex-text-elec'),
            document.getElementById('innex-text-soft')
        ],
        [
            document.getElementById('innex-gallery-elec'),
            document.getElementById('innex-gallery-soft')
        ]
    ]);

    // UAS Mini Slider
    initializeSlider('uas-slider', [
        [
            document.getElementById('uas-text-cfd'),
            document.getElementById('uas-text-avi')
        ],
        [
            document.getElementById('uas-gallery-cfd'),
            document.getElementById('uas-gallery-avi')
        ]
    ]);

    // Innex1 Gallery Inner Slider
    initializeSlider('innex-gallery-slider', [
        [
            document.getElementById('innex-elec-schematics'),
            document.getElementById('innex-elec-product')
        ]
    ]);
});
