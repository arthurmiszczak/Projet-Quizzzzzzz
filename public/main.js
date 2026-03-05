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

    // Créer le bouton déconnexion
    const decoBtn = document.createElement('button');
    decoBtn.textContent = 'Déconnexion';
    decoBtn.style.cssText = `
        position: fixed;
        top: 16px;
        right: 16px;
        background: #ef4444;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        z-index: 999;
        transition: background 0.2s ease;
    `;
    decoBtn.addEventListener('mouseover', () => decoBtn.style.background = '#dc2626');
    decoBtn.addEventListener('mouseout', () => decoBtn.style.background = '#ef4444');
    document.body.appendChild(decoBtn);

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
    monBouton2.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: Inputlogin2.value, password: Inputpassword2.value })
        }).then(response => response.json())
            .then(data => {
                alert(data.message);
            });
    });

    monBouton.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/connexion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: Inputlogin.value.trim(), password: Inputpassword.value.trim() })
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