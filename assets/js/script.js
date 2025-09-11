   document.addEventListener('DOMContentLoaded', function () {
            // Menu hamburger para mobile
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-links');

            hamburger.addEventListener('click', function () {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Fechar menu ao clicar num link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');

                    // Scroll suave para a seção
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Hero Slider
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.slider-dot');
            let currentSlide = 0;

            function showSlide(n) {
                slides.forEach(slide => {
                    slide.classList.remove('active');
                });
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });

                currentSlide = (n + slides.length) % slides.length;

                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', function () {
                    showSlide(index);
                });
            });

            // Auto slide
            setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);

            // Testemunhos Slider
            const testemunhos = document.querySelectorAll('.testemunho');
            const testemunhoDots = document.querySelectorAll('.testemunho-dot');
            let currentTestemunho = 0;

            function showTestemunho(n) {
                testemunhos.forEach(testemunho => {
                    testemunho.classList.remove('active');
                });
                testemunhoDots.forEach(dot => {
                    dot.classList.remove('active');
                });

                currentTestemunho = (n + testemunhos.length) % testemunhos.length;

                testemunhos[currentTestemunho].classList.add('active');
                testemunhoDots[currentTestemunho].classList.add('active');
            }

            testemunhoDots.forEach((dot, index) => {
                dot.addEventListener('click', function () {
                    showTestemunho(index);
                });
            });

            // Auto testemunhos
            setInterval(() => {
                showTestemunho(currentTestemunho + 1);
            }, 6000);

            // Formulário de testemunho
            // Formulário de testemunho - VERSÃO CORRIGIDA
            const btnAddTestemunho = document.getElementById('btn-add-testemunho');
            const testemunhoForm = document.getElementById('testemunho-form');

            if (btnAddTestemunho && testemunhoForm) {
                // Event listener para mostrar/ocultar o formulário
                btnAddTestemunho.addEventListener('click', function (e) {
                    e.preventDefault();
                    testemunhoForm.style.display = testemunhoForm.style.display === 'none' ? 'block' : 'none';
                });

                // Event listener para o SUBMIT do formulário
                testemunhoForm.addEventListener('submit', function (e) {
                    e.preventDefault();

                    // Pegar os valores dos campos do formulário
                    const nome = document.getElementById('nome-testemunho').value.trim();
                    const testemunho = document.getElementById('texto-testemunho').value.trim();

                    // Validar se os campos foram preenchidos
                    if (!nome || !testemunho) {
                        alert('Por favor, preencha todos os campos obrigatórios.');
                        return;
                    }

                    // Criar o novo elemento de testemunho
                    const newTestimonial = document.createElement('div');
                    newTestimonial.className = 'testemunho';
                    newTestimonial.innerHTML = `
            <p class="testemunho-text">"${testemunho}"</p>
            <div class="testemunho-author">
                <div class="author-info">
                    <h4>${nome}</h4>
                    <p>Cliente satisfeito</p>
                </div>
            </div>
        `;

                    // Encontrar o container correto (note: era 'testemunhos-containerr' com dois 'r')
                    const container = document.querySelector('.testemunhos-container');

                    if (container) {
                        // Adicionar antes do último elemento (que provavelmente são os dots de navegação)
                        container.insertBefore(newTestimonial, container.lastElementChild);

                        // Reset do formulário
                        testemunhoForm.reset();

                        // Ocultar o formulário após submissão
                        testemunhoForm.style.display = 'none';

                        

                        // Scroll para o novo testemunho
                        newTestimonial.scrollIntoView({ behavior: 'smooth', block: 'center' });

                        // Atualizar os dots de navegação se existirem
                        updateTestemunhoNavigation();
                    } else {
                        console.error('Container de testemunhos não encontrado');
                    }
                });
            }

            // Função auxiliar para atualizar a navegação dos testemunhos
            function updateTestemunhoNavigation() {
                const testemunhos = document.querySelectorAll('.testemunho');
                const navContainer = document.querySelector('.testemunho-nav');

                if (navContainer && testemunhos.length > 0) {
                    // Limpar dots existentes
                    navContainer.innerHTML = '';

                    // Criar novos dots
                    testemunhos.forEach((_, index) => {
                        const dot = document.createElement('div');
                        dot.className = 'testemunho-dot';
                        if (index === testemunhos.length - 1) {
                            dot.classList.add('active'); // Ativar o último (novo) testemunho
                        }
                        dot.addEventListener('click', () => showTestemunho(index));
                        navContainer.appendChild(dot);
                    });

                    // Mostrar o novo testemunho
                    showTestemunho(testemunhos.length - 1);
                }
            }

            // Função para mostrar testemunho específico
            function showTestemunho(index) {
                const testemunhos = document.querySelectorAll('.testemunho');
                const dots = document.querySelectorAll('.testemunho-dot');

                // Ocultar todos os testemunhos
                testemunhos.forEach(testemunho => {
                    testemunho.classList.remove('active');
                });

                // Remover classe active de todos os dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });

                // Mostrar o testemunho selecionado
                if (testemunhos[index]) {
                    testemunhos[index].classList.add('active');
                }

                // Ativar o dot correspondente
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }

            // FAQ Accordion
            const faqItems = document.querySelectorAll('.faq-item');

            faqItems.forEach(item => {
                const pergunta = item.querySelector('.faq-pergunta');

                pergunta.addEventListener('click', function () {
                    item.classList.toggle('active');
                });
            });

            // Galeria Lightbox
            const galeriaItems = document.querySelectorAll('.galeria-item');
            const lightbox = document.querySelector('.lightbox');
            const lightboxImg = document.querySelector('.lightbox-content img');
            const lightboxClose = document.querySelector('.lightbox-close');

            galeriaItems.forEach(item => {
                item.addEventListener('click', function () {
                    const imgSrc = this.querySelector('img').getAttribute('src');
                    lightboxImg.setAttribute('src', imgSrc);
                    lightbox.classList.add('open');
                });
            });

            if (lightboxClose) {
                lightboxClose.addEventListener('click', function () {
                    lightbox.classList.remove('open');
                });
            }

            // Fechar lightbox clicando fora da imagem
            if (lightbox) {
                lightbox.addEventListener('click', function (e) {
                    if (e.target === lightbox) {
                        lightbox.classList.remove('open');
                    }
                });
            }
        });