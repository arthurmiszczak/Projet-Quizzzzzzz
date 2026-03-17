// Gestion du modal d'authentification
document.addEventListener('DOMContentLoaded', function () {
    
    const authModal = document.getElementById('authModal');
    const tabBtns = document.querySelectorAll('.auth-tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const Inputlogin = document.getElementById('login');
    const Inputpassword = document.getElementById('password');
    const Inputlogin2 = document.getElementById('login2');
    const Inputpassword2 = document.getElementById('password2');
    const monBouton = document.getElementById('monBouton');
    const monBouton2 = document.getElementById('monBouton2');
    const decoBtn = document.getElementById('decoBtn');

    // Vérifier si connecté
    if (localStorage.getItem('userId')) {
        authModal.classList.add('hidden');
        decoBtn.style.display = 'block';
    } else {
        authModal.classList.remove('hidden');
        decoBtn.style.display = 'none';
    }

    // Déconnexion
    decoBtn.addEventListener('click', () => {
        localStorage.removeItem('userId');
        authModal.classList.remove('hidden');
        decoBtn.style.display = 'none';
    });

    // Gestion des tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabName = this.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            this.classList.add('active');
            if (tabName === 'login') {
                loginForm.classList.add('active');
            } else {
                signupForm.classList.add('active');
            }
        });
    });

    // Gestion des formulaires
    monBouton2.addEventListener('click', () => {
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: Inputlogin2.value, password: Inputpassword2.value })
        }).then(response => response.json())
            .then(data => {
                alert(data.message);
            });
    });

    monBouton.addEventListener('click', () => {
        fetch('/connexion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: Inputlogin.value, password: Inputpassword.value })
        }).then(response => response.json())
            .then(data => {
                if (data.user) {
                    localStorage.setItem('userId', data.user.id);
                    authModal.classList.add('hidden');
                    decoBtn.style.display = 'block';
                } else {
                    alert(data.message);
                }
            });
    });
});