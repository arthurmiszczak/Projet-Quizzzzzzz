// Gestion du modal d'authentification
document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('authModal');
    const tabBtns = document.querySelectorAll('.auth-tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Gestion des tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Retirer active de tous les boutons et formes
            tabBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // Ajouter active au bouton et la forme correspondante
            this.classList.add('active');
            if (tabName === 'login') {
                loginForm.classList.add('active');
            } else {
                signupForm.classList.add('active');
            }
        });
    });

    // Gestion des formulaires
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simuler la connexion
        const email = this.querySelector('input[type="email"]').value;
        console.log('Connexion avec:', email);
        // Fermer le modal
        authModal.classList.add('hidden');
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simuler l'inscription
        const email = this.querySelector('input[type="email"]').value;
        console.log('Inscription avec:', email);
        // Fermer le modal
        authModal.classList.add('hidden');
    });
});
