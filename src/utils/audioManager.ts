let audioElement: HTMLAudioElement | null = null;
let currentSrc: string | null = null;
let onEndedCallback: (() => void) | null = null;
const ambientSounds: Map<string, HTMLAudioElement> = new Map();

export const play = (src: string, volume: number = 0.5, shouldLoop: boolean = false) => {
    console.log("AudioManager play called with:", src, "volume:", volume, "loop:", shouldLoop);
    
    // If already playing this track, just resume
    if (audioElement && currentSrc === src) {
        audioElement.play();
        return;
    }

    // Stop current track if playing something else
    stop();

    // Create new audio element
    audioElement = new Audio(src);
    audioElement.loop = shouldLoop;
    audioElement.volume = volume;
    currentSrc = src;

    // Add ended listener if callback is set
    if (onEndedCallback && !shouldLoop) {
        audioElement.addEventListener('ended', onEndedCallback);
    }

    audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
    });
};

export const setOnEnded = (callback: (() => void) | null) => {
    onEndedCallback = callback;
};

export const playAmbient = (id: string, src: string, volume: number = 0.5) => {
    // Check if already playing
    if (ambientSounds.has(id)) {
        return;
    }

    const ambient = new Audio(src);
    ambient.loop = true;
    ambient.volume = volume;
    ambientSounds.set(id, ambient);

    ambient.play().catch((error) => {
        console.error("Error playing ambient sound:", error);
    });
};

export const stopAmbient = (id: string) => {
    const ambient = ambientSounds.get(id);
    if (ambient) {
        ambient.pause();
        ambient.currentTime = 0;
        ambientSounds.delete(id);
    }
};

export const setAmbientVolume = (id: string, volume: number) => {
    const ambient = ambientSounds.get(id);
    if (ambient) {
        ambient.volume = Math.max(0, Math.min(1, volume));
    }
};

export const pause = () => {
    if (audioElement) {
        audioElement.pause();
    }
};

export const stop = () => {
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement = null;
        currentSrc = null;
    }
};

export const setVolume = (volume: number) => {
    if (audioElement) {
        audioElement.volume = Math.max(0, Math.min(1, volume));
    }
};

export const playSoundEffect = (src: string, volume: number = 0.7) => {
    const sfx = new Audio(src);
    sfx.volume = volume;
    sfx.play().catch((error) => {
        console.error("Error playing sound effect:", error);
    });
};

export const isPlaying = (): boolean => {
    return audioElement ? !audioElement.paused : false;
};
