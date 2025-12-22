import { makeAutoObservable } from "mobx";
import * as audioManager from "../utils/audioManager";

// Music tracks for gramophone
const SONGS = ["/sfx/Song_1.mp3", "/sfx/Song_2.mp3", "/sfx/Song_5.mp3"];

// Sound effects
export const SFX = {
    DOOR_OPENING: "/sfx/SFX - Doors_opening.mp3",
    DOOR_KNOCKING: "/sfx/SFX - Door_knocking_3.mp3",
    FIREPLACE_CRACKLING: "/sfx/SFX - Fireplace_crackling_4.mp3",
    SWITCH_CLICK: "/sfx/SFX - Switch_click_2.mp3",
    TREE_LIGHTS: "/sfx/SFX - Tree_lightning_up.mp3",
    VINYL_NEEDLE_SKIP: "/sfx/SFX - Vinyl_needle_skip.mp3",
    XMAS_BELLS: "/sfx/SFX - Xmass_bells.mp3",
    ATMOSPHERE_LOOP: "/sfx/SFX - Atmosphere_loop_2.mp3",
    PAPER: "/sfx/SFX - Paper_sound.mp3",
    SANTA_HO: "/sfx/SFX - Santa_hohoing.mp3",
} as const;

class AudioStore {
    isMusicPlaying = false;
    currentTrack: string | null = null;
    currentSongIndex = -1;
    musicVolume = 0.5;
    sfxVolume = 0.7;
    isMuted = false;
    isNeedleSkipInProgress = false;

    constructor() {
        makeAutoObservable(this);

        audioManager.setOnEnded(() => {
            if (this.isMusicPlaying) {
                this.playNextSong();
            }
        });
    }

    playNextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % SONGS.length;
        console.log(
            "Playing song index:",
            this.currentSongIndex,
            "file:",
            SONGS[this.currentSongIndex]
        );
        this.playMusic(SONGS[this.currentSongIndex]);
    }

    playMusic(trackName: string) {
        this.isMusicPlaying = true;
        this.currentTrack = trackName;
        audioManager.play(trackName, this.musicVolume, false); // false = don't loop individual songs
    }

    stopMusic() {
        /* Stop music */
        audioManager.stop();
        this.isMusicPlaying = false;
        this.currentTrack = null;

        this.isNeedleSkipInProgress = true;
        audioManager.stopAmbient("vinylNeedleSkip");
        const audio = audioManager.playAmbient(
            "vinylNeedleSkip",
            SFX.VINYL_NEEDLE_SKIP,
            this.sfxVolume,
            false
        );
        if (audio) {
            audio.onended = null;
            audio.addEventListener(
                "ended",
                () => {
                    this.isNeedleSkipInProgress = false;
                    this.isMusicPlaying = false;
                    this.currentTrack = null;
                    audioManager.stop();
                },
                { once: true }
            );
        } else {
            this.isNeedleSkipInProgress = false;
            this.isMusicPlaying = false;
            this.currentTrack = null;
            audioManager.stop();
        }
    }

    toggleMusic() {
        if (this.isMusicPlaying) {
            audioManager.pause();
        } else if (this.currentTrack) {
            audioManager.play(this.currentTrack, this.musicVolume);
        }
        this.isMusicPlaying = !this.isMusicPlaying;
    }

    setMusicVolume(volume: number) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        audioManager.setVolume(this.musicVolume);
    }

    setSfxVolume(volume: number) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        audioManager.setVolume(this.isMuted ? 0 : this.musicVolume);
    }

    setMute(value: boolean) {
        this.isMuted = value;
        audioManager.setVolume(value ? 0 : this.musicVolume);
    }

    playSoundEffect(sfxName: string) {
        if (!this.isMuted) {
            audioManager.playSoundEffect(sfxName, this.sfxVolume);
        }
    }

    playDoorOpen() {
        this.playSoundEffect(SFX.DOOR_OPENING);
    }

    playFireplaceCrackling() {
        audioManager.playAmbient(
            "fireplace",
            SFX.FIREPLACE_CRACKLING,
            this.sfxVolume
        );
    }

    stopFireplaceCrackling() {
        audioManager.stopAmbient("fireplace");
    }

    playSwitchClick() {
        this.playSoundEffect(SFX.SWITCH_CLICK);
    }

playVinylNeedleSkipAndNext() {
  this.isNeedleSkipInProgress = true;

  // Stop any previous SFX and clean up
  audioManager.stopAmbient("vinylNeedleSkip");

  const audio = audioManager.playAmbient(
    "vinylNeedleSkip",
    SFX.VINYL_NEEDLE_SKIP,
    this.sfxVolume,
    false
  );

  // snap it: don't wait for full file duration
  const SNAP_MS = 600;
  window.setTimeout(() => {
    if (!this.isNeedleSkipInProgress) return;

    audioManager.stopAmbient("vinylNeedleSkip");
    this.isNeedleSkipInProgress = false;
    this.playNextSong();
  }, SNAP_MS);

  if (audio) {
    // Remove any previous 'ended' listeners (in case)
    audio.onended = null;
    audio.addEventListener(
      "ended",
      () => {
        if (!this.isNeedleSkipInProgress) return; // prevents double-trigger
        this.isNeedleSkipInProgress = false;
        this.playNextSong();
      },
      { once: true }
    );
  } else {
    this.isNeedleSkipInProgress = false;
    this.playNextSong();
  }
}

    playXmasBells() {
        this.playSoundEffect(SFX.XMAS_BELLS);
    }

    playDoorKnocking() {
        audioManager.playAmbient(
            "doorKnocking",
            SFX.DOOR_KNOCKING,
            this.sfxVolume,
            true
        );
    }

    stopDoorKnocking() {
        audioManager.stopAmbient("doorKnocking");
    }

    playPaper() {
        this.playSoundEffect(SFX.PAPER);
    }

    playSanta() {
        this.playSoundEffect(SFX.SANTA_HO);
    }

    playTreeLights() {
        this.playSoundEffect(SFX.TREE_LIGHTS);
    }
}

export const audioStore = new AudioStore();
