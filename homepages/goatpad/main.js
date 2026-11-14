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

async function selectPad(button) {
    if (!buttonsLoaded) return;
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
        if (columnSelection.get(column) !== token) return;
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
        button.classList.add(styles[category], String(buttonIndex + 1));
        button.setAttribute("aria-label", names[category] + ", sample " + key);
        button.addEventListener("click", () => selectPad(button));
        button.appendChild(label);
        column.appendChild(button);
    });
    soundboard.appendChild(column);
});

function updateSizes() {
    const root = document.documentElement;
    const viewport = Math.min(window.innerHeight, window.innerWidth);
    root.style.setProperty("--button-size", "calc(6em * (" + viewport + " / 1080))");
    root.style.setProperty("--counter-size", "calc(5em * (" + viewport + " / 1080))");
    const area = document.querySelector(".buttonArea");
    const counter = document.querySelector(".counter");
    if (area && counter) {
        root.style.setProperty("--counter-margin",
            "calc((" + area.offsetWidth + "px - " + counter.offsetWidth * 8 + "px) / 16)");
        root.style.setProperty("--metronome-width", area.offsetWidth + "px");
    }
}
window.addEventListener("resize", updateSizes);
window.addEventListener("fullscreenchange", updateSizes);
window.addEventListener("load", updateSizes);
