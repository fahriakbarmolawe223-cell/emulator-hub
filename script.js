/* ═══════════════════════════════════════════════════════════════
   NexusPlay — Universal Emulator Hub
   script.js — Navigasi Keyboard, Gamepad API, UI Logic

   CARA MEMBACA KODE INI (untuk pemula):
   Kode dibagi menjadi bagian bernomor. Baca dari atas ke bawah.
   Setiap bagian punya penjelasan singkat di atasnya.
   ═══════════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════════
   BAGIAN 1 — DATA LIBRARY
   Ini adalah "database" game kamu.
   Untuk MENAMBAH platform baru: copy satu blok {} dan edit.
   Untuk MENAMBAH game: tambah item di array "games".
   Untuk URL: tempel link emulator web pihak ketiga.
               Gunakan '#' jika link belum tersedia.
══════════════════════════════════════════════════════════════ */
const LIBRARY = [
  {
    id: 'nes',
    name: 'NES',
    fullName: 'Nintendo Entertainment System',
    year: '1983',
    color: '#e05a6a',    // Warna dot di sidebar
    games: [
      { id: 'smb',      title: 'Super Mario Bros.',     year: '1985', genre: 'Platformer', icon: '🍄', url: 'https://www.retrogames.cc/embed/40310-super-mario-bros-usa.html' },
      { id: 'zelda',    title: 'The Legend of Zelda',   year: '1986', genre: 'Adventure',  icon: '🗡️', url: '#' },
      { id: 'contra',   title: 'Contra',                year: '1988', genre: 'Action',     icon: '🔫', url: '#' },
      { id: 'megaman2', title: 'Mega Man 2',            year: '1988', genre: 'Action',     icon: '🤖', url: '#' },
      { id: 'tetris',   title: 'Tetris',                year: '1989', genre: 'Puzzle',     icon: '🟦', url: '#' },
      { id: 'dkong',    title: 'Donkey Kong',           year: '1983', genre: 'Arcade',     icon: '🦍', url: '#' },
    ]
  },
  {
    id: 'snes',
    name: 'SNES',
    fullName: 'Super Nintendo',
    year: '1990',
    color: '#9b7fd4',
    games: [
      { id: 'smw',   title: 'Super Mario World',       year: '1990', genre: 'Platformer', icon: '🦕', url: '#' },
      { id: 'alttp', title: 'A Link to the Past',      year: '1991', genre: 'Adventure',  icon: '🏺', url: '#' },
      { id: 'sf2',   title: 'Street Fighter II Turbo', year: '1993', genre: 'Fighting',   icon: '🥊', url: '#' },
      { id: 'dkc',   title: 'Donkey Kong Country',     year: '1994', genre: 'Platformer', icon: '🍌', url: '#' },
      { id: 'smk',   title: 'Super Mario Kart',        year: '1992', genre: 'Racing',     icon: '🏎️', url: '#' },
      { id: 'ff6',   title: 'Final Fantasy VI',        year: '1994', genre: 'RPG',        icon: '⚔️', url: '#' },
    ]
  },
  {
    id: 'gba',
    name: 'GBA',
    fullName: 'Game Boy Advance',
    year: '2001',
    color: '#7ecfcc',
    games: [
      { id: 'poke-fr',    title: 'Pokémon FireRed',     year: '2004', genre: 'RPG',       icon: '🔥', url: '#' },
      { id: 'minish',     title: 'The Minish Cap',      year: '2004', genre: 'Adventure', icon: '🗺️', url: '#' },
      { id: 'metroid-f',  title: 'Metroid Fusion',      year: '2002', genre: 'Action',    icon: '🌌', url: '#' },
      { id: 'castlevania',title: 'Castlevania: AoS',    year: '2003', genre: 'Action',    icon: '🏰', url: '#' },
      { id: 'wario',      title: 'WarioWare Inc.',      year: '2003', genre: 'Party',     icon: '🍒', url: '#' },
      { id: 'gba-ff6',    title: 'Final Fantasy VI Adv',year: '2006', genre: 'RPG',       icon: '🧙', url: '#' },
    ]
  },
  {
    id: 'ps1',
    name: 'PS1',
    fullName: 'PlayStation',
    year: '1994',
    color: '#4ab8d8',
    games: [
      { id: 'ff7',     title: 'Final Fantasy VII',  year: '1997', genre: 'RPG',       icon: '🌀', url: '#' },
      { id: 'mgs',     title: 'Metal Gear Solid',   year: '1998', genre: 'Stealth',   icon: '🎭', url: '#' },
      { id: 'crash',   title: 'Crash Bandicoot',    year: '1996', genre: 'Platformer',icon: '🐾', url: '#' },
      { id: 'spyro',   title: 'Spyro the Dragon',   year: '1998', genre: 'Platformer',icon: '🐉', url: '#' },
      { id: 'tekken3', title: 'Tekken 3',           year: '1998', genre: 'Fighting',  icon: '👊', url: '#' },
      { id: 're1',     title: 'Resident Evil',      year: '1996', genre: 'Horror',    icon: '🧟', url: '#' },
    ]
  },
  {
    id: 'n64',
    name: 'N64',
    fullName: 'Nintendo 64',
    year: '1996',
    color: '#6abf8a',
    games: [
      { id: 'sm64',      title: 'Super Mario 64',    year: '1996', genre: 'Platformer',icon: '⭐', url: '#' },
      { id: 'oot',       title: 'Ocarina of Time',   year: '1998', genre: 'Adventure', icon: '🎵', url: '#' },
      { id: 'mk64',      title: 'Mario Kart 64',     year: '1996', genre: 'Racing',    icon: '🏁', url: '#' },
      { id: 'goldeneye', title: 'GoldenEye 007',     year: '1997', genre: 'FPS',       icon: '🔱', url: '#' },
      { id: 'starfox',   title: 'Star Fox 64',       year: '1997', genre: 'Shooter',   icon: '🚀', url: '#' },
      { id: 'smash64',   title: 'Super Smash Bros.', year: '1999', genre: 'Fighting',  icon: '💥', url: '#' },
    ]
  },
  {
    id: 'genesis',
    name: 'Genesis',
    fullName: 'Sega Mega Drive',
    year: '1988',
    color: '#d4a96a',
    games: [
      { id: 'sonic1',  title: 'Sonic the Hedgehog',   year: '1991', genre: 'Platformer', icon: '💨', url: '#' },
      { id: 'sonic2',  title: 'Sonic the Hedgehog 2', year: '1992', genre: 'Platformer', icon: '💫', url: '#' },
      { id: 'sor2',    title: 'Streets of Rage 2',    year: '1992', genre: 'Beat em up', icon: '🥋', url: '#' },
      { id: 'comix',   title: 'Comix Zone',           year: '1995', genre: 'Action',     icon: '📖', url: '#' },
      { id: 'aladdin', title: 'Aladdin',              year: '1993', genre: 'Platformer', icon: '🧞', url: '#' },
      { id: 'toejam',  title: 'ToeJam & Earl',        year: '1991', genre: 'RPG',        icon: '👽', url: '#' },
    ]
  },
];


/* ══════════════════════════════════════════════════════════════
   BAGIAN 2 — STATE (KONDISI APLIKASI)

   Bayangkan state seperti "ingatan" aplikasi saat ini.
   Semua perubahan navigasi mengubah nilai di sini,
   lalu updateFocus() menerapkan perubahan ke layar.
══════════════════════════════════════════════════════════════ */
const state = {
  panel: 'platforms',        // 'platforms' | 'games' — panel mana yang aktif
  platformIdx: 0,            // Nomor platform yang kursor sedang berada
  gameIdx: 0,                // Nomor game yang kursor sedang berada
  selectedPlatformId: null,  // ID platform yang game-nya sedang ditampilkan
  COLS: 3,                   // Jumlah kolom di game grid (jangan ubah tanpa edit CSS grid)
};


/* ══════════════════════════════════════════════════════════════
   BAGIAN 3 — REFERENSI DOM

   Kita simpan semua "alamat" elemen HTML di sini.
   Lebih efisien daripada mencari ulang setiap saat.
   $ adalah shortcut untuk document.getElementById()
══════════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);

const DOM = {
  platformList:      $('platform-list'),
  gameGrid:          $('game-grid'),
  emptyHint:         $('empty-hint'),
  platformFullname:  $('platform-fullname'),
  platformYearBadge: $('platform-year-badge'),
  gameCount:         $('game-count'),
  breadcrumb:        $('platform-breadcrumb'),
  gamepadStatus:     $('gamepad-status'),
  gamepadBadgeText:  $('gamepad-badge-text'),
  clock:             $('clock'),
  // Modal
  launchModal:       $('launch-modal'),
  modalBackdrop:     $('modal-backdrop'),
  modalPlatformTag:  $('modal-platform-tag'),
  modalTitle:        $('modal-title'),
  modalGenre:        $('modal-genre'),
  modalYear:         $('modal-year'),
  btnNewTab:         $('btn-new-tab'),
  btnEmbed:          $('btn-embed'),
  btnCancel:         $('btn-cancel'),
  // Embed
  embedOverlay:      $('embed-overlay'),
  embedTitle:        $('embed-title'),
  embedFrame:        $('game-frame'),
  btnExitEmbed:      $('btn-exit-embed'),
  btnFullscreenEmbed:$('btn-fullscreen-embed'),
};

// Referensi current game untuk modal
let currentGameData = null;


/* ══════════════════════════════════════════════════════════════
   BAGIAN 4 — RENDER FUNCTIONS

   Fungsi-fungsi yang "menggambar" elemen HTML.
   Menggunakan template literals (backtick `...`) untuk
   membuat HTML string dari data, lalu memasukkan ke DOM.
══════════════════════════════════════════════════════════════ */

/** Render semua item platform di sidebar (dipanggil sekali saat init) */
function renderPlatforms() {
  DOM.platformList.innerHTML = LIBRARY.map((p, i) =>
    `<li class="platform-item"
         data-index="${i}"
         role="option"
         aria-label="${p.fullName}">
       <span class="platform-dot" style="--color:${p.color}"></span>
       <span class="platform-name">${p.fullName}</span>
       <span class="platform-shortname">${p.name}</span>
     </li>`
  ).join('');

  // Pasang listener klik mouse pada setiap item platform
  DOM.platformList.querySelectorAll('.platform-item').forEach(el => {
    el.addEventListener('click', () => {
      state.platformIdx = parseInt(el.dataset.index);
      selectPlatform();
    });
  });
}

/** Render grid game untuk platform yang dipilih */
function renderGames(platform) {
  // Update info header
  DOM.platformFullname.textContent  = platform.fullName;
  DOM.platformYearBadge.textContent = `EST. ${platform.year}`;
  DOM.gameCount.textContent         = `${platform.games.length} TITLES`;

  // Sembunyikan empty hint, tampilkan grid
  DOM.emptyHint.classList.add('hidden');
  DOM.gameGrid.classList.remove('hidden');

  // Buat HTML card untuk setiap game
  DOM.gameGrid.innerHTML = platform.games.map((g, i) =>
    `<div class="game-card"
          data-index="${i}"
          role="gridcell"
          aria-label="${g.title}">
       <span class="card-num">${String(i + 1).padStart(2, '0')}</span>
       <div class="card-icon">${g.icon}</div>
       <div class="card-title">${g.title}</div>
       <div class="card-meta">
         <span class="card-year">${g.year}</span>
         <span class="card-genre">${g.genre}</span>
       </div>
       <div class="card-launch-hint">▶</div>
     </div>`
  ).join('');

  // Pasang listener klik mouse pada setiap card
  DOM.gameGrid.querySelectorAll('.game-card').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.index);
      if (state.panel !== 'games') {
        // Pertama kali masuk panel games via klik
        state.panel    = 'games';
        state.gameIdx  = idx;
        updateFocus();
      } else if (state.gameIdx === idx) {
        // Klik game yang sudah difokus = launch
        launchGame();
      } else {
        // Pindah fokus ke game yang diklik
        state.gameIdx = idx;
        updateFocus();
      }
    });
  });
}

/**
 * updateFocus() — Otak dari sistem navigasi visual.
 * Fungsi ini membaca state lalu menerapkan class CSS
 * yang tepat ke elemen yang benar di DOM.
 * Dipanggil setiap kali navigasi bergerak.
 */
function updateFocus() {
  const currentPlatform = LIBRARY[state.platformIdx];

  // ── Update CSS class di platform items ──
  document.querySelectorAll('.platform-item').forEach((el, i) => {
    const p = LIBRARY[i];
    el.classList.toggle('focused',  i === state.platformIdx && state.panel === 'platforms');
    el.classList.toggle('selected', p.id === state.selectedPlatformId);
  });

  // ── Update CSS class di game cards ──
  document.querySelectorAll('.game-card').forEach((el, i) => {
    el.classList.toggle('focused', i === state.gameIdx && state.panel === 'games');
  });

  // ── Update warna aksen sesuai platform aktif (CSS variable) ──
  if (currentPlatform) {
    document.documentElement.style.setProperty('--platform-color', currentPlatform.color);
  }

  // ── Update teks breadcrumb di header ──
  DOM.breadcrumb.textContent = state.panel === 'games' && currentPlatform
    ? `${currentPlatform.fullName} › SELECT GAME`
    : 'SELECT PLATFORM';

  // ── Scroll otomatis agar item fokus selalu terlihat ──
  const focusedPlatform = DOM.platformList.querySelector('.platform-item.focused');
  focusedPlatform?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

  const focusedGame = DOM.gameGrid.querySelector('.game-card.focused');
  focusedGame?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}


/* ══════════════════════════════════════════════════════════════
   BAGIAN 5 — LOGIKA NAVIGASI

   Semua "gerakan" kursor diproses di sini.
   Polanya selalu sama:
   1. Terima arah (up/down/left/right/confirm/back)
   2. Hitung posisi baru
   3. Update state
   4. Panggil updateFocus() atau selectPlatform()
══════════════════════════════════════════════════════════════ */

/** Pilih platform dan render game-game-nya */
function selectPlatform() {
  const p = LIBRARY[state.platformIdx];
  if (!p) return;

  state.selectedPlatformId = p.id;
  state.gameIdx = 0;   // Reset posisi game saat ganti platform

  renderGames(p);
  updateFocus();
}

/** Masuk ke panel games */
function enterGamesPanel() {
  const p = LIBRARY[state.platformIdx];
  if (!p || p.games.length === 0) return;
  if (!state.selectedPlatformId) selectPlatform();

  state.panel   = 'games';
  state.gameIdx = 0;
  updateFocus();
}

/** Kembali ke panel platforms */
function backToPlatforms() {
  state.panel = 'platforms';
  updateFocus();
}

/** Buka modal launch untuk game yang sedang difokus */
function launchGame() {
  const p = LIBRARY.find(pl => pl.id === state.selectedPlatformId);
  if (!p) return;
  const game = p.games[state.gameIdx];
  if (!game) return;
  openModal(p, game);
}

/**
 * navigate(dir) — TITIK MASUK UTAMA untuk semua input
 * Baik keyboard maupun gamepad memanggil fungsi ini.
 * @param {'up'|'down'|'left'|'right'|'confirm'|'back'} dir
 */
function navigate(dir) {
  if (state.panel === 'platforms') {
    navigatePlatforms(dir);
  } else {
    navigateGames(dir);
  }
}

function navigatePlatforms(dir) {
  const maxIdx = LIBRARY.length - 1;

  if (dir === 'up') {
    if (state.platformIdx > 0) {
      state.platformIdx--;
      selectPlatform();   // Langsung tampilkan game platform baru
    }
  } else if (dir === 'down') {
    if (state.platformIdx < maxIdx) {
      state.platformIdx++;
      selectPlatform();
    }
  } else if (dir === 'right' || dir === 'confirm') {
    enterGamesPanel();
  }
  // 'left' dan 'back' tidak melakukan apa-apa di panel platforms
}

function navigateGames(dir) {
  const p = LIBRARY.find(pl => pl.id === state.selectedPlatformId);
  if (!p) return;

  const total = p.games.length;
  const cols  = state.COLS;
  const col   = state.gameIdx % cols;

  if (dir === 'right') {
    // Bisa bergerak kanan jika: bukan kolom terakhir DAN masih ada game
    if (col < cols - 1 && state.gameIdx + 1 < total) {
      state.gameIdx++;
      updateFocus();
    }

  } else if (dir === 'left') {
    if (col > 0) {
      state.gameIdx--;
      updateFocus();
    } else {
      // Sudah di kolom paling kiri → kembali ke panel platform
      backToPlatforms();
    }

  } else if (dir === 'down') {
    if (state.gameIdx + cols < total) {
      state.gameIdx += cols;
      updateFocus();
    }

  } else if (dir === 'up') {
    if (state.gameIdx - cols >= 0) {
      state.gameIdx -= cols;
      updateFocus();
    }

  } else if (dir === 'confirm') {
    launchGame();

  } else if (dir === 'back') {
    backToPlatforms();
  }
}


/* ══════════════════════════════════════════════════════════════
   BAGIAN 6 — KEYBOARD HANDLER

   PENJELASAN SEDERHANA:
   ───────────────────────────────────────────────────────────
   document.addEventListener('keydown', fungsi) = pasang
   "pendengar" yang aktif TERUS MENERUS di seluruh halaman.
   Setiap kali tombol ditekan, fungsi kita dipanggil dengan
   sebuah objek event (e) yang berisi info tombol tsb.

   e.key     = nama tombol: 'ArrowUp', 'Enter', 'Escape', dll.
   e.preventDefault() = cegah aksi DEFAULT browser.
                        Contoh: tanpa ini, ArrowDown akan
                        scroll halaman ke bawah.

   Kita buat "peta" (keyMap) yang mengubah nama tombol
   menjadi arah, lalu panggil navigate() dengan arah tsb.
   ─────────────────────────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  // Jika modal atau embed sedang terbuka, tangani sendiri
  if (!DOM.launchModal.classList.contains('hidden')) {
    if (e.key === 'Escape') closeModal();
    return;
  }
  if (!DOM.embedOverlay.classList.contains('hidden')) {
    if (e.key === 'Escape') closeEmbed();
    return;
  }

  // Peta tombol ke arah
  const keyMap = {
    'ArrowUp':    'up',
    'ArrowDown':  'down',
    'ArrowLeft':  'left',
    'ArrowRight': 'right',
    'Enter':      'confirm',
    ' ':          'confirm',   // Spacebar = confirm juga
    'Escape':     'back',
    'Backspace':  'back',
    'w': 'up',  's': 'down',  'a': 'left',  'd': 'right',  // WASD support bonus
    'W': 'up',  'S': 'down',  'A': 'left',  'D': 'right',
  };

  const dir = keyMap[e.key];
  if (!dir) return;             // Tombol lain? Abaikan.

  e.preventDefault();           // Cegah scroll browser
  navigate(dir);
});


/* ══════════════════════════════════════════════════════════════
   BAGIAN 7 — GAMEPAD API

   PENJELASAN SEDERHANA:
   ───────────────────────────────────────────────────────────
   Browser punya API untuk membaca gamepad yang terhubung.
   Tapi tidak seperti keyboard, gamepad tidak punya "event"
   saat tombol ditekan. Kita harus POLLING = memeriksa
   kondisi gamepad SETIAP FRAME (sekitar 60 kali/detik).

   Cara kerjanya:
   1. requestAnimationFrame(pollGamepad) = minta browser
      untuk memanggil pollGamepad() di frame berikutnya
   2. Di dalam pollGamepad(), kita:
      a. Ambil daftar gamepad: navigator.getGamepads()
      b. Baca axes (analog stick) dan buttons (tombol)
      c. Jika ada tombol/arah terdeteksi → panggil navigate()
      d. Minta frame berikutnya lagi (loop tak terbatas)

   MASALAH: Tanpa delay, navigasi akan terlalu cepat!
   (Bayangkan ArrowDown ditekan 60x per detik!)
   SOLUSI: "Cooldown" — catat waktu input terakhir,
   dan TOLAK input baru sampai cooldown berlalu.

   Peta tombol standar (Standard Gamepad API):
   buttons[0]  = A / Cross
   buttons[1]  = B / Circle
   buttons[2]  = X / Square
   buttons[3]  = Y / Triangle
   buttons[12] = D-pad Up
   buttons[13] = D-pad Down
   buttons[14] = D-pad Left
   buttons[15] = D-pad Right
   axes[0]     = Analog Kiri, Horizontal (-1=kiri, +1=kanan)
   axes[1]     = Analog Kiri, Vertikal   (-1=atas, +1=bawah)
   ─────────────────────────────────────────────────────────── */

const gamepad = {
  lastInputTime: 0,     // Timestamp (ms) dari input gamepad terakhir
  cooldown:      180,   // Jeda minimum antar input dalam ms
};

// Event: Gamepad terhubung
window.addEventListener('gamepadconnected', (e) => {
  DOM.gamepadStatus.classList.replace('inactive', 'active');
  // Ambil nama gamepad, potong jika terlalu panjang
  const name = e.gamepad.id.length > 22
    ? e.gamepad.id.substring(0, 22) + '…'
    : e.gamepad.id;
  DOM.gamepadBadgeText.textContent = name || 'CONNECTED';
  console.log('[NexusPlay] Gamepad connected:', e.gamepad.id);
});

// Event: Gamepad dicabut
window.addEventListener('gamepaddisconnected', () => {
  DOM.gamepadStatus.classList.replace('active', 'inactive');
  DOM.gamepadBadgeText.textContent = 'NO GAMEPAD';
});

/** Loop polling gamepad — berjalan setiap frame (~60fps) */
function pollGamepad() {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  const gp = gamepads[0];  // Gunakan gamepad pertama yang terhubung

  if (gp) {
    const now = Date.now();

    // Cek apakah cooldown sudah berlalu sejak input terakhir
    if (now - gamepad.lastInputTime > gamepad.cooldown) {
      let dir = null;

      // ── CEK D-PAD (lebih akurat dari analog) ──
      if      (gp.buttons[12]?.pressed) dir = 'up';
      else if (gp.buttons[13]?.pressed) dir = 'down';
      else if (gp.buttons[14]?.pressed) dir = 'left';
      else if (gp.buttons[15]?.pressed) dir = 'right';

      // ── CEK ANALOG KIRI (fallback; threshold 0.5 cegah drift) ──
      else if (gp.axes[1] < -0.5) dir = 'up';
      else if (gp.axes[1] >  0.5) dir = 'down';
      else if (gp.axes[0] < -0.5) dir = 'left';
      else if (gp.axes[0] >  0.5) dir = 'right';

      // ── CEK TOMBOL AKSI (hanya jika tidak ada arah) ──
      else if (gp.buttons[0]?.pressed) dir = 'confirm';  // A / Cross
      else if (gp.buttons[1]?.pressed) dir = 'back';     // B / Circle

      // Jika ada input yang terdeteksi...
      if (dir) {
        gamepad.lastInputTime = now;  // Catat waktu, aktifkan cooldown
        navigate(dir);                // Proses navigasi
      }
    }
  }

  // Minta browser jalankan fungsi ini lagi di frame berikutnya
  // Inilah yang membuat "loop" berjalan terus
  requestAnimationFrame(pollGamepad);
}

// Mulai loop polling gamepad
requestAnimationFrame(pollGamepad);


/* ══════════════════════════════════════════════════════════════
   BAGIAN 8 — LAUNCH MODAL

   Modal muncul saat user menekan Enter/A pada game card.
   Menawarkan dua cara main: tab baru atau embed iframe.
══════════════════════════════════════════════════════════════ */

function openModal(platform, game) {
  currentGameData = { platform, game };

  // Isi konten modal
  DOM.modalPlatformTag.textContent = `▸ ${platform.name} · ${platform.fullName.toUpperCase()}`;
  DOM.modalTitle.textContent       = game.title;
  DOM.modalGenre.textContent       = game.genre;
  DOM.modalYear.textContent        = game.year;

  // Tombol Embed: disable jika URL belum tersedia
  const hasUrl = game.url && game.url !== '#';
  DOM.btnEmbed.disabled    = !hasUrl;
  DOM.btnEmbed.style.opacity = hasUrl ? '1' : '0.35';
  DOM.btnEmbed.title         = hasUrl ? '' : 'URL emulator belum diisi di LIBRARY';

  // Tampilkan modal dan fokus ke tombol utama
  DOM.launchModal.classList.remove('hidden');
  setTimeout(() => DOM.btnNewTab.focus(), 60);
}

function closeModal() {
  DOM.launchModal.classList.add('hidden');
  currentGameData = null;
}

DOM.btnNewTab.addEventListener('click', () => {
  if (!currentGameData) return;
  const { game } = currentGameData;

  if (game.url && game.url !== '#') {
    window.open(game.url, '_blank', 'noopener');
  } else {
    alert(
      `URL untuk "${game.title}" belum tersedia.\n\n` +
      `Tambahkan link emulator web di array LIBRARY\n` +
      `pada bagian "url" di script.js`
    );
  }
  closeModal();
});

DOM.btnEmbed.addEventListener('click', () => {
  if (!currentGameData) return;
  const { game } = currentGameData;
  if (game.url && game.url !== '#') {
    openEmbed(game);
    closeModal();
  }
});

DOM.btnCancel.addEventListener('click', closeModal);

// Klik backdrop (area di luar panel modal) = tutup modal
DOM.modalBackdrop.addEventListener('click', closeModal);


/* ══════════════════════════════════════════════════════════════
   BAGIAN 9 — EMBED OVERLAY (iframe)

   Menampilkan emulator eksternal di dalam iframe penuh layar.
   Catatan: Beberapa situs mungkin memblokir iframe (X-Frame-Options).
   Jika game tidak muncul, gunakan "Buka di Tab Baru" saja.
══════════════════════════════════════════════════════════════ */

function openEmbed(game) {
  DOM.embedTitle.textContent = `▶ ${game.title}`;
  DOM.embedFrame.src = game.url;
  DOM.embedOverlay.classList.remove('hidden');
}

function closeEmbed() {
  DOM.embedOverlay.classList.add('hidden');
  DOM.embedFrame.src = 'about:blank';  // Hentikan loading/audio dari iframe
}

DOM.btnExitEmbed.addEventListener('click', closeEmbed);

DOM.btnFullscreenEmbed.addEventListener('click', () => {
  const el = DOM.embedFrame;
  // Coba berbagai versi fullscreen API (untuk kompatibilitas browser)
  if      (el.requestFullscreen)       el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.mozRequestFullScreen)    el.mozRequestFullScreen();
});


/* ══════════════════════════════════════════════════════════════
   BAGIAN 10 — JAM DIGITAL

   Menampilkan jam real-time di header.
   setInterval(fungsi, 10000) = jalankan fungsi setiap 10 detik.
══════════════════════════════════════════════════════════════ */
function updateClock() {
  const now = new Date();
  const h   = String(now.getHours()).padStart(2, '0');    // Selalu 2 digit
  const m   = String(now.getMinutes()).padStart(2, '0');
  DOM.clock.textContent = `${h}:${m}`;
}

updateClock();                     // Tampilkan langsung saat load
setInterval(updateClock, 10000);   // Update setiap 10 detik


/* ══════════════════════════════════════════════════════════════
   BAGIAN 11 — INISIALISASI

   Kode ini PERTAMA KALI dijalankan saat halaman selesai dimuat.
   Urutan sangat penting: render dulu, baru pilih, baru fokus.
══════════════════════════════════════════════════════════════ */
function init() {
  renderPlatforms();   // 1. Gambar daftar platform di sidebar
  selectPlatform();    // 2. Pilih platform pertama & render game-nya
}

init();
