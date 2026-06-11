
// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Evita comportamento padrão se for apenas "#" ou link vazio
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Atualiza a URL sem recarregar a página (opcional)
            history.pushState(null, null, targetId);
        }
    });
});

// ===== BOTÃO CTA COM ALERTA INTERATIVO =====
const ctaButton = document.getElementById('ctaButton');
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Cria um elemento de notificação temporária
        const notification = document.createElement('div');
        notification.textContent = '🌱 Obrigado por se comprometer com um futuro sustentável! 🌍';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #165e28;
            color: white;
            padding: 16px 24px;
            border-radius: 48px;
            font-weight: 600;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            font-family: 'Inter', sans-serif;
        `;
        
        document.body.appendChild(notification);
        
        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    });
}

// ===== ANIMAÇÃO DE ENTRADA PARA CARDS (SCROLL REVEAL SIMPLES) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplica animação aos cards e itens de desafio
document.querySelectorAll('.card, .desafio-item, .equilibrio-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== HEADER SCROLL EFFECT (MUDA OPACIDADE) =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = '#0a3217';
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = '#0a3217';
        header.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// ===== ANIMAÇÃO CSS PARA NOTIFICAÇÃO =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== LOG NO CONSOLE (APENAS PARA INSPEÇÃO) =====
console.log('🌱 Agro Forte, Futuro Sustentável - Site carregado com sucesso!');
