/*
    INVENTORY SYSTEM - Versi Sederhana
    Untuk belajar SugarCube + JavaScript
*/

// ========== FUNGSI INVENTORY ==========

// Menambah item ke inventory
window.addItem = function (item) {
    // Beri ID unik ke item
    item.uid = Date.now();

    // Masukkan ke array inventory
    State.variables.inventory.push(item);
};

// Menghapus item dari inventory
window.removeItem = function (uid) {
    var inv = State.variables.inventory;

    // Cari posisi item
    for (var i = 0; i < inv.length; i++) {
        if (inv[i].uid === uid) {
            inv.splice(i, 1); // Hapus 1 item di posisi i
            break;
        }
    }
};

// Memakai senjata
window.equipWeapon = function (uid) {
    var inv = State.variables.inventory;

    // Cari senjata
    for (var i = 0; i < inv.length; i++) {
        if (inv[i].uid === uid && inv[i].type === 'weapon') {
            State.variables.equippedWeapon = inv[i];
            break;
        }
    }
};

// Melepas senjata
window.unequipWeapon = function () {
    State.variables.equippedWeapon = null;
};

// Menghitung total attack
window.getAttack = function () {
    var weapon = State.variables.equippedWeapon;

    if (weapon) {
        return 5 + weapon.attack; // 5 = base attack
    }
    return 5;
};

// ========== CUSTOM MACRO ==========

// Macro <<additem {objek}>>
Macro.add('additem', {
    handler: function () {
        window.addItem(clone(this.args[0]));
    }
});

// Macro <<equip uid>>
Macro.add('equip', {
    handler: function () {
        window.equipWeapon(this.args[0]);
    }
});
