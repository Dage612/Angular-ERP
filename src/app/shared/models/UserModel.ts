import { PasswordByUserModel } from "./PasswordByUserModel";
import { RolByUserModel } from "./RolByUserModel";

export class UserModel {

    public Id!: number;
    public Name!: string;
    public UserName!: string;
    public MemberId: number | null | undefined;
    public CompanyId!: number;
    public Email!: string;
    public RolByUserModel!: RolByUserModel[];
    public PasswordByUser!: PasswordByUserModel;

    /*Constructor para utilizar el objeto en alguna instancia del proyecto*/
    constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);

    }
}
