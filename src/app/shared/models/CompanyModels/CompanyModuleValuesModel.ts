export class CompanyModuleValueModel {
    public Id: number;
    public RolByCompanyId: number;
    public ActionModuleId: number;
    public Value: boolean;

    constructor(Id: number, RolByCompanyId: number, ActionModuleId: number, Value: boolean) {
        this.Id = Id;
        this.RolByCompanyId = RolByCompanyId;
        this.ActionModuleId = ActionModuleId;
        this.Value = Value;
    }
}
