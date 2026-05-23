// Stickers aur emojis ki list
const stickers = [
    "😂", "❤", "😍", "🔥", "🎉", "👍", "👋", "💯",
    "😎", "🤔", "😁", "🥳", "🤩", "😇", "🤗", "💪",
    "🎂", "🍕", "🍟", "🍔", "🌮", "🍿", "🥤", "🍦",
    "👌", "😝", "💖", "🥱", "🤣", "💞", "🐣", "😈",
    "😎𝓛𝓘𝓕𝓔 AT 6:00𝓐𝓜😎", "𝓢𝓞𝓜𝓣𝓗𝓘𝓝𝓖 𝓦𝓔𝓝𝓣 𝓦𝓡𝓞𝓝𝓖😁",
];

const stickerContainer = document.getElementById('stickerContainer');
const selectedContainer = document.getElementById('selectedContainer');

// Har item ki quantity store karne ke liye array
// Format: { item: "😂", qty: 1 }
let selectedItems = [];

// Sab stickers display karo
stickers.forEach(sticker => {
    const div = document.createElement('div');
    div.className = 'sticker-box';
    div.textContent = sticker;
    
    div.onclick = function() {
        addToSelection(sticker);
    };
    
    stickerContainer.appendChild(div);
});

// Selection mein add karne wala function
function addToSelection(item) {
    // Check karo agar pehle se hai
    const existingIndex = selectedItems.findIndex(x => x.item === item);
    
    if (existingIndex > -1) {
        // Agar hai, to quantity badhao
        selectedItems[existingIndex].qty += 1;
    } else {
        // Agar nahi hai, to add karo
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
        span.style.fontSize = '40px';
        span.textContent = selected.item;
        
        // Quantity badge
        const qtyBadge = document.createElement('span');
        qtyBadge.className = 'qty-badge';
        qtyBadge.textContent = selected.qty;
        
        // Remove button (X)
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '✕';
        removeBtn.onclick = function() {
            removeFromSelection(index);
        };
        
        // Quantity input (badalne ke liye)
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.className = 'qty-input';
        qtyInput.value = selected.qty;
        qtyInput.min = 1;
        qtyInput.style.display = 'block';
        qtyInput.style.margin = '5px auto';
        qtyInput.onchange = function() {
            updateQuantity(index, qtyInput.value);
        };
        
        div.appendChild(span);
        div.appendChild(qtyBadge);
        div.appendChild(qtyInput);
        div.appendChild(removeBtn);
        
        selectedContainer.appendChild(div);
    });
}

// Selection se remove karne wala function (AB WORKING!)
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

// WhatsApp bhejne wala function
function sendToWhatsApp() {
    if (selectedItems.length === 0) {
        alert('Kuch stickers ya emojis select karo!');
        return;
    }
    
    // Text banana hai - har item ko uski quantity bar repeat karo
    let fullText = '';
    
    selectedItems.forEach(selected => {
        for (let i = 0; i < selected.qty; i++) {
            fullText += selected.item + ' ';
        }
    });
    
    let text = encodeURIComponent(fullText.trim());
    
    // WhatsApp Mobile App link
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
    
    window.open(whatsappUrl, '_blank');
}

alert('App ready hai! Ab stickers select karo, quantity badlo aur WhatsApp bhejo!');