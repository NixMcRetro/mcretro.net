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


/* Auto Goat deliberately uses the normal pad-selection path. All sounds are still
 * loaded on demand, each column remains exclusive, and manual taps still work. */
function goatReducedMotion() {
    return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
}

function positionGoat(x, y, scale = 1) {
    // Fixed positioning allows the goat to leave the soundboard and approach the viewer.
    const left = Math.max(0, Math.min(window.innerWidth - 40, x));
    const top = Math.max(0, Math.min(window.innerHeight - 52, y));
    goatSprite.style.transform = "translate3d(" + Math.round(left) + "px, " +
        Math.round(top) + "px, 0) scale(" + scale + ")";
}

function showGoatAtPad(button) {
    const viewport = goatViewport.getBoundingClientRect();
    let rect = button.getBoundingClientRect();
    const margin = 28;
    // On phones, follow the goat across the horizontally scrollable keyboard.
    if (rect.left < viewport.left + margin || rect.right > viewport.right - margin) {
        const delta = rect.left + rect.width / 2 - (viewport.left + viewport.width / 2);
        if (typeof goatViewport.scrollBy === "function") {
            goatViewport.scrollBy({ left: delta, behavior: goatReducedMotion() ? "instant" : "smooth" });
        } else {
            goatViewport.scrollLeft += delta;
        }
        // The scroll may still be animating; put the goat near the visible target.
        rect = { left: viewport.left + (viewport.width - rect.width) / 2,
            top: rect.top, width: rect.width, height: rect.height };
    }
    positionGoat(rect.left + rect.width / 2 - 18, rect.top - 37, 1);
}

function stopAutoGoat() {
    goatRunning = false;
    goatSession++;
    if (goatTimer !== null) clearTimeout(goatTimer);
    goatTimer = null;
    goatButton.setAttribute("aria-pressed", "false");
    goatButton.textContent = "🐐 Auto Goat: Off";
    goatSprite.hidden = true;
    // Leave the current mix intact for manual tweaking.
}

async function roamGoat(session) {
    if (!goatRunning || session !== goatSession || !buttonsLoaded) return;
    goatTimer = null;
    goatHops++;

    // Every fifth hop the goat bounces out towards the screen, then returns.
    if (goatHops % 5 === 0 && !goatReducedMotion()) {
        positionGoat(window.innerWidth * .48, window.innerHeight * .69, 2.25);
    } else {
        const columns = Array.from(soundboard.children);
        const active = columns.filter(column =>
            column.querySelectorAll("button").some(button => button.classList.contains("active")));
        // Avoid an eight-layer wall of sound: favour changing active lanes above six.
        const choices = active.length >= 6 ? active : columns;
        let index = Math.floor(Math.random() * choices.length);
        let column = choices[index];
        if (choices.length > 1 && columns.indexOf(column) === goatPreviousColumn) {
            column = choices[(index + 1) % choices.length];
        }
        goatPreviousColumn = columns.indexOf(column);
        const pads = Array.from(column.querySelectorAll("button"));
        const current = pads.find(pad => pad.classList.contains("active"));
        const alternatives = pads.filter(pad => !pad.classList.contains("active") && !pad.disabled);
        // Occasionally lift a hoof without replacing the sound, creating room in the mix.
        const removing = current && Math.random() < .18;
        const target = removing ? current :
            alternatives[Math.floor(Math.random() * alternatives.length)];
        if (target && !target.disabled) {
            showGoatAtPad(target);
            await selectPad(target, () => goatRunning && session === goatSession);
        }
    }

    if (goatRunning && session === goatSession) {
        goatTimer = setTimeout(() => roamGoat(session), 3600 + Math.random() * 2400);
    }
}

function toggleAutoGoat() {
    if (goatRunning) {
        stopAutoGoat();
        return;
    }
    if (!buttonsLoaded) return; // Never attempt autoplay before the Start gesture.
    goatRunning = true;
    const session = ++goatSession;
    goatHops = 0;
    goatPreviousColumn = -1;
    goatSprite.hidden = false;
    goatButton.setAttribute("aria-pressed", "true");
    goatButton.textContent = "🐐 Auto Goat: On";
    goatTimer = setTimeout(() => roamGoat(session), 650);
}

goatButton.addEventListener("click", toggleAutoGoat);
// Don't continue changing samples unseen when the browser tab is backgrounded.
document.addEventListener("visibilitychange", () => {
    if (document.hidden && goatRunning) stopAutoGoat();
});
