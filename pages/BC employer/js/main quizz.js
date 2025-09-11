        const backgroundAudio = document.getElementById('backgroundAudio');
        if (backgroundAudio) {
            backgroundAudio.volume = 0.5;
            const playAudio = () => {
                try {
                    backgroundAudio.play().catch((error) => {
                        console.log('Erro ao tentar reproduzir áudio:', error.message);
                    });
                } catch (error) {
                    console.error('Erro inesperado ao reproduzir áudio:', error.message);
                }
            };
            document.addEventListener('click', playAudio, { once: true });
            document.addEventListener('touchstart', playAudio, { once: true });
            document.addEventListener('scroll', playAudio, { once: true });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    playAudio();
                }
            }, { once: true });
        }

        function toggleAudio() {
            try {
                if (backgroundAudio) {
                    backgroundAudio.muted = !backgroundAudio.muted;
                    const button = document.querySelector('.audio-control');
                    button.innerText = backgroundAudio.muted ? 'Ativar Áudio 🎵' : 'Silenciar Áudio 🔇';
                }
            } catch (error) {
                console.error('Erro ao alternar áudio:', error.message);
            }
        }

        function redirectToCategory(category) {
            try {
                const categoryPages = {
                    financas: '../finance/finance.html', 
                    negocios: '../business/business.html',
                 carreiras: '../main page/main.html',
                tecnologia: '../main page/main.html'
                };
                window.location.href = categoryPages[category] || 'index.html';
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } catch (error) {
                console.error('Erro ao redirecionar para categoria:', error.message);
            }
        }
        document.addEventListener('DOMContentLoaded', function() {
            try {
                window.addEventListener('resize', () => {
                    const canvas = document.getElementById('confetti-canvas');
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                });
            } catch (error) {
                console.error('Erro na inicialização:', error.message);
            }
        });