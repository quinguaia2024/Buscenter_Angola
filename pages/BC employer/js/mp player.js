   const audio = document.getElementById('backgroundAudio');
        audio.play().catch(() => {
            console.log('Reprodução automática bloqueada');
        });
        document.addEventListener('click', () => {
            audio.play();
        }, { once: true });
        document.addEventListener('touchstart', () => {
            audio.play();
        }, { once: true });
        document.addEventListener('scroll', () => {
            audio.play();
        }, { once: true });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                audio.play();
            }
        }, { once: true });