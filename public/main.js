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

    // Gestion des tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
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
    monBouton2.addEventListener('click', () => {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: Inputlogin2.value, password: Inputpassword2.value })
        }).then(response => response.text())
            .then(data => {
                reponse.textContent = data;
            });
    });

    monBouton.addEventListener('click', () => {
        console.log('login:', Inputlogin.value, 'password:', Inputpassword.value);
        console.log('login envoyé:', JSON.stringify(Inputlogin.value.trim()));
        console.log('password envoyé:', JSON.stringify(Inputpassword.value.trim()));
        fetch('/connexion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: Inputlogin.value.trim(), password: Inputpassword.value.trim() })
        }).then(response => response.json())
            .then(data => {
                alert(data.message);
                alert('ID utilisateur : ' + data.user.id);
                localStorage.setItem('userId', data.user.id);
                
            });
    });
});

