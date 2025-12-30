/**
 * Packages Carousel Logic for Mobile
 */

(function () {
    const carousels = {}; // Store state for each tab category

    window.initPackageCarousel = function (category) {
        const pkgData = CONFIG.packages[category.toLowerCase()];
        if (!pkgData) return;

        const containerId = `pkg-${category.toLowerCase()}-carousel`;
        const container = document.getElementById(containerId);
        if (!container) return;

        const cardList = container.querySelector('.card-list-pc');
        const prevBtn = container.querySelector('.prev-btn-pc');
        const nextBtn = container.querySelector('.next-btn-pc');

        if (!cardList || !prevBtn || !nextBtn) return;

        // Initialize state for this category
        carousels[category] = {
            activeIndex: 0,
            startX: 0,
            currentX: 0,
            isDragging: false,
            items: pkgData
        };

        renderCards(category, cardList);
        updateCarousel(category, cardList);
        addListeners(category, cardList, prevBtn, nextBtn);
    };

    function renderCards(category, cardList) {
        const state = carousels[category];
        cardList.innerHTML = '';
        state.items.forEach((pkg, i) => {
            const li = document.createElement('li');
            li.className = 'card-pc';
            li.dataset.index = i;

            const badgeHtml = pkg.badge ? `<div class="card-pc-badge">${pkg.badge}</div>` : '';
            const featuredClass = pkg.badge ? 'featured-pc' : '';
            const featuresHtml = pkg.features.map(f => `<li>${f}</li>`).join('');

            li.innerHTML = `
                <div class="card-face-pc card-front-pc ${featuredClass}">
                    ${badgeHtml}
                    <div class="card-pc-header">${pkg.name}</div>
                    <ul class="card-pc-features">${featuresHtml}</ul>
                    <div class="card-pc-footer">
                        <a href="#contact" class="btn-cta small">Pilih Paket</a>
                        <p style="font-size: 0.7rem; color: #aaa; margin-top: 10px;">Tap kartu untuk info lanjut</p>
                    </div>
                </div>
                <div class="card-face-pc card-back-pc">
                    <h3>${pkg.name}</h3>
                    <p>Layanan katering premium dengan standar kebersihan tinggi dan rasa yang terjamin.</p>
                    <div style="margin-top: 20px;">
                        <span style="border: 1px solid white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem;">NRM Premium</span>
                    </div>
                </div>
            `;
            cardList.appendChild(li);
        });
    }

    function updateCarousel(category, cardList) {
        const state = carousels[category];
        const cards = cardList.querySelectorAll('.card-pc');
        const total = cards.length;

        cards.forEach((card) => {
            if (!state.isDragging) card.classList.remove('is-dragging');

            let i = parseInt(card.dataset.index);
            let distance = i - state.activeIndex;

            // Safe wrap around
            if (distance > total / 2) distance -= total;
            if (distance < -total / 2) distance += total;

            card.className = 'card-pc';
            if (distance === 0) card.classList.add('active');
            else if (distance === 1) card.classList.add('right-1');
            else if (distance === 2) card.classList.add('right-2');
            else if (distance === -1) card.classList.add('left-1');
            else if (distance === -2) card.classList.add('left-2');
            else if (distance > 0) card.classList.add('hidden-right');
            else card.classList.add('hidden-left');
        });
    }

    function handleStart(x, category, cardList) {
        const state = carousels[category];
        state.isDragging = true;
        state.startX = x;
        state.currentX = x;
        const activeCard = cardList.querySelector('.card-pc.active');
        if (activeCard) activeCard.classList.add('is-dragging');
    }

    function handleMove(x, category, cardList) {
        const state = carousels[category];
        if (!state.isDragging) return;
        state.currentX = x;
        const diff = state.currentX - state.startX;
        const activeCard = cardList.querySelector('.card-pc.active');
        if (activeCard) {
            activeCard.style.transform = `translateX(${Math.max(-100, Math.min(100, diff))}px) scale(1)`;
        }
    }

    function handleEnd(category, cardList) {
        const state = carousels[category];
        if (!state.isDragging) return;
        state.isDragging = false;

        const diff = state.currentX - state.startX;
        const activeCard = cardList.querySelector('.card-pc.active');
        if (activeCard) {
            activeCard.style.transform = '';
            activeCard.classList.remove('is-dragging');
        }

        const dragThreshold = 50;
        if (Math.abs(diff) > dragThreshold) {
            if (diff > 0) {
                state.activeIndex = (state.activeIndex - 1 + state.items.length) % state.items.length;
            } else {
                state.activeIndex = (state.activeIndex + 1) % state.items.length;
            }
        }
        updateCarousel(category, cardList);
    }

    function addListeners(category, cardList, prevBtn, nextBtn) {
        const state = carousels[category];

        cardList.addEventListener('touchstart', e => handleStart(e.touches[0].clientX, category, cardList), { passive: true });
        cardList.addEventListener('touchmove', e => handleMove(e.touches[0].clientX, category, cardList), { passive: true });
        cardList.addEventListener('touchend', () => handleEnd(category, cardList));

        // Mouse listeners
        cardList.addEventListener('mousedown', e => handleStart(e.clientX, category, cardList));
        window.addEventListener('mousemove', e => handleMove(e.clientX, category, cardList));
        window.addEventListener('mouseup', () => handleEnd(category, cardList));

        // Flip on click
        cardList.addEventListener('click', e => {
            const card = e.target.closest('.card-pc');
            if (card && Math.abs(state.currentX - state.startX) < 10 && parseInt(card.dataset.index) === state.activeIndex) {
                card.classList.toggle('is-flipped');
            }
        });

        nextBtn.addEventListener('click', () => {
            state.activeIndex = (state.activeIndex + 1) % state.items.length;
            updateCarousel(category, cardList);
        });

        prevBtn.addEventListener('click', () => {
            state.activeIndex = (state.activeIndex - 1 + state.items.length) % state.items.length;
            updateCarousel(category, cardList);
        });
    }

})();
