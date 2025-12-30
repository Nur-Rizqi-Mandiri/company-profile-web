/**
 * Menu Carousel Logic for Mobile
 */

(function () {
    let activeIndex = 0;
    let startX = 0, currentX = 0, isDragging = false;
    const dragThreshold = 50;
    let menuItems = [];

    window.initMenuCarousel = function (container) {
        menuItems = CONFIG.menu_items || [];
        if (menuItems.length === 0) return;

        const cardList = container.querySelector('#cardListMenu');
        const prevBtn = container.querySelector('.prev-btn-mc');
        const nextBtn = container.querySelector('.next-btn-mc');

        if (!cardList || !prevBtn || !nextBtn) return;

        renderCards(cardList);
        updateCarousel(cardList);
        addListeners(cardList, prevBtn, nextBtn);
    };

    function renderCards(cardList) {
        cardList.innerHTML = '';
        menuItems.forEach((data, i) => {
            const li = document.createElement('li');
            li.className = 'card-mc';
            li.dataset.index = i;
            li.innerHTML = `
                <div class="card-face-mc card-front-mc">
                    <img src="${data.image}" alt="${data.title}" draggable="false">
                    <div class="card-content-mc">
                        <div class="card-title-mc">${data.title}</div>
                        <div class="card-subtitle-mc">${data.desc}</div>
                    </div>
                </div>
                <div class="card-face-mc card-back-mc">
                    <p>${data.desc}</p>
                    <div style="margin-top: 15px; font-weight: bold; font-family: var(--font-serif);">NRM Premium</div>
                </div>
            `;
            cardList.appendChild(li);
        });
    }

    function updateCarousel(cardList) {
        const cards = cardList.querySelectorAll('.card-mc');
        const total = cards.length;
        cards.forEach((card) => {
            if (!isDragging) card.classList.remove('is-dragging');

            let i = parseInt(card.dataset.index);
            let distance = i - activeIndex;

            // Safe wrap around
            if (distance > total / 2) distance -= total;
            if (distance < -total / 2) distance += total;

            card.className = 'card-mc';
            if (distance === 0) card.classList.add('active');
            else if (distance === 1) card.classList.add('right-1');
            else if (distance === 2) card.classList.add('right-2');
            else if (distance === -1) card.classList.add('left-1');
            else if (distance === -2) card.classList.add('left-2');
            else if (distance > 0) card.classList.add('hidden-right');
            else card.classList.add('hidden-left');
        });
    }

    function handleStart(x, cardList) {
        isDragging = true;
        startX = x;
        currentX = x;
        const activeCard = cardList.querySelector('.card-mc.active');
        if (activeCard) activeCard.classList.add('is-dragging');
    }

    function handleMove(x, cardList) {
        if (!isDragging) return;
        currentX = x;
        const diff = currentX - startX;
        const activeCard = cardList.querySelector('.card-mc.active');
        if (activeCard) {
            activeCard.style.transform = `translateX(${Math.max(-100, Math.min(100, diff))}px) scale(1)`;
        }
    }

    function handleEnd(cardList) {
        if (!isDragging) return;
        isDragging = false;
        const diff = currentX - startX;
        const activeCard = cardList.querySelector('.card-mc.active');
        if (activeCard) {
            activeCard.style.transform = '';
            activeCard.classList.remove('is-dragging');
        }

        if (Math.abs(diff) > dragThreshold) {
            if (diff > 0) {
                activeIndex = (activeIndex - 1 + menuItems.length) % menuItems.length;
            } else {
                activeIndex = (activeIndex + 1) % menuItems.length;
            }
        }
        updateCarousel(cardList);
    }

    function addListeners(cardList, prevBtn, nextBtn) {
        cardList.addEventListener('touchstart', e => handleStart(e.touches[0].clientX, cardList), { passive: true });
        cardList.addEventListener('touchmove', e => handleMove(e.touches[0].clientX, cardList), { passive: true });
        cardList.addEventListener('touchend', () => handleEnd(cardList));

        // Drag support for desktop mouse
        cardList.addEventListener('mousedown', e => handleStart(e.clientX, cardList));
        window.addEventListener('mousemove', e => handleMove(e.clientX, cardList));
        window.addEventListener('mouseup', () => handleEnd(cardList));

        // Flip on click
        cardList.addEventListener('click', e => {
            const card = e.target.closest('.card-mc');
            if (card && Math.abs(currentX - startX) < 10 && parseInt(card.dataset.index) === activeIndex) {
                card.classList.toggle('is-flipped');
            }
        });

        nextBtn.addEventListener('click', () => {
            activeIndex = (activeIndex + 1) % menuItems.length;
            updateCarousel(cardList);
        });

        prevBtn.addEventListener('click', () => {
            activeIndex = (activeIndex - 1 + menuItems.length) % menuItems.length;
            updateCarousel(cardList);
        });
    }

})();
