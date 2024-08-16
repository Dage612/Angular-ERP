export class IAuth {
    public userEmail!: string;
    public password!: string;

    constructor(init?: Partial<IAuth>) {
        Object.assign(this, init);
    }
}