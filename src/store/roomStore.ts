import { makeAutoObservable } from "mobx";

class RoomStore {
    lightsOn = false;
    fireplaceOn = false;
    gramophone = false;
    lamp1On = true;
    lamp2On = true;
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

    constructor() {
        makeAutoObservable(this);
    }

    startGame() {
        this.isGameStarted = true;
    }

    toggleLights() {
        this.lightsOn = !this.lightsOn;
        this.checkList.lights = true;
    }

    toggleFireplace() {
        this.fireplaceOn = !this.fireplaceOn;
        this.checkList.fireplace = true;
    }

    toggleLamp1() {
        this.lamp1On = !this.lamp1On;
        this.checkList.lamp1 = true;
    }

    toggleLamp2() {
        this.lamp2On = !this.lamp2On;
        this.checkList.lamp2 = true;
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
    }

    toggleDoor() {
        this.doorOpen = !this.doorOpen;
    }

    toggleBoard() {
        this.checkList.board = true;
        this.boardAnimationPlaying = false;
        this.boardClicked = !this.boardClicked;
    }
}

export const roomStore = new RoomStore();
