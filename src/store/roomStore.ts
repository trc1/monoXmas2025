import { makeAutoObservable } from "mobx";

class RoomStore {
    lightsOn = false;
    fireplaceOn = false;
    gramophone = false;
    lamp1On = true;
    lamp2On = true;
    doorKnock = false;
    doorOpen = false;
    boardAnimationPlaying = true;
    boardClicked = false;
    isGameStarted = false;
    checkList = {
        lamp1: false,
        lamp2: false,
        lights: false,
        fireplace: false,
        board: false,
        gramophone: false,
    };
    showLetter = false;
    isGameCompleted = false;

    constructor() {
        makeAutoObservable(this);
    }

    startGame() {
        this.isGameStarted = true;
    }

    toggleLights() {
        this.lightsOn = !this.lightsOn;
        this.checkList.lights = true;
        this.checkIfChecklistCompleted();
    }

    toggleFireplace() {
        this.fireplaceOn = !this.fireplaceOn;
        this.checkList.fireplace = true;
        this.checkIfChecklistCompleted();
    }

    toggleLamp1() {
        this.lamp1On = !this.lamp1On;
        this.checkList.lamp1 = true;
        this.checkIfChecklistCompleted();
    }

    toggleLamp2() {
        this.lamp2On = !this.lamp2On;
        this.checkList.lamp2 = true;
        this.checkIfChecklistCompleted();
    }

    setLights(value: boolean) {
        this.lightsOn = value;
    }

    setFireplace(value: boolean) {
        this.fireplaceOn = value;
    }

    setGramophone(value: boolean) {
        this.gramophone = value;
    }

    toggleGramophone() {
        this.gramophone = !this.gramophone;
        this.checkList.gramophone = true;
        this.checkIfChecklistCompleted();
    }

    checkIfChecklistCompleted() {
        const allCompleted = Object.values(this.checkList).every(
            (value) => value === true
        );
        if (allCompleted && !this.doorKnock) {
            this.doorKnock = true;
        }
    }

    get isChecklistCompleted() {
        return Object.values(this.checkList).every((value) => value === true);
    }

    toggleDoor() {
        const allCompleted = Object.values(this.checkList).every(
            (value) => value === true
        );
        if (!allCompleted) {
            return;
        }
        this.doorOpen = !this.doorOpen;
    }

    toggleBoard() {
        this.checkList.board = true;
        this.boardAnimationPlaying = false;
        this.boardClicked = !this.boardClicked;
        this.checkIfChecklistCompleted();
    }

    toggleShowLetter() {
        this.showLetter = !this.showLetter;
    }

    setGameCompleted() {
        this.isGameCompleted = true;
        this.showLetter = !this.showLetter;
    }
}

export const roomStore = new RoomStore();
