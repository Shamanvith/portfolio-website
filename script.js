// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//  Optional:  Simple scroll-to-top button
const footer = document.querySelector('footer');
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.classList.add('scroll-to-top');
scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.body.appendChild(scrollButton);

//  Show button after scrolling a bit
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollButton.classList.add('show');
    }