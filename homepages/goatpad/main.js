/*
 * GOATPAD 1337: historical eight-column sequencer.
 * Playback uses only Opus, loads on demand, and reuses eight identical sounds.
 */
const buttonMapping = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [3, 3, 3, 3, 3, 4, 5, 2],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 4, 4, 4, 4, 5, 4],
    [4, 2, 4, 5, 2, 5, 5, 5],
    [5, 4, 4, 4, 4, 4, 5, 5],
];
// The last pad in column 3 is FX, as on the original soundboard.
buttonMapping[2][7] = 2;

const shortAudio = new Set([
    14, 15, 16, 17, 18, 22, 23, 24, 25, 26, 27, 28, 32, 34, 37, 38,
    41, 44, 45, 46, 48, 57, 64, 67, 71, 72, 74, 75, 77, 87, 88
]);
// Hashes of the historical source files confirm these are identical pairs.
const identicalSounds = {
    28: 16, 23: 18, 36: 21, 32: 22,
    37: 25, 88: 38, 64: 46, 62: 47
};
const canonical = key => identicalSounds[key] || key;

const loadingScreen = document.getElementById("loadingScreen");
const loadingMessage = document.getElementById("loadingMessage");
const startButton = document.getElementById("startAudio");
const audioStatus = document.getElementById("audioStatus");
const soundboard = document.querySelector(".buttonArea");
const goatButton = document.getElementById("autoGoat");
const goatSprite = document.getElementById("goatSprite");
const goatViewport = document.querySelector(".sequence-viewport");

const buffers = new Map();
const loading = new Map();
const columnSelection = new WeakMap();
let audioContext;
let buttonsLoaded = false;
// Upstream 27 June 2026 timing fix: 69 BPM, anchored to the audio clock.
const BEAT_SECONDS = 60 / 69;
const BEAT_INTERVAL = BEAT_SECONDS * 1000;
let nextBeatTime = 0;
let sequencerTimer = null;
let completedBars = 0;

// Optional Auto Goat mode: deliberately slow, one pad edit per hop.
// The historical sequencer and its audio-clock timing remain untouched.
let goatRunning = false;
let goatSession = 0;
let goatTimer = null;
let goatHops = 0;
let goatPreviousColumn = -1;

async function loadSound(key) {
    const id = canonical(Number(key));
    if (buffers.has(id)) return buffers.get(id);
    if (loading.has(id)) return loading.get(id);
    const request = (async () => {
        const response = await fetch("./audio/" + id + ".opus");
        if (!response.ok) throw new Error("Unable to load sound " + id + ": HTTP " + response.status);
        const buffer = await audioContext.decodeAudioData(await response.arrayBuffer());
        buffers.set(id, buffer);
        return buffer;
    })();
    loading.set(id, request);
    try {
        return await request;
    } finally {
        loading.delete(id);
    }
}

async function startAudio() {
    startButton.disabled = true;
    loadingMessage.textContent = "Starting the original GOATPAD sequencer...";
    try {
        if (!audioContext) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) throw new Error("Web Audio is unavailable");
            audioContext = new AudioContextClass();
        }
        // Create/resume audio only inside a genuine user click.
        if (audioContext.state === "suspended") await audioContext.resume();
        let loaded = 0;
        await Promise.all(Array.from({ length: 8 }, (_, i) => i + 11).map(async key => {
            await loadSound(key);
            loadingMessage.textContent = "Preparing sounds: " + (++loaded) + "/8";
        }));
        document.querySelectorAll(".buttonArea button").forEach(button => {
            button.disabled = false;
        });
        buttonsLoaded = true;
        goatButton.disabled = false;
        loadingScreen.classList.add("hidden");
    } catch (error) {
        console.error("GOATPAD start failed:", error);
        loadingMessage.textContent = "Couldn't start the sounds. Check your connection and try again.";
        startButton.disabled = false;
    }
}
startButton.addEventListener("click", startAudio);

function resetCounter() {
    document.querySelectorAll(".counter.active").forEach(element => element.classList.remove("active"));
    document.querySelector(".counter").classList.add("active");
}

function refreshTimer() {
    const active = document.querySelectorAll("button.active").length > 0;
    if (active && sequencerTimer === null) {
        completedBars = 0;
        resetCounter();
        nextBeatTime = audioContext.currentTime + BEAT_SECONDS;
        sequencerTimer = setTimeout(tick, BEAT_INTERVAL);
    } else if (!active && sequencerTimer !== null) {
        clearTimeout(sequencerTimer);
        sequencerTimer = null;
        nextBeatTime = 0;
        completedBars = 0;
        resetCounter();
    }
}

function tick() {
    if (!buttonsLoaded || sequencerTimer === null) return;
    const activeCounters = document.querySelectorAll(".counter.active");
    if (activeCounters.length < 8) {
        activeCounters[activeCounters.length - 1].nextElementSibling.classList.add("active");
    } else {
        playBar();
        resetCounter();
    }
    nextBeatTime += BEAT_SECONDS;
    // Do not fire a burst of catch-up beats after a tab was suspended.
    if (audioContext.currentTime - nextBeatTime > BEAT_SECONDS) {
        nextBeatTime = audioContext.currentTime + BEAT_SECONDS;
    }
    const delay = Math.max(0, (nextBeatTime - audioContext.currentTime) * 1000);
    sequencerTimer = setTimeout(tick, delay);
}

function playBar() {
    const shortOnly = completedBars % 2 === 1;
    for (const button of document.querySelectorAll("button.active")) {
        const key = Number(button.dataset.sample);
        if (shortOnly && !shortAudio.has(key)) continue;
        const buffer = buffers.get(canonical(key));
        if (!buffer) continue;
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
    completedBars++;
}

function togglePad(button) {
    if (button.classList.contains("active")) {
        button.classList.remove("active", "glow");
    } else {
        const column = button.parentElement;
        column.querySelectorAll("button").forEach(other => other.classList.remove("active", "glow"));
        button.classList.add("active", "glow");
    }
    refreshTimer();
}

async function selectPad(button, stillWanted = () => true) {
    if (!buttonsLoaded || !stillWanted()) return;
    const column = button.parentElement;
    const token = Symbol();
    columnSelection.set(column, token);
    if (button.classList.contains("active")) {
        togglePad(button);
        return;
    }
    const key = Number(button.dataset.sample);
    try {
        // Resume within the pad click, before awaiting a new network request.
        if (audioContext.state === "suspended") await audioContext.resume();
        if (!buffers.has(canonical(key))) {
            button.disabled = true;
            audioStatus.textContent = "Loading sound " + key + "...";
            await loadSound(key);
        }
        // A newer click in the same column takes precedence.
        if (columnSelection.get(column) !== token || !stillWanted()) return;
        togglePad(button);
        audioStatus.textContent = "";
    } catch (error) {
        console.error("GOATPAD sound loading failed:", error);
        audioStatus.textContent = "Couldn't load sound " + key + ". Click its pad to retry.";
    } finally {
        button.disabled = false;
    }
}

const names = { 1: "DRUMS", 2: "FX", 3: "BASS", 4: "GOAT SOUL", 5: "MELODY" };
// Compact visible labels on phones. Full names remain in each pad's accessible name.
const shortNames = { 1: "DRM", 2: "FX", 3: "BASS", 4: "SOUL", 5: "MEL" };
const styles = { 1: "drums", 2: "fx", 3: "bass", 4: "goatsoul", 5: "melody" };
buttonMapping.forEach((sounds, columnIndex) => {
    const column = document.createElement("div");
    column.classList.add("column", String(columnIndex + 1));
    sounds.forEach((category, buttonIndex) => {
        const key = (columnIndex + 1) * 10 + buttonIndex + 1;
        const button = document.createElement("button");
        button.type = "button";
        button.disabled = true;
        button.dataset.sample = String(key);
        const label = document.createElement("p");
        label.innerText = names[category];
        label.dataset.short = shortNames[category];
        button.classList.add(styles[category], String(buttonIndex + 1));
        button.setAttribute("aria-label", names[category] + ", sample " + key);
        button.addEventListener("click", () => selectPad(button));
        button.appendChild(label);
        column.appendChild(button);
    });
    soundboard.appendChild(column);
});


/* Auto Goat always lands visibly before changing a sound. It uses the normal
 * selectPad path so original column exclusivity, loading and timing are kept. */
function goatReducedMotion() {
    return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
}

function goatActive(session) {
    return goatRunning && session === goatSession && buttonsLoaded;
}

// Only one Auto Goat timer is outstanding. Stopping cancels even a mid-flight hit.
function scheduleGoat(session, callback, delay) {
    if (!goatActive(session)) return;
    if (goatTimer !== null) clearTimeout(goatTimer);
    goatTimer = setTimeout(() => {
        goatTimer = null;
        if (goatActive(session)) return callback();
    }, Math.max(0, delay));
}

function moveGoat(x, y, scale, rotation = 0, flip = false, duration = 0) {
    const left = Math.max(-35, Math.min(window.innerWidth + 35, x));
    const top = Math.max(-35, Math.min(window.innerHeight + 35, y));
    goatSprite.style.transitionDuration = (goatReducedMotion() ? 0 : duration) + "ms";
    // The glyph's lower middle is its contact point, rather than its top-left.
    goatSprite.style.transform = "translate3d(" + Math.round(left) + "px, " +
        Math.round(top) + "px, 0) translate(-50%, -78%) rotate(" +
        Math.round(rotation) + "deg) rotateY(" + (flip ? 180 : 0) + "deg) scale(" +
        scale.toFixed(2) + ")";
}

function pickGoatTarget() {
    const columns = Array.from(soundboard.children);
    const activeColumns = columns.filter(column =>
        column.querySelectorAll("button").some(button => button.classList.contains("active")));
    // Once six lanes are playing, change or remove one of those instead of piling on.
    const choices = activeColumns.length >= 6 ? activeColumns : columns;
    let index = Math.floor(Math.random() * choices.length);
    let column = choices[index];
    if (choices.length > 1 && columns.indexOf(column) === goatPreviousColumn) {
        column = choices[(index + 1) % choices.length];
    }
    goatPreviousColumn = columns.indexOf(column);
    const pads = Array.from(column.querySelectorAll("button"));
    const current = pads.find(button => button.classList.contains("active"));
    const others = pads.filter(button => !button.classList.contains("active") && !button.disabled);
    // Some landings turn a lane off entirely, like a mischievous hoof.
    if (current && Math.random() < .24) return current;
    return others[Math.floor(Math.random() * others.length)] || current;
}

function descendOnPad(session, button) {
    if (!goatActive(session)) return;
    const rect = button.getBoundingClientRect();
    const time = goatReducedMotion() ? 0 : 850 + Math.random() * 680;
    const scale = .55 + Math.random() * .6;
    const spin = (Math.random() - .5) * 720;
    const flip = Math.random() < .5;
    // The hoof/contact anchor lands directly on the button's centre.
    moveGoat(rect.left + rect.width / 2, rect.top + rect.height / 2,
        scale, spin, flip, time);
    scheduleGoat(session, () => landGoat(session, button), time + 60);
}

function approachPad(session, button) {
    if (!goatActive(session)) return;
    const visible = goatViewport.getBoundingClientRect();
    const rect = button.getBoundingClientRect();
    const margin = 18;
    if (rect.left < visible.left + margin || rect.right > visible.right - margin) {
        const delta = rect.left + rect.width / 2 -
            (visible.left + visible.width / 2);
        if (typeof goatViewport.scrollBy === "function") {
            goatViewport.scrollBy({
                left: delta,
                behavior: goatReducedMotion() ? "instant" : "smooth"
            });
        } else {
            goatViewport.scrollLeft += delta;
        }
        // Read the *real* pad position after scrolling, not a guessed one.
        scheduleGoat(session, () => descendOnPad(session, button),
            goatReducedMotion() ? 0 : 520);
    } else {
        descendOnPad(session, button);
    }
}

function leapTowardsViewer(session, button) {
    const time = 850 + Math.random() * 550;
    moveGoat(
        window.innerWidth * (.22 + Math.random() * .55),
        window.innerHeight * (.25 + Math.random() * .48),
        1.8 + Math.random() * 1.1,
        (Math.random() - .5) * 720, Math.random() < .5, time
    );
    scheduleGoat(session, () => approachPad(session, button), time + 90);
}

let goatLandingPad = null;

function landGoat(session, button) {
    if (!goatActive(session) || button.disabled) {
        scheduleGoat(session, () => roamGoat(session), 450);
        return;
    }
    // The visual stomp precedes the actual pad change. No invisible button hits.
    goatLandingPad = button;
    goatSprite.classList.add("goat-landing");
    button.classList.add("goat-hit");
    scheduleGoat(session, () => hitPad(session, button),
        goatReducedMotion() ? 0 : 190);
}

async function hitPad(session, button) {
    try {
        if (goatActive(session) && !button.disabled) {
            await selectPad(button, () => goatActive(session));
        }
    } finally {
        button.classList.remove("goat-hit");
        if (goatLandingPad === button) goatLandingPad = null;
        goatSprite.classList.remove("goat-landing");
    }
    if (goatActive(session)) {
        scheduleGoat(session, () => roamGoat(session), 420 + Math.random() * 780);
    }
}

function roamGoat(session) {
    if (!goatActive(session)) return;
    goatHops++;
    const target = pickGoatTarget();
    if (!target || target.disabled) {
        scheduleGoat(session, () => roamGoat(session), 500);
        return;
    }
    // Tumbling, reversals and perspective changes; every fourth jump comes
    // forward at the viewer before the goat returns to physically land.
    if (!goatReducedMotion() && (goatHops % 4 === 0 || Math.random() < .27)) {
        leapTowardsViewer(session, target);
    } else {
        approachPad(session, target);
    }
}

function stopAutoGoat() {
    goatRunning = false;
    goatSession++;
    if (goatTimer !== null) clearTimeout(goatTimer);
    goatTimer = null;
    if (goatLandingPad) {
        goatLandingPad.classList.remove("goat-hit");
        goatLandingPad = null;
    }
    goatSprite.classList.remove("goat-landing");
    goatButton.setAttribute("aria-pressed", "false");
    goatButton.textContent = "🐐 Auto Goat: Off";
    goatSprite.hidden = true;
    // Leave the music alone, including when Auto Goat was stopped mid-flight.
}

function toggleAutoGoat() {
    if (goatRunning) {
        stopAutoGoat();
        return;
    }
    if (!buttonsLoaded) return; // Explicit audio-start click is still required.
    goatRunning = true;
    const session = ++goatSession;
    goatHops = 0;
    goatPreviousColumn = -1;
    goatSprite.hidden = false;
    goatButton.setAttribute("aria-pressed", "true");
    goatButton.textContent = "🐐 Auto Goat: On";
    const board = goatViewport.getBoundingClientRect();
    // Start out beyond one corner so the first landing visibly crosses the board.
    moveGoat(board.left - 20, board.top - 15, .55, -35, false, 0);
    scheduleGoat(session, () => roamGoat(session), 350);
}

goatButton.addEventListener("click", toggleAutoGoat);
document.addEventListener("visibilitychange", () => {
    if (document.hidden && goatRunning) stopAutoGoat();
});
