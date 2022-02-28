const Confirm = {
    open(options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'Ok',
            cancelText: 'Cancel',
            onOk: function() {},
            onCancel: function() {}
        }, options)

        const html = `
            <div class="confirmar">
                <div class="confirmar__window">
                    <div class="confirmar__titlebar">
                        <span class="confirmar__title">${options.title}</span>
                        <button class="confirmar__close">&times;</button>
                    </div>
                    <div class="confirmar__content">${options.message}</div>
                    <div class="confirmar__buttons">
                        <button class="confirmar__button confirmar__button--ok confirmar__button--fill">${options.okText}</button>
                        <button class="confirmar__button confirmar__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>`;

        const template = document.createElement('template');
        template.innerHTML = html;
        
        const confirmElement = template.content.querySelector('.confirmar');
        const btnClose = template.content.querySelector('.confirmar__close');
        const btnOk = template.content.querySelector('.confirmar__button--ok');
        const btnCancel = template.content.querySelector('.confirmar__button--cancel');
         
        confirmElement.addEventListener('click', (e) => {
            if(e.target === confirmElement) {
                options.onCancel();
                this._close(confirmElement)
            }
        })

        btnOk.addEventListener('click', e=> {
            options.onOk();
            this._close(confirmElement)
        })

        btnClose.addEventListener('click', () => {
            options.onCancel();
            this._close(confirmElement);
        });
        btnCancel.addEventListener('click', () => {
            options.onCancel();
            this._close(confirmElement);
        });

        document.body.appendChild(template.content)
    },
    _close(confirmEl) {
        confirmEl.classList.add('confirmar__close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl); 
        });
    },

}