export class IAccountInfo {
    public id!: number;
    public name!: string;
    // public timeZone!: string;
    // public language!: string;
    public roleId!: number;
    public roleDescription!: string;
    public token!: string;
    public expiresIn!: number;
    public expireDate!: Date;
    public accessGranted!: boolean;
    public deniedReason!: string;
    public memberId!: Number
    public withoutCompany!: boolean;
    public isSupport!: boolean;

    constructor(init?: Partial<IAccountInfo>) {
        Object.assign(this, init);
    }
}