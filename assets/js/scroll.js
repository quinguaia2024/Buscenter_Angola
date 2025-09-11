document.querySelectorAll('a.sscroll-link').forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute('href'));
        alvo.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
  });
});
const headerHeight = document.querySelector('header').offsetHeight;
window.scrollTo({
        top:alvo.offsetTop - headerHeight, behavior: 'smooth'
    });
    window.addEventListener('load', () => {
  document.querySelectorAll('.section').forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), i * 150); // delay para cada seção
  });
});


 