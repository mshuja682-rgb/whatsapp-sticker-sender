// Stickers aur emojis ki list
const stickers = [
    "😂", "❤", "🙏", "🔥", "🎉", "👍", "👋", "💯",
    "😎", "🤔", "😁", "🥳", "🤩", "😇", "🤗", "💪",
    "🎂", "🍕", "🍟", "🍔", "🌮", "🍿", "🥤", "🍦",
    "😸", "🐱", "🐶", "🦁", "🐸", "🦄", "🐝", "🦋",
    "😑", "❤", "🤯", "🔥", "🤬", "💔", "👀", "😍","😚",
    "🥰","👌", "😝", "💖", "🥱", "🤣", "💞", "🐣", "😈", "🧐",
   "😘","🎶","🥀",
];

const stickerContainer = document.getElementById('stickerContainer');
const selectedContainer = document.getElementById('selectedContainer');
const phoneInput = document.getElementById('phoneNumber');

// Har item ki quantity store karne ke liye array
let selectedItems = [];

// Sab stickers display karo
stickers.forEach(sticker => {
    const div = document.createElement('div');
    div.className = 'sticker-box';
    div.textContent = sticker;
    div.setAttribute('data-sticker', sticker);
    
    div.onclick = function() {
        addToSelection(sticker);
    };
    
    stickerContainer.appendChild(div);
});

// Selection mein add karne wala function
function addToSelection(item) {
    const existingIndex = selectedItems.findIndex(x => x.item === item);
    
    if (existingIndex > -1) {
        selectedItems[existingIndex].qty += 1;
    } else {
        selectedItems.push({ item: item, qty: 1 });
    }
    
    updateSelectedDisplay();
}

// Selected items display karne wala function
function updateSelectedDisplay() {
    selectedContainer.innerHTML = '';
    
    selectedItems.forEach((selected, index) => {
        const div = document.createElement('div');
        div.className = 'selected-item';
        
        // Sticker emoji
        const span = document.createElement('span');
        span.className = 'selected-emoji';
        span.textContent = selected.item;
        
        // Quantity label
        const label = document.createElement('div');
        label.className = 'qty-label';
        label.textContent = 'Qty:';
        
        // Quantity input
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.className = 'qty-input';
        qtyInput.value = selected.qty;
        qtyInput.min = 1;
        qtyInput.onchange = function() {
            updateQuantity(index, qtyInput.value);
        };
        
        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '✕';
        removeBtn.onclick = function() {
            removeFromSelection(index);
        };
        
        div.appendChild(span);
        div.appendChild(label);
        div.appendChild(qtyInput);
        div.appendChild(removeBtn);
        
        selectedContainer.appendChild(div);
    });
}

// Remove karne wala function
function removeFromSelection(index) {
    selectedItems.splice(index, 1);
    updateSelectedDisplay();
}

// Quantity badalne wala function
function updateQuantity(index, newQty) {
    newQty = parseInt(newQty);
    if (newQty < 1) newQty = 1;
    selectedItems[index].qty = newQty;
    updateSelectedDisplay();
}

// Text generate karne wala function
function generateText() {
    let fullText = '';
    
    selectedItems.forEach(selected => {
        for (let i = 0; i < selected.qty; i++) {
            fullText += selected.item + ' ';
        }
    });
    
    return fullText.trim();
}

// Copy to clipboard function (NAYA)
function copyToClipboard() {
    if (selectedItems.length === 0) {
        alert('please select stickers');
        return;
    }
    
    const text = generateText();
    
    navigator.clipboard.writeText(text).then(function() {
        alert('✅ copied!');
    }, function(err) {
        alert('copied error: ' + err);
    });
}

// WhatsApp bhejne wala function (Updated)
function sendToWhatsApp() {
    if (selectedItems.length === 0) {
        alert('Kuch stickers select karo!');
        return;
    }
    
    const text = generateText();
    const phone = phoneInput.value.trim();
    
    let whatsappUrl;
    
    if (phone) {
        // Specific contact par bhejne ke liye
        // Phone number se special characters hatao
        let cleanPhone = phone.replace(/[^0-9]/g, '');
        
        // Check if country code hai
        if (!cleanPhone.startsWith('92')) {
            // Agar 92 nahi hai to add karo (Pakistan)
            if (cleanPhone.startsWith('3')) {
                cleanPhone = '92' + cleanPhone;
            }
        }
        
        whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
    } else {
        // Bina number ke (new chat)
        whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    }
    
    window.open(whatsappUrl, '_blank');
}