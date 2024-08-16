export class SelectBaseControl {

    public id!: number;
    public code!: string;
    public description!: string;
    public maxLength!: number;
    public minLength!: number;
    public withLyrics!: boolean;


    constructor(init?: Partial<SelectBaseControl>) {
        Object.assign(this, init);
    }
}


