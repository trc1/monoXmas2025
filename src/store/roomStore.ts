import { makeAutoObservable, runInAction } from "mobx";

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
    letterCanFlyIn = false;
    isGameCompleted = false;
    isLetterArrived = false;

    constructor() {
        makeAutoObservable(this);
    }

    startGame() {
        this.isGameStarted = true;
    }

    toggleLights() {
        if (this.isChecklistCompleted) {
            return;
        }
        this.lightsOn = !this.lightsOn;
        this.checkList.lights = true;
        this.checkIfChecklistCompleted();
    }

    toggleFireplace() {
        if (this.isChecklistCompleted) {
            return;
        }
        this.fireplaceOn = !this.fireplaceOn;
        this.checkList.fireplace = true;
        this.checkIfChecklistCompleted();
    }

    toggleLamp1() {
        if (this.isChecklistCompleted) {
            return;
        }
        this.lamp1On = !this.lamp1On;
        this.checkList.lamp1 = true;
        this.checkIfChecklistCompleted();
    }

    toggleLamp2() {
        if (this.isChecklistCompleted) {
            return;
        }
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

    setLetterArrived(value: boolean) {
        this.isLetterArrived = value;
    }

    toggleGramophone() {
        if (this.isChecklistCompleted) {
            return;
        }
        this.gramophone = !this.gramophone;
        this.checkList.gramophone = true;
        this.checkIfChecklistCompleted();
    }

    checkIfChecklistCompleted() {
        if (this.isChecklistCompleted && !this.doorKnock) {
            setTimeout(() => {
                this.doorKnock = true;
            }, 3000);
        }
    }

    get isChecklistCompleted() {
        return (
            !this.lamp1On &&
            !this.lamp2On &&
            this.fireplaceOn &&
            this.gramophone &&
            this.lightsOn
        );
    }

    toggleDoor() {
        if (!this.isChecklistCompleted) return;

        this.doorOpen = !this.doorOpen;

        if (this.doorOpen) {
            this.letterCanFlyIn = false;
            setTimeout(() => {
                runInAction(() => {
                    this.letterCanFlyIn = true;
                });
            }, 800);
        } else {
            this.letterCanFlyIn = false;
        }
    }

    toggleBoard() {
        if (this.isChecklistCompleted) {
            return;
        }
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
