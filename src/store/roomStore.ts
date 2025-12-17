import { makeAutoObservable } from "mobx";

class RoomStore {
    lightsOn = false;
    fireplaceOn = false;
    gramophone = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggleLights() {
        this.lightsOn = !this.lightsOn;
    }

    toggleFireplace() {
        this.fireplaceOn = !this.fireplaceOn;
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
}

export const roomStore = new RoomStore();
