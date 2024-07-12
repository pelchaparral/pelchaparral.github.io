document.addEventListener('DOMContentLoaded', () => {
    const products = {
        vermut: [
            { name: 'Cerveza', price: 1.5, quantity: 0 },
            { name: 'Cervezan Cañón', price: 2.5, quantity: 0 },
            { name: 'Cerveza Corto', price: 0.8, quantity: 0 },
            { name: 'Radler', price: 1.5, quantity: 0 },
            { name: 'Refrescos/zumos', price: 2, quantity: 0 },
            { name: 'Mosto', price: 1.2, quantity: 0 },
            { name: 'Verdejo', price: 1.5, quantity: 0 },
            { name: 'Tinto Crianza', price: 1.5, quantity: 0 },
            { name: 'Vino Claro', price: 1.2, quantity: 0 },
            { name: 'Agua', price: 1, quantity: 0 },
        
        ],
        noche: [
            { name: 'Vaso Retornable', price: 1, quantity: 0 },
            { name: 'Calimocho', price: 3, quantity: 0 },
            { name: 'Cachi Calimocho', price: 5, quantity: 0 },
            { name: 'Cachi Cerveza', price: 5, quantity: 0 },
            { name: 'Baileys / Whisky', price: 3.5, quantity: 0 },
            { name: 'Chupitos', price: 1.5, quantity: 0 },
            { name: 'Cubatas', price: 5.5, quantity: 0 },
            { name: 'Cachi Cubata', price: 15, quantity: 0 },
            { name: 'Marianito', price: 1.5, quantity: 0 },
            { name: 'Martini / Pacharán', price: 2, quantity: 0 },
        ]
    };

    function renderProducts(category) {
        const container = document.getElementById(category);
        container.innerHTML = '';
        products[category].forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <div>
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">${product.price.toFixed(2)}€</span>
                </div>
                <div class="product-controls">
                    <button class="${product.quantity > 0 ? 'button-nonzero' : 'button-zero'}" onclick="updateQuantity('${category}', ${index}, -1)">-</button>
                    <input type="number" value="${product.quantity}" onchange="setQuantity('${category}', ${index}, this.value)">
                    <button class="${product.quantity > 0 ? 'button-nonzero' : 'button-zero'}" onclick="updateQuantity('${category}', ${index}, 1)">+</button>
                </div>
            `;
            container.appendChild(productElement);
        });
        updateTotal();
    }

    window.updateQuantity = function(category, index, change) {
        products[category][index].quantity += change;
        if (products[category][index].quantity < 0) {
            products[category][index].quantity = 0;
        }
        renderProducts(category);
    }

    window.setQuantity = function(category, index, value) {
        const quantity = parseInt(value);
        if (!isNaN(quantity) && quantity >= 0) {
            products[category][index].quantity = quantity;
        }
        renderProducts(category);
    }

    window.openTab = function(category) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        document.getElementById(category).style.display = 'block';
        document.querySelectorAll('.tab-link').forEach(button => {
            button.classList.remove('tab-selected');
        });
        document.querySelector(`.tab-link-${category}`).classList.add('tab-selected');
        renderProducts(category);
    }

    function updateTotal() {
        let total = 0;
        Object.keys(products).forEach(category => {
            products[category].forEach(product => {
                total += product.quantity * product.price;
            });
        });
        document.getElementById('total-amount').textContent = total.toFixed(2) + '€';
        const totalAmountBottom = document.getElementById('total-amount');
        if (totalAmountBottom) {
            totalAmountBottom.textContent = total.toFixed(2) + '€';
        }
        if(document.getElementById('payment-input').value != ""){
            calculateChange();
        }
    }

    window.resetQuantities = function() {
        Object.keys(products).forEach(category => {
            products[category].forEach(product => {
                product.quantity = 0;
            });
        });
        renderProducts(document.querySelector('.tab-content:not([style*="display: none"])').id);
        document.getElementById('payment-input').value="";
        updateTotal();
        calculateChange();
    }

    window.calculateChange = function() {
        const totalAmountElement = document.getElementById('total-amount');
        const totalAmount = totalAmountElement ? parseFloat(totalAmountElement.textContent.replace('€', '')) : 0;
        const paymentInput = document.getElementById('payment-input').value.replace(',', '.');
        const paymentAmount = parseFloat(paymentInput) || 0;
        const change = paymentAmount - totalAmount;
        document.getElementById('change-amount').textContent = change.toFixed(2) + '€';
    }

    // document.getElementById('payment-input').addEventListener('input', function() {
    //     this.value = this.value.replace(/[^0-9.,]/g, '');
    // });

    window.toggleFullscreen = function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }


    // document.getElementById('payment-input').addEventListener('focus', function() {
    //     var footer = document.getElementsByClassName('payment-section')
    //     footer.style.position = 'fixed';
    //     footer.style.bottom = '10px';
    //     footer.style.left = '10px';
    //     footer.style.right = '10px';
    //     footer.style.zIndex = '1000';
    // });
    
    // document.getElementById('payment-input').addEventListener('blur', function() {
    //     var footer = document.getElementsByClassName('payment-section')
    //     footer.style.position = '';
    //     footer.style.bottom = '';
    //     footer.style.left = '';
    //     thfooteris.style.right = '';
    //     footer.style.zIndex = '';

    // });
    openTab('vermut');
});
