import { makeAutoObservable } from "mobx";

class RoomStore {
    lightsOn = false;
    fireplaceOn = false;
    gramophone = false;
    lamp1On = true;
    lamp2On = true;
    doorOpen = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggleLights() {
        this.lightsOn = !this.lightsOn;
    }

    toggleFireplace() {
        this.fireplaceOn = !this.fireplaceOn;
    }

    toggleLamp1() {
        this.lamp1On = !this.lamp1On;
    }

    toggleLamp2() {
        this.lamp2On = !this.lamp2On;
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
    }
    
    toggleDoor() {
        this.doorOpen = !this.doorOpen;
    }
}

export const roomStore = new RoomStore();
