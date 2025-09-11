     // Variáveis globais
        let currentSection = 'home';
        let currentModule = 0;
        let currentQuestion = 0;
        let score = 0;
        let userAnswers = [];
        let points = 0;
        
        // Dados do quiz
        const quizQuestions = [
            {
                question: "Para que serve o dinheiro? 💰",
                options: [
                    "Apenas para comprar doces",
                    "Para trocar por bens e serviços que precisamos ou queremos",
                    "Para guardar e nunca usar",
                    "Para jogar fora"
                ],
                correctAnswer: 1,
                feedback: "Isso mesmo! O dinheiro serve principalmente para trocar por coisas que precisamos ou queremos, como comida, roupas e brinquedos."
            },
            {
                question: "O que é melhor fazer com o dinheiro que sobra? 🐷",
                options: [
                    "Gastar tudo imediatamente",
                    "Guardar uma parte para usar no futuro",
                    "Esconder embaixo do travesseiro",
                    "Dar tudo para um amigo"
                ],
                correctAnswer: 1,
                feedback: "Excelente! Guardar uma parte do dinheiro (poupar) é importante para podermos comprar coisas maiores no futuro ou para emergências."
            },
            {
                question: "Onde podemos guardar o dinheiro com segurança? 🏦",
                options: [
                    "No banco ou num cofrinho",
                    "No quintal enterrado",
                    "Embrulhado em papel e jogado no lixo",
                    "Dentro de um livro na estante"
                ],
                correctAnswer: 0,
                feedback: "Correto! O banco é o lugar mais seguro para guardar dinheiro, e um cofrinho também pode be bom para começar a poupar."
            },
            {
                question: "Por que é importante economizar dinheiro? 💸",
                options: [
                    "Para comprar coisas maiores no futuro",
                    "Para ter em caso de emergências",
                    "Para aprender a controlar seus gastos",
                    "Todas as alternativas acima"
                ],
                correctAnswer: 3,
                feedback: "Muito bem! Economizar dinheiro é importante por todos esses motivos: comprar coisas maiores, ter para emergências e aprender a controlar gastos."
            },
            {
                question: "O que é um orçamento? 📊",
                options: [
                    "Um tipo de brinquedo",
                    "Um plano para como gastar seu dinheiro",
                    "Um lugar para guardar moedas",
                    "Um documento do banco"
                ],
                correctAnswer: 1,
                feedback: "Exatamente! Um orçamento é um plano que ajuda a decidir como gastar seu dinheiro de forma inteligente."
            }
        ];
        
        // Local Storage
        let progress = JSON.parse(localStorage.getItem('progress')) || {
            modulesCompleted: [],
            points: 0,
            badges: []
        };
        
        // Audio Handling
        const backgroundAudio = document.getElementById('backgroundAudio');
        const quizAudio = document.getElementById('quizAudio');
        const correctSound = document.getElementById('correctSound');
        const incorrectSound = document.getElementById('incorrectSound');
        let currentAudio = backgroundAudio;

        function playAudio(audioElement) {
            try {
                if (audioElement && !audioElement.muted) {
                    audioElement.play().catch((error) => {
                        console.log('Erro ao tentar reproduzir áudio:', error.message);
                    });
                }
            } catch (error) {
                console.error('Erro inesperado ao reproduzir áudio:', error.message);
            }
        }

        function pauseAudio(audioElement) {
            try {
                if (audioElement) {
                    audioElement.pause();
                }
            } catch (error) {
                console.error('Erro ao pausar áudio:', error.message);
            }
        }

        if (backgroundAudio) {
            backgroundAudio.volume = 0.5;
            const initAudio = () => {
                playAudio(backgroundAudio);
            };
            document.addEventListener('click', initAudio, { once: true });
            document.addEventListener('touchstart', initAudio, { once: true });
            document.addEventListener('scroll', initAudio, { once: true });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    initAudio();
                }
            }, { once: true });
        }

        function playSound(soundId) {
            try {
                const sound = document.getElementById(soundId);
                if (sound) {
                    pauseAudio(currentAudio);
                    sound.currentTime = 0;
                    sound.play().catch((error) => {
                        console.log('Erro ao reproduzir som:', error.message);
                    });
                    sound.onended = () => {
                        playAudio(currentAudio);
                    };
                }
            } catch (error) {
                console.error('Erro inesperado ao reproduzir som:', error.message);
            }
        }
        
        function toggleAudio() {
            try {
                if (currentAudio) {
                    currentAudio.muted = !currentAudio.muted;
                    const button = document.querySelector('.audio-control');
                    button.innerText = currentAudio.muted ? 'Ativar Áudio 🎵' : 'Silenciar Áudio 🔇';
                }
            } catch (error) {
                console.error('Erro ao alternar áudio:', error.message);
            }
        }

        // Funções para navegação entre seções
        function showSection(sectionId) {
            try {
                document.getElementById(currentSection).classList.remove('active');
                document.getElementById(sectionId).classList.add('active');
                currentSection = sectionId;
                
                // Switch audio based on section
                pauseAudio(currentAudio);
                if (sectionId === 'quiz') {
                    currentAudio = quizAudio;
                    currentQuestion = 0;
                    score = 0;
                    userAnswers = new Array(quizQuestions.length).fill(null);
                    loadQuestion(0);
                    updateProgressBar();
                } else {
                    currentAudio = backgroundAudio;
                }
                playAudio(currentAudio);
                
                if (sectionId === 'student-panel') {
                    updateStudentPanel();
                }
            } catch (error) {
                console.error('Erro ao alternar seção:', error.message);
            }
        }
        
        // Funções do quiz
        function loadQuestion(questionIndex) {
            try {
                const question = quizQuestions[questionIndex];
                document.getElementById('question').textContent = question.question;
                
                const optionsContainer = document.getElementById('options');
                optionsContainer.innerHTML = '';
                
                question.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = 'option-btn';
                    button.textContent = option;
                    button.onclick = () => selectAnswer(index, question.correctAnswer);
                    optionsContainer.appendChild(button);
                });
                
                document.getElementById('prev-btn').disabled = questionIndex === 0;
                document.getElementById('next-btn').disabled = false;
                
                document.getElementById('feedback').className = 'feedback';
                document.getElementById('feedback').textContent = '';
                
                updateProgressBar();
            } catch (error) {
                console.error('Erro ao carregar pergunta:', error.message);
            }
        }
        
        function selectAnswer(selectedIndex, correctIndex) {
            try {
                const feedback = document.getElementById('feedback');
                const optionButtons = document.querySelectorAll('.option-btn');
                
                optionButtons.forEach(button => {
                    button.disabled = true;
                    button.style.cursor = 'default';
                });
                
                if (selectedIndex === correctIndex) {
                    feedback.className = 'feedback correct';
                    feedback.textContent = quizQuestions[currentQuestion].feedback;
                    if (userAnswers[currentQuestion] !== true) {
                        score++;
                        points += 10;
                        userAnswers[currentQuestion] = true;
                    }
                    optionButtons[correctIndex].style.backgroundColor = '#4CAF50';
                    optionButtons[correctIndex].style.color = 'white';
                    optionButtons[correctIndex].style.borderColor = '#2E7D32';
                    playSound('correctSound');
                    triggerConfetti();
                } else {
                    feedback.className = 'feedback incorrect';
                    feedback.textContent = "Ops! Essa não é a resposta correta. " + quizQuestions[currentQuestion].feedback;
                    userAnswers[currentQuestion] = false;
                    optionButtons[correctIndex].style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-main');
                    optionButtons[correctIndex].style.color = 'white';
                    optionButtons[correctIndex].style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-dark');
                    optionButtons[selectedIndex].style.backgroundColor = '#FFCDD2';
                    optionButtons[selectedIndex].style.color = '#C62828';
                    optionButtons[selectedIndex].style.borderColor = '#F44336';
                    optionButtons[selectedIndex].classList.add('incorrect-answer');
                    playSound('incorrectSound');
                }
                
                progress.points = points;
                localStorage.setItem('progress', JSON.stringify(progress));
                updateProgressBar();
            } catch (error) {
                console.error('Erro ao selecionar resposta:', error.message);
            }
        }
        
        function nextQuestion() {
            try {
                if (currentQuestion < quizQuestions.length - 1) {
                    currentQuestion++;
                    loadQuestion(currentQuestion);
                    playAudio(currentAudio);
                } else {
                    const percentage = Math.round((score / quizQuestions.length) * 100);
                    const message = percentage >= 70 ? 
                        `Parabéns! Você acertou ${score} de ${quizQuestions.length} (${percentage}%). Excelente trabalho! 🎉` :
                        `Você acertou ${score} de ${quizQuestions.length} (${percentage}%). Continue praticando para melhorar! 💪`;
                    alert(message);
                    if (percentage >= 70 && !progress.modulesCompleted.includes(currentModule)) {
                        progress.modulesCompleted.push(currentModule);
                        progress.badges.push(`Medalha do Módulo ${currentModule} 🏆`);
                        localStorage.setItem('progress', JSON.stringify(progress));
                        triggerConfetti();
                    }
                    showSection('student-panel');
                }
            } catch (error) {
                console.error('Erro ao avançar pergunta:', error.message);
            }
        }
        
        function prevQuestion() {
            try {
                if (currentQuestion > 0) {
                    currentQuestion--;
                    loadQuestion(currentQuestion);
                    playAudio(currentAudio);
                }
            } catch (error) {
                console.error('Erro ao voltar pergunta:', error.message);
            }
        }
        
        function updateProgressBar() {
            try {
                const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
                const progressBar = document.getElementById('quiz-progress');
                progressBar.style.width = progress + '%';
                progressBar.classList.add('pulse');
                setTimeout(() => progressBar.classList.remove('pulse'), 1500);
            } catch (error) {
                console.error('Erro ao atualizar barra de progresso:', error.message);
            }
        }
        
        function updateStudentPanel() {
            try {
                document.getElementById('completed-modules').textContent = progress.modulesCompleted.length;
                const quizScore = Math.round((score / quizQuestions.length) * 100);
                document.getElementById('quiz-score').textContent = quizScore;
                document.getElementById('total-points').textContent = progress.points;
                
                const badgesContainer = document.getElementById('badges-container');
                badgesContainer.innerHTML = '';
                
                if (progress.badges.length === 0) {
                    badgesContainer.innerHTML = '<p style="color: var(--text-secondary); font-style: italic;">Complete quizzes e módulos para desbloquear conquistas!</p>';
                } else {
                    progress.badges.forEach(badge => {
                        addBadge(badgesContainer, badge, '🏆', '#FFC107');
                    });
                }
                
                if (progress.modulesCompleted.length === 5) {
                    const certificateBtn = document.createElement('button');
                    certificateBtn.className = 'nav-btn';
                    certificateBtn.textContent = 'Baixar Certificado 🎉';
                    certificateBtn.onclick = downloadCertificate;
                    badgesContainer.appendChild(certificateBtn);
                }
            } catch (error) {
                console.error('Erro ao atualizar painel do aluno:', error.message);
            }
        }
        
        function addBadge(container, text, emoji, color) {
            try {
                const badge = document.createElement('div');
                badge.className = 'badge';
                badge.style.backgroundColor = color + '20';
                badge.style.border = `2px solid ${color}`;
                badge.innerHTML = `<span style="font-size: 1.5rem; margin-right: 8px;">${emoji}</span> ${text}`;
                container.appendChild(badge);
                triggerConfetti();
            } catch (error) {
                console.error('Erro ao adicionar badge:', error.message);
            }
        }
        
        function downloadCertificate() {
            try {
                if (progress.modulesCompleted.length === 5) {
                    const certificateText = "Certificado de Conclusão\n\nParabéns por completar todos os módulos do BCA Quiz!\n\nVocê aprendeu sobre dinheiro, poupança, orçamento e muito mais!\n\nData: 12/07/2025";
                    const blob = new Blob([certificateText], { type: 'text/plain' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'certificado.txt';
                    link.click();
                    triggerConfetti();
                }
            } catch (error) {
                console.error('Erro ao baixar certificado:', error.message);
            }
        }
        
        function startModule(moduleNumber) {
            try {
                currentModule = moduleNumber;
                const moduleMessages = [
                    "",
                    "Vamos aprender sobre o que é dinheiro e como ele funciona no nosso dia a dia! 🤑",
                    "Descubra as diferentes maneiras de ganhar dinheiro e o valor do trabalho! 💸",
                    "Aprenda a tomar decisões inteligentes sobre poupar ou gastar seu dinheiro! 🐷",
                    "Entenda como os bancos funcionam e como podem nos ajudar! 🏦",
                    "Planeje e alcance seus objetivos financeiros, seja um brinquedo novo ou poupança para o futuro! 🌟"
                ];
                alert(`Iniciando Módulo ${moduleNumber}: ${moduleMessages[moduleNumber]}`);
                showSection('quiz');
            } catch (error) {
                console.error('Erro ao iniciar módulo:', error.message);
            }
        }
        
        // Confetti Effect
        function triggerConfetti() {
            try {
                const canvas = document.getElementById('confetti-canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                const confettiCount = 100;
                const confetti = [];
                
                for (let i = 0; i < confettiCount; i++) {
                    confetti.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height - canvas.height,
                        r: Math.random() * 4 + 2,
                        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                        speed: Math.random() * 5 + 2,
                        angle: Math.random() * 360
                    });
                }
                
                function animateConfetti() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    confetti.forEach((c, i) => {
                        c.y += c.speed;
                        c.x += Math.sin(c.angle) * 2;
                        c.angle += 0.1;
                        
                        ctx.beginPath();
                        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
                        ctx.fillStyle = c.color;
                        ctx.fill();
                        
                        if (c.y > canvas.height) {
                            confetti.splice(i, 1);
                        }
                    });
                    
                    if (confetti.length > 0) {
                        requestAnimationFrame(animateConfetti);
                    }
                }
                
                animateConfetti();
                setTimeout(() => confetti.length = 0, 3000);
            } catch (error) {
                console.error('Erro ao gerar confetti:', error.message);
            }
        }
        
        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            try {
                userAnswers = new Array(quizQuestions.length).fill(null);
                showSection('home');
                
                document.querySelectorAll('.task-checkbox').forEach(checkbox => {
                    checkbox.addEventListener('change', function() {
                        try {
                            const label = this.nextElementSibling;
                            const taskItem = this.parentElement;
                            if (this.checked) {
                                label.style.textDecoration = 'line-through';
                                label.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
                                taskItem.classList.add('task-completed');
                                points += 5;
                                progress.points = points;
                                localStorage.setItem('progress', JSON.stringify(progress));
                                triggerConfetti();
                                updateStudentPanel();
                            } else {
                                label.style.textDecoration = 'none';
                                label.style.color = 'inherit';
                                taskItem.classList.remove('task-completed');
                                points -= 5;
                                progress.points = points;
                                localStorage.setItem('progress', JSON.stringify(progress));
                                updateStudentPanel();
                            }
                        } catch (error) {
                            console.error('Erro ao processar tarefa:', error.message);
                        }
                    });
                });
                
                window.addEventListener('resize', () => {
                    const canvas = document.getElementById('confetti-canvas');
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                });
            } catch (error) {
                console.error('Erro na inicialização:', error.message);
            }
        });
    