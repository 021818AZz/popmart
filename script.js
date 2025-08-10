// script.js

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://bd-1-tile.onrender.com';
    const userPhoneSpan = document.getElementById('user-phone');
    const userBalanceSpan = document.getElementById('user-balance');
    const depositButton = document.getElementById('deposit-button');
    const bankListSection = document.getElementById('bank-list');
    const banksUl = document.getElementById('banks');
    const depositFormSection = document.getElementById('deposit-form-section');
    const selectedBankNameH2 = document.getElementById('selected-bank-name');
    const bankIbanSpan = document.getElementById('bank-iban');
    const copyIbanButton = document.getElementById('copy-iban');
    const depositForm = document.getElementById('deposit-form');
    const amountInput = document.getElementById('amount');
    const proofInput = document.getElementById('proof');
    const messagesDiv = document.getElementById('messages');

    let userId = null; // To store user ID from /me endpoint

    const banksData = {
        bai: { name: 'BAI', iban: 'AO06.0000.0000.0000.0000.0000.0' },
        bfa: { name: 'BFA', iban: 'AO06.0000.0000.0000.0000.0000.0000.1' },
        bic: { name: 'BIC', iban: 'AO06.0000.0000.0000.0000.0000.0000.2' },
        atl: { name: 'ATL', iban: 'AO06.0000.0000.0000.0000.0000.0000.3' }
    };

    // Função para exibir mensagens de sucesso/erro
    function showMessage(message, type) {
        messagesDiv.textContent = message;
        messagesDiv.className = type; // 'success' ou 'error'
        setTimeout(() => {
            messagesDiv.textContent = '';
            messagesDiv.className = '';
        }, 5000);
    }

    // 1. Carregar token JWT e buscar dados do usuário
    async function fetchUserData() {
        const token = localStorage.getItem('token');
        if (!token) {
            showMessage('Token JWT não encontrado. Faça login.', 'error');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar dados do usuário: ${response.statusText}`);
            }

            const userData = await response.json();
            userId = userData.id; // Armazenar o ID do usuário
            userPhoneSpan.textContent = userData.phone;
            userBalanceSpan.textContent = `KZ ${new Intl.NumberFormat('pt-AO').format(userData.balance)}`;

        } catch (error) {
            showMessage(`Erro: ${error.message}`, 'error');
            console.error('Erro ao buscar dados do usuário:', error);
        }
    }

    // 2. Lidar com o botão Depositar
    depositButton.addEventListener('click', () => {
        bankListSection.style.display = 'block';
        depositFormSection.style.display = 'none';
    });

    // 3. Lidar com a seleção de banco
    banksUl.addEventListener('click', (event) => {
        const bankId = event.target.dataset.bankId;
        if (bankId && banksData[bankId]) {
            const bank = banksData[bankId];
            selectedBankNameH2.textContent = bank.name;
            bankIbanSpan.textContent = bank.iban;
            bankListSection.style.display = 'none';
            depositFormSection.style.display = 'block';
        }
    });

    // 4. Copiar IBAN
    copyIbanButton.addEventListener('click', () => {
        const iban = bankIbanSpan.textContent;
        navigator.clipboard.writeText(iban).then(() => {
            showMessage('IBAN copiado para a área de transferência!', 'success');
        }).catch(err => {
            showMessage('Erro ao copiar IBAN.', 'error');
            console.error('Erro ao copiar IBAN:', err);
        });
    });

    // 5. Enviar formulário de depósito
    depositForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = parseFloat(amountInput.value);
        const proofFile = proofInput.files[0];

        if (amount < 100) {
            showMessage('O valor mínimo para depósito é 100 KZ.', 'error');
            return;
        }

        if (!proofFile) {
            showMessage('Por favor, faça o upload do comprovante.', 'error');
            return;
        }

        if (!userId) {
            showMessage('ID do usuário não encontrado. Tente recarregar a página.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('amount', amount);
        formData.append('proof', proofFile);

        try {
            const response = await fetch(`${API_BASE_URL}/deposit`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ao enviar depósito: ${errorData.message || response.statusText}`);
            }

            const result = await response.json();
            showMessage('Depósito enviado com sucesso!', 'success');
            depositForm.reset();
            // Opcional: Atualizar saldo após depósito bem-sucedido
            fetchUserData();

        } catch (error) {
            showMessage(`Erro: ${error.message}`, 'error');
            console.error('Erro ao enviar depósito:', error);
        }
    });

    // Chamar a função para buscar dados do usuário ao carregar a página
    fetchUserData();
});


