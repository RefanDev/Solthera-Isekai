# 📚 Dokumentasi Script & CSS (Versi Sederhana)

---

## 🔧 SCRIPT.JS

### Konsep Dasar

**`window.namaFungsi`** = membuat fungsi yang bisa dipanggil dari Twee

**`State.variables.inventory`** = sama dengan `$inventory` di Twee

---

### Fungsi-Fungsi

#### 1. `addItem(item)` - Menambah item

```javascript
window.addItem = function(item) {
    item.uid = Date.now();                    // Buat ID unik
    State.variables.inventory.push(item);     // Masukkan ke array
};
```

**Cara pakai di Twee:**
```twee
<<run addItem({name: "Sword", type: "weapon", attack: 10})>>
```

---

#### 2. `removeItem(uid)` - Menghapus item

```javascript
window.removeItem = function(uid) {
    var inv = State.variables.inventory;
    
    for (var i = 0; i < inv.length; i++) {    // Loop semua item
        if (inv[i].uid === uid) {              // Kalau ketemu
            inv.splice(i, 1);                  // Hapus
            break;                             // Berhenti loop
        }
    }
};
```

**Penting:**
- `splice(i, 1)` = hapus 1 elemen di posisi `i`
- `break` = keluar dari loop

---

#### 3. `equipWeapon(uid)` - Memakai senjata

```javascript
window.equipWeapon = function(uid) {
    var inv = State.variables.inventory;
    
    for (var i = 0; i < inv.length; i++) {
        if (inv[i].uid === uid && inv[i].type === 'weapon') {
            State.variables.equippedWeapon = inv[i];
            break;
        }
    }
};
```

**Penting:**
- `&&` = DAN (kedua syarat harus benar)
- `State.variables.equippedWeapon` = `$equippedWeapon` di Twee

---

#### 4. `unequipWeapon()` - Melepas senjata

```javascript
window.unequipWeapon = function() {
    State.variables.equippedWeapon = null;   // null = kosong
};
```

---

#### 5. `getAttack()` - Hitung total serangan

```javascript
window.getAttack = function() {
    var weapon = State.variables.equippedWeapon;
    
    if (weapon) {
        return 5 + weapon.attack;   // Base + senjata
    }
    return 5;                       // Hanya base
};
```

**Cara pakai di Twee:**
```twee
Damage kamu: <<print getAttack()>>
```

---

### Custom Macro

#### `<<additem>>` - Lebih praktis dari `<<run>>`

```javascript
Macro.add('additem', {
    handler: function() {
        window.addItem(clone(this.args[0]));
    }
});
```

**Cara pakai:**
```twee
<<additem {name: "Potion", type: "consumable", healHp: 20}>>
```

---

#### `<<equip>>` - Memakai senjata

```javascript
Macro.add('equip', {
    handler: function() {
        window.equipWeapon(this.args[0]);
    }
});
```

**Cara pakai:**
```twee
<<equip $inventory[0].uid>>
```

---

## 🎨 STYLESHEET.CSS

### Konsep Dasar CSS

```css
selector {
    property: value;
}
```

| Selector | Artinya |
|----------|---------|
| `body` | Seluruh halaman |
| `#id` | Elemen dengan ID tersebut |
| `.class` | Elemen dengan class tersebut |
| `a` | Semua link |

---

### Penjelasan Tiap Bagian

#### 1. Warna Dasar

```css
body {
    background: #1a1a2e;     /* Warna latar belakang */
    color: #fff;             /* Warna teks (putih) */
    font-family: Arial;      /* Jenis huruf */
}
```

---

#### 2. Link / Pilihan

```css
a {
    color: #00d4ff;          /* Warna link (biru) */
    text-decoration: none;   /* Hilangkan garis bawah */
}

a:hover {                    /* Saat mouse di atas link */
    color: #fff;
    text-decoration: underline;
}
```

---

#### 3. Menyembunyikan UI Bawaan

```css
#ui-bar {
    display: none;           /* Sembunyikan sidebar bawaan */
}
```

---

#### 4. Konten Utama

```css
#story {
    max-width: 700px;        /* Lebar maksimal */
    margin: 0 auto;          /* Tengah horizontal */
    padding: 20px;           /* Jarak dalam */
}
```

**Catatan:** `margin: 0 auto` artinya:
- `0` = atas dan bawah
- `auto` = kiri dan kanan (otomatis tengah)

---

#### 5. Box Info

```css
.info-box {
    background: #16213e;
    border: 1px solid #0f3460;
    border-radius: 8px;      /* Sudut melengkung */
    padding: 15px;
    margin: 10px 0;
}
```

**Cara pakai di Twee:**
```html
<div class="info-box">
HP: $player.hp / $player.maxHp
</div>
```

---

#### 6. Bar HP/Energy

```css
.stat-bar {
    height: 20px;
    background: #333;        /* Warna kosong */
    border-radius: 10px;
    overflow: hidden;        /* Potong yang keluar */
}

.stat-bar .fill {
    height: 100%;
    background: #ff4444;     /* Warna isi (merah) */
}

.stat-bar.energy .fill {
    background: #ffc107;     /* Kuning untuk energy */
}
```

**Cara pakai di Twee:**
```html
<div class="stat-bar">
    <div class="fill" style="width: <<print ($player.hp / $player.maxHp * 100)>>%"></div>
</div>
```

---

#### 7. Tombol

```css
button {
    background: #0f3460;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;         /* Kursor jadi tangan */
}

button:hover {
    background: #00d4ff;
    color: #000;
}
```

---

## 📝 RINGKASAN

### JavaScript

| Fungsi | Kegunaan |
|--------|----------|
| `addItem(item)` | Tambah item |
| `removeItem(uid)` | Hapus item |
| `equipWeapon(uid)` | Pakai senjata |
| `unequipWeapon()` | Lepas senjata |
| `getAttack()` | Hitung damage |

### Macro

| Macro | Contoh |
|-------|--------|
| `<<additem {...}>>` | Tambah item via Twee |
| `<<equip uid>>` | Pakai senjata via Twee |

### CSS

| Property | Artinya |
|----------|---------|
| `background` | Warna latar |
| `color` | Warna teks |
| `padding` | Jarak dalam |
| `margin` | Jarak luar |
| `border-radius` | Sudut bulat |
| `display: none` | Sembunyikan |

---

## 🎮 CONTOH LENGKAP

### Di Base.tw

```twee
:: StoryInit
<<set $inventory = []>>
<<set $equippedWeapon = null>>
<<set $player = {hp: 100, maxHp: 100, energy: 50, maxEnergy: 50}>>
```

### Di Passage

```twee
:: Hutan
<h1>Hutan Misterius</h1>

<div class="info-box">
❤️ HP: $player.hp / $player.maxHp
</div>

Kamu menemukan pedang berkarat!

<<additem {name: "Rusty Sword", type: "weapon", attack: 5, icon: "🗡️"}>>

[[Ambil pedang itu->Ambil Pedang]]
[[Abaikan->Jalan Lain]]
```

---

**Selesai! Dokumentasi ini jauh lebih sederhana untuk dipelajari.**
