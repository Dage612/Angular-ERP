import { Company } from "./CompanyModels/CompanyModel";
import { UserModel } from "./UserModel";

export class MemberModel {

    public id!: number;
    public name!: string;
    public email!: string;
    public typeId!: number;
    public identification!: string;
    public telephone!: string;
    public active!: boolean;
    public userModel!: UserModel | null;
    public password!: string;
    public companies?: Company[];

    constructor(init?: Partial<MemberModel>) {
        Object.assign(this, init);
    }
}