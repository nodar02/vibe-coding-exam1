document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements (no globals)
    const elements = {
        dropdown: document.getElementById('servicesDropdown'),
        dropdownMenu: document.getElementById('servicesMenu'),
        modalOverlay: document.getElementById('modalOverlay'),
        openModalBtn: document.getElementById('openModalBtn'),
        closeModalBtn: document.getElementById('closeModalBtn'),
    };

    // ---------- DROPDOWN LOGIC ----------
    if (elements.dropdown && elements.dropdownMenu) {
        const isDropdownOpen = () =>
            elements.dropdownMenu.classList.contains('show');

        const openDropdown = () => elements.dropdownMenu.classList.add('show');
        const closeDropdown = () => elements.dropdownMenu.classList.remove('show');

        const toggleDropdown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            isDropdownOpen() ? closeDropdown() : openDropdown();
        };

        const handleOutsideClick = (e) => {
            if (!elements.dropdown.contains(e.target)) {
                closeDropdown();
            }
        };

        elements.dropdown.addEventListener('click', toggleDropdown);
        document.addEventListener('click', handleOutsideClick);
    }

    // ---------- MODAL LOGIC ----------
    if (elements.modalOverlay) {
        let lastFocusedElement = null;
        const focusableSelectors =
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

        const trapFocus = (e) => {
            if (e.key !== 'Tab') return;
            const focusableEls = elements.modalOverlay.querySelectorAll(focusableSelectors);
            if (focusableEls.length === 0) return;

            const firstEl = focusableEls[0];
            const lastEl = focusableEls[focusableEls.length - 1];

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        };

        const openModal = () => {
            lastFocusedElement = document.activeElement;
            elements.modalOverlay.classList.add('show');

            // Focus first focusable element inside modal
            const focusableEls = elements.modalOverlay.querySelectorAll(focusableSelectors);
            focusableEls[0]?.focus();

            document.addEventListener('keydown', trapFocus);
        };

        const closeModal = () => {
            elements.modalOverlay.classList.remove('show');

            // Restore focus to opener
            lastFocusedElement?.focus();

            document.removeEventListener('keydown', trapFocus);
        };

        elements.openModalBtn?.addEventListener('click', openModal);
        elements.closeModalBtn?.addEventListener('click', closeModal);

        // Close modal only when clicking overlay background
        elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === elements.modalOverlay) closeModal();
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.modalOverlay.classList.contains('show')) {
                closeModal();
            }
        });
    }

    // ---------- GLOBAL ESCAPE FOR DROPDOWN ----------
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const dropdownMenu = document.getElementById('servicesMenu');
        dropdownMenu?.classList.remove('show');
    });
});
