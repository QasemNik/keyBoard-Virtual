document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const keyboard = document.querySelector('.keyboard');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    let capsLockActive = false;

    // Theme management
    const getCurrentTheme = () => document.documentElement.getAttribute('data-theme');
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    };

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function handleKeyPress(key) {
        const button = document.querySelector(`button[data-key="${key.toUpperCase()}"]`);
        if (!button) return;

        button.classList.add('key-animation');
        setTimeout(() => button.classList.remove('key-animation'), 100);

        switch (key.toUpperCase()) {
            case 'BACKSPACE':
                output.value = output.value.slice(0, -1);
                break;
            case 'CAPSLOCK':
                capsLockActive = !capsLockActive;
                document.querySelector('[data-key="CAPSLOCK"]').classList.toggle('capslock-active');
                break;
            case 'TAB':
                output.value += '\t';
                break;
            case 'ENTER':
                output.value += '\n';
                break;
            case 'SHIFT':
                // Shift functionality can be implemented here if needed
                break;
            default:
                if (key.length === 1) {
                    output.value += capsLockActive ? key.toUpperCase() : key.toLowerCase();
                }
        }
    }

    // Handle physical keyboard events
    document.addEventListener('keyup', (event) => {
        event.preventDefault();
        handleKeyPress(event.key);
    });

    // Handle virtual keyboard clicks
    keyboard.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const key = event.target.getAttribute('data-key');
            handleKeyPress(key);
        }
    });

    // Prevent default keyboard behavior when typing
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'F5' && event.key !== 'F12') {
            event.preventDefault();
        }
    });

    // Focus the textarea on load
    output.focus();
});