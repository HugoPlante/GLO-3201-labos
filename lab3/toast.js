export class Toast {
    constructor(type, text, container) {
        this.type = type;
        this.text = text;
        this.container = container;
    }

    createToastElement() {
        const toast = document.createElement('div');
        toast.className = `toast-${this.type} toast`;
        const toastText = document.createElement('div');
        toastText.className = 'toast-text';
        toastText.textContent = this.text || 'Default Toast';
        toast.appendChild(this.getIcon());
        toast.appendChild(toastText);
        return toast;
    }

    toast() {
        const toast = this.createToastElement();

        this.container.appendChild(toast);
        setTimeout(() => {
            toast.remove()
        }, 3000)
    }

    getIcon() {
        const icon = document.createElement('img');
        icon.className = 'icon';
        switch (this.type) {
            case 'success':
                icon.src = './icons/success.svg';
                return icon;
            case 'error':
                icon.src = './icons/error.svg';
                return icon;
            case 'info':
                icon.src = './icons/info.svg';
                return icon;
            default:
                return icon;
        }
    }


}

