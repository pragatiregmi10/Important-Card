// --- CONFIGURATION ---
const USER_NAME = "Pragati";
const BF_NAME = "Aalu";
const BIRTHDAY_DATE = "Mangsir 2";

let state = {
  view: "envelope", // envelope → card_cover → acceptance → make_a_wish → gallery → main_card
  cardFlipped: false,
  specialDate: BIRTHDAY_DATE,
};

// --- PAGES ---
const pages = {
  // 💖 ENVELOPE PAGE
  envelope: () => `
        <div class="envelope-container relative flex items-end justify-center min-h-[80vh]" onclick="openEnvelope()">
            <div class="envelope-back w-full h-full absolute rounded-xl"></div>
            
            <div id="envelope-flap" class="envelope-flap flex items-center justify-center cursor-pointer">
                <span class="text-white text-xl font-bold tracking-wider animate-pulse">Tap to Open  Baby 🎁</span>
            </div>
            
            <div id="card-inside" class="card-slide bg-white rounded-lg shadow-xl w-[90%] h-[75%] p-6 flex flex-col items-center justify-center">
                <div class="text-4xl">💙</div>
                <h2 class="text-xl font-semibold mt-4 text-gray-800 text-center">mero tarfa bata sano gift tero lagi aaluuuu</h2>
            </div>
        </div>
        <canvas id="snow-canvas"></canvas>
    `,
  // 💖 CARD COVER PAGE
  card_cover: () => `
        <div class="envelope-container relative flex items-end justify-center min-h-[80vh]">
            <div class="envelope-back w-full h-full absolute rounded-xl"></div>
            
            <div id="envelope-flap" class="envelope-flap flap-open"></div>
            
            <div id="card-inside" onclick="startAcceptance()" class="card-slide card-slide-out bg-white rounded-lg shadow-xl w-[90%] h-[75%] p-6 flex flex-col items-center justify-center backdrop-blur-md cursor-pointer">
                <div class="text-4xl mb-4 animate-bounce">✨</div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2"> man parena bhanna na payi hai maya</h2>
                <p class="text-gray-500 text-sm">Tap to continue 💙</p>
            </div>
        </div>
        <canvas id="snow-canvas"></canvas>
    `,
  // 💖 ACCEPTANCE PAGE
  acceptance: () => `
        <div class="max-w-md w-full p-6 bg-white/90 rounded-xl shadow-2xl animate-in fade-in duration-500 backdrop-blur-sm mx-auto mt-10">
            <h2 class="text-3xl font-extrabold text-gray-800 text-center mb-6">A Question for You Baby💭</h2>
            <p class="text-lg text-gray-600 mb-6 text-center">
                Before you open it, do you accept this handmade digital card from ${USER_NAME}? 💌
            </p>

            <div class="space-y-4">
                <button onclick="handleAcceptance(true)"
                    class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 transform hover:scale-[1.05] flex items-center justify-center">
                    <span class="text-2xl mr-3">✅</span> Of course, I accept!
                </button>

                <button id="no-button" onmouseover="trollMove(event)" onfocus="trollMove(event)"
                    class="w-full py-3 bg-red-500 text-white font-bold rounded-lg shadow-md transition duration-300 flex items-center justify-center">
                    <span class="text-2xl mr-3">❌</span> You have no other option than accepting, so please say yes 😜
                </button>
            </div>

            <p class="text-sm text-center text-gray-400 mt-6 italic">(Hint: "Yes" makes magic happen ✨)</p>
            <button onclick="goBackToStart()"
                class="mt-4 w-full py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800 font-semibold transition">← Back</button>
        </div>
    `,
  // 💖 MAKE A WISH PAGE
  make_a_wish: () => `
        <div class="max-w-md w-full p-8 bg-white/90 rounded-xl shadow-2xl animate-in zoom-in duration-700 backdrop-blur-sm mx-auto mt-10 text-center">
            <h2 class="text-3xl font-extrabold text-indigo-700 mb-4">Make A Wish! 🕯️</h2>
            
            <p class="text-lg text-gray-700 mb-6 font-medium">
                Please close your eyes, think of your deepest wish, and then "blow" out the candle!
            </p>
            
            <div id="cake-scene" class="relative my-8 flex flex-col items-center justify-center h-52">
                <img src="image.jpeg" alt="Custom Birthday Cake" class="realistic-cake">
               <img id="flame-img" src="flame.jpg" alt="Candle Flame" class="realistic-flame animate-flicker cursor-pointer" onclick="blowCandle()">
                <img id="smoke-puff" src="image.jpeg" alt="Smoke Puff" class="smoke-puff hidden">
            
            </div>

            <p class="text-sm text-gray-500 mb-8 italic">(When you're ready, tap the flame to blow it out.)</p>

            <button onclick="blowCandle()"
                class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 flex items-center justify-center transform hover:scale-105">
                I'm Ready! (Tap the flame)
            </button>

            <button onclick="state.view='acceptance'; renderApp();"
                class="mt-4 w-full py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800 font-semibold transition">← Back</button>
        </div>
    `,
  // 💖 GALLERY PAGE
  gallery: () => `
        <div class="max-w-xl w-full p-6 bg-white/90 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-sm mx-auto mt-10">
            <h2 class="text-3xl font-extrabold text-pink-600 text-center mb-6">💖 Our Moments 📸</h2>
            <p class="text-center text-gray-600 mb-8">
                A little collection of happy memories, just for you. Scroll to see everything!
            </p>

            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="what.jpg" alt="Memory Photo 1" class="w-full h-full object-cover rounded-lg shadow-md transition transform hover:scale-[1.03]">
                </div>

                <div class="gallery-item">
                    <img src="he.jpg" alt="Memory Photo 2" class="w-full h-full object-cover rounded-lg shadow-md transition transform hover:scale-[1.03]">
                </div>
              
                
                <div class="gallery-item">
                    <img src="love.jpg" alt="Memory Photo 3" class="w-full h-full object-cover rounded-lg shadow-md transition transform hover:scale-[1.03]">
                </div>
            </div>
            <div class="gallery-item">
                    <img src="say.jpg" alt="Memory Photo 4" class="w-full h-full object-cover rounded-lg shadow-md transition transform hover:scale-[1.03]">
                </div>
            </div>
            <div class="gallery-item">
                    <img src="red.jpg" alt="Memory Photo 5" class="w-full h-full object-cover rounded-lg shadow-md transition transform hover:scale-[1.03]">
                </div>
            </div>

            <p class="text-sm text-center text-gray-500 mt-8 italic">
                Hope you enjoyed walking down our memory lane baby!
            </p>

            <button onclick="state.view='main_card'; renderApp();"
                class="mt-6 w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg shadow-md transition duration-300 flex items-center justify-center transform hover:scale-[1.02]">
                Continue to Your Message ➡️
            </button>
            <button onclick="state.view='make_a_wish'; renderApp();"
                class="mt-4 w-full py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800 font-semibold transition">← Back to Wish</button>
        </div>
    `,
  // 💖 MAIN CARD PAGE
  main_card: () => `
    <div class="card-3d relative max-w-2xl mx-auto mt-10">
        <div id="flipper" class="card-3d-flipper">
            <div class="card-face front bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-800 text-center text-white flex flex-col items-center justify-center rounded-2xl relative p-6 space-y-4 glowing-card">
                <span class="text-6xl mb-2 animate-pulse">💖</span>
                <h1 class="text-3xl font-extrabold drop-shadow-lg">Happy Birthday, My Love!</h1>
                <h2 class="text-2xl font-semibold">${BF_NAME}</h2>
                <p class="text-lg text-blue-200 font-medium">This is a very secretive message hai tero lagi, very surprising na tarsinu 💌</p>
                <p class="absolute bottom-4 right-4 text-sm text-blue-300">${state.specialDate}</p>
                
                <div class="heart-overlay absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span class="text-pink-300 text-5xl opacity-0 animate-fly-heart">❤️</span>
                    <span class="text-red-400 text-4xl opacity-0 animate-fly-heart animation-delay-2">💜</span>
                    <span class="text-purple-300 text-6xl opacity-0 animate-fly-heart animation-delay-4">💕</span>
                </div>

                <button onclick="toggleCardFlip()" 
                    class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/20 text-white rounded-full p-3 hover:bg-white/40 transition backdrop-blur-sm shadow-md">
                    🔄 Reveal My Heart
                </button>
            </div>

            <div class="card-face back bg-white/90 text-gray-800 relative p-6 rounded-2xl backdrop-blur-md">
                <button onclick="toggleCardFlip()" 
                    class="absolute top-3 left-3 text-blue-700 text-xl hover:scale-110 transition">← Back to Cover</button>

                <div class="h-full flex flex-col pt-8 space-y-4">
                    <div class="flex-shrink-0">
                        <h3 class="text-2xl text-pink-700 mb-4 font-bold">My Dearest, Wonderful ${BF_NAME},</h3>
                    </div>

                    <div class="flex-1 min-h-0 overflow-y-auto">
                        <p id="llm-response" class="text-gray-700 text-base leading-relaxed italic">
                            hehehe
                        </p>
                    </div>

                    <div class="flex-shrink-0 pt-4 mt-4">
                        <p class="text-xl text-pink-800 signature-font text-right">
                            Forever and Always Yours,<br>Haude 💖
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <button onclick="state.view='gallery'; renderApp();"
            class="mt-4 w-full py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800 font-semibold transition">← Back to Gallery</button>
    </div>
    <canvas id="snow-canvas"></canvas>
`,
};

// --- CORE RENDERING ---
function renderApp() {
  const app = document.getElementById("app");
  if (!app) return console.error("The 'app' element is missing.");

  app.innerHTML = pages[state.view]();

  if (state.view === "main_card") {
    fetchBirthdayMessage();
  } else if (state.view === "make_a_wish") {
    const flameImg = document.getElementById("flame-img");
    const smokePuff = document.getElementById("smoke-puff");
    if (flameImg && smokePuff) {
      flameImg.classList.remove("blown-out-flame");
      flameImg.classList.add("animate-flicker");
      flameImg.onclick = blowCandle;
      smokePuff.classList.add("hidden");
    }
  }

  startSnowfall();
  addThemeToggle();
}

// --- ENVELOPE OPEN ---
function openEnvelope() {
  if (state.view !== "envelope") return;

  const flap = document.getElementById("envelope-flap");
  const card = document.getElementById("card-inside");

  if (flap) flap.classList.add("flap-open");
  if (card) card.classList.add("card-slide-out");

  createSparkles();

  setTimeout(() => {
    state.view = "card_cover";
    renderApp();
  }, 1000);
}

function startAcceptance() {
  if (state.view === "card_cover") {
    state.view = "acceptance";
    renderApp();
  }
}

// --- ACCEPTANCE ---
function handleAcceptance(accepted) {
  if (accepted) {
    state.view = "make_a_wish";
    renderApp();
  } else {
    showMessageBox("Oops!", "You can't say no! Try again with a smile 😆");
  }
}

function trollMove() {
  const btn = document.getElementById("no-button");
  if (!btn) return;

  const dx = (Math.random() - 0.5) * 200;
  const dy = (Math.random() - 0.5) * 120;

  btn.style.position = "relative";
  btn.style.transform = `translate(${dx}px, ${dy}px)`;
  btn.style.transition = "transform 0.15s ease-out";

  setTimeout(() => {
    btn.style.transform = "translate(0,0)";
    btn.style.position = "";
  }, 600);
}

// --- CANDLE LOGIC ---
function blowCandle() {
  const flame = document.getElementById("flame-img");
  const smoke = document.getElementById("smoke-puff");

  if (!flame || !smoke || flame.classList.contains("blown-out-flame")) return;

  flame.classList.remove("animate-flicker");
  flame.classList.add("blown-out-flame");
  flame.onclick = null;

  smoke.classList.remove("hidden");
  smoke.classList.add("animate-smoke-puff");

  showMessageBox(
    "Wish Granted! ✨",
    "Your wish is safe with me. Now, memories time!"
  );

  setTimeout(() => {
    state.view = "gallery";
    renderApp();
  }, 1500);
}

// --- CARD FLIP ---
function toggleCardFlip() {
  state.cardFlipped = !state.cardFlipped;
  const flipper = document.getElementById("flipper");
  if (flipper) {
    flipper.classList.toggle("flipped", state.cardFlipped);
  }
}

// --- RESET ---
function goBackToStart() {
  state = { view: "envelope", cardFlipped: false, specialDate: BIRTHDAY_DATE };
  renderApp();
}

// --- FUNNY BIRTHDAY MESSAGE ---
async function fetchBirthdayMessage() {
  const el = document.getElementById("llm-response");
  if (!el) return;

  el.textContent = "Crafting your special message... 💌";

  const messages = [
    `I literally coded this card for you , every line of it was typed with love (and a little bit of panic kina bhaney 5 din lagyo ). 
    If you don’t like it… well, I might just uninstall myself, throw my laptop out the window, and hide in a corner pretending I don’t exist. 
    Just kidding… maybe. Happy Birthday maya!`,
  ];

  const msg = messages[Math.floor(Math.random() * messages.length)];

  let i = 0;

  function type() {
    if (i < msg.length) {
      el.textContent = msg.slice(0, i + 1);
      i++;
      setTimeout(type, 45);
    }
  }
  setTimeout(type, 600);
}

// --- SPARKLES ---
function createSparkles() {
  for (let i = 0; i < 25; i++) {
    const s = document.createElement("div");
    s.classList.add("sparkle");
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${50 + Math.random() * 50}%`;
    s.style.animationDelay = `${Math.random()}s`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1500);
  }
}

// --- SNOWFALL ---
function startSnowfall() {
  const canvas = document.getElementById("snow-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const flakes = Array.from({ length: 80 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    d: Math.random() + 1,
  }));

  let angle = 0;

  function draw() {
    if (!document.body.contains(canvas)) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    for (let f of flakes) {
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    }
    ctx.fill();
    update();
    requestAnimationFrame(draw);
  }

  function update() {
    angle += 0.01;
    for (let f of flakes) {
      f.y += Math.pow(f.d, 2) + 1;
      f.x += Math.sin(angle) * 2;
      if (f.y > canvas.height) {
        f.y = 0;
        f.x = Math.random() * canvas.width;
      }
    }
  }

  requestAnimationFrame(draw);
}

// --- THEME TOGGLE ---
function addThemeToggle() {
  if (document.querySelector(".theme-toggle")) return;

  const btn = document.createElement("button");
  btn.textContent = "🌙";
  btn.id = "theme-toggle-btn";
  btn.className = "theme-toggle fixed top-4 right-4 p-2 rounded shadow-lg";
  document.body.appendChild(btn);

  const saved = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = saved;
  btn.textContent = saved === "dark" ? "☀️" : "🌙";

  btn.addEventListener("click", () => {
    const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    btn.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
}

// --- MODAL BOX ---
function showMessageBox(title, message) {
  const old = document.getElementById("custom-modal");
  if (old) old.remove();

  const modal = document.createElement("div");
  modal.id = "custom-modal";
  modal.className =
    "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4";

  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full text-center animate-in fade-in duration-200">
        <h2 class="text-xl font-bold text-gray-800 mb-2">${title}</h2>
        <p class="text-gray-600 mb-4">${message}</p>
        <button onclick="document.getElementById('custom-modal').remove();"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            OK
        </button>
    </div>
  `;

  document.body.appendChild(modal);
}

// --- INITIAL RENDER ---
window.onload = () => renderApp();
