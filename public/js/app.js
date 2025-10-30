// Frontend JavaScript for web_dashboard

class App {
    constructor() {
        this.apiUrl = '/api';
        this.init();
    }

    async init() {
        await this.loadStatus();
        this.setupEventListeners();
        setInterval(() => this.loadStatus(), 5000);
    }

    setupEventListeners() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleAction(action);
            });
        });
    }

    async loadStatus() {
        try {
            const response = await fetch(`${this.apiUrl}/status`);
            const data = await response.json();
            this.updateUI(data);
        } catch (error) {
            console.error('Error loading status:', error);
        }
    }

    async handleAction(action) {
        try {
            const response = await fetch(`${this.apiUrl}/${action}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            this.showNotification(data.message);
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Action failed', 'error');
        }
    }

    updateUI(data) {
        const statusEl = document.getElementById('status');
        if (statusEl) {
            statusEl.innerHTML = `
                <p><strong>Status:</strong> ${data.status}</p>
                <p><strong>Active:</strong> ${data.active}</p>
                <p><strong>Uptime:</strong> ${data.uptime}s</p>
            `;
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
