const API_URL = 'http://localhost:3000';
let isBackendOnline = false;

// ===== ELEMENTOS =====
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const togglePassword = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const loginLoading = document.getElementById('loginLoading');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const backendStatus = document.getElementById('backendStatus');
const dbStatus = document.getElementById('dbStatus');

document.addEventListener('DOMContentLoaded', checkSystemStatus);

// ===== MOSTRAR / OCULTAR SENHA =====
if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        const type = senhaInput.type === 'password' ? 'text' : 'password';
        senhaInput.type = type;
        togglePassword.innerHTML =
            type === 'password'
                ? '<i class="fas fa-eye"></i>'
                : '<i class="fas fa-eye-slash"></i>';
    });
}

// ===== STATUS DO SISTEMA =====
async function checkSystemStatus() {
    try {
        const res = await fetch(`${API_URL}/api/health`);
        if (res.ok) {
            backendStatus.textContent = 'Online ✓';
            backendStatus.style.color = '#27ae60';
            dbStatus.textContent = 'Conectado ✓';
            dbStatus.style.color = '#27ae60';
            isBackendOnline = true;
        } else {
            throw new Error();
        }
    } catch {
        backendStatus.textContent = 'Offline ✗';
        backendStatus.style.color = '#e74c3c';
        dbStatus.textContent = 'Desconectado ✗';
        dbStatus.style.color = '#e74c3c';
        showError('Backend offline. Inicie o servidor.');
    }
}

// ===== LOGIN =====
async function fazerLogin(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
        showError('Preencha todos os campos.');
        return;
    }

    if (!isValidEmail(email)) {
        showError('E-mail inválido.');
        return;
    }

    setLoadingState(true);

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await res.json();

        if (!res.ok) {
            showError(data.erro || 'Erro no login.');
            setLoadingState(false);
            return;
        }

        // ===== SALVAR LOGIN =====
        localStorage.setItem('token', data.token);
        localStorage.setItem('tipo', data.tipo);
        localStorage.setItem('email', email);

        showSuccess('Login realizado com sucesso!');

        setTimeout(() => {
            redirectToDashboard(data.tipo);
        }, 1500);

    } catch (err) {
        showError('Erro de conexão com o servidor.');
        setLoadingState(false);
    }
}

// ===== REDIRECIONAMENTO =====
function redirectToDashboard(tipo) {
    const rotas = {
        admin: 'admin.html',
        professor: 'professor.html',
        aluno: 'aluno.html'
    };
    window.location.href = rotas[tipo] || 'login.html';
}

// ===== UI =====
function showError(msg) {
    document.getElementById('errorText').textContent = msg;
    errorMessage.style.display = 'flex';
    successMessage.style.display = 'none';
}

function showSuccess(msg) {
    document.getElementById('successText').textContent = msg;
    successMessage.style.display = 'flex';
    errorMessage.style.display = 'none';
}

function setLoadingState(loading) {
    loginText.style.display = loading ? 'none' : 'flex';
    loginLoading.style.display = loading ? 'flex' : 'none';
    loginBtn.disabled = loading;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== EVENTO =====
loginForm.addEventListener('submit', fazerLogin);
