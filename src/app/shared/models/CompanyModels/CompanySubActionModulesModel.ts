import { CompanyModuleValueModel } from "./CompanyModuleValuesModel";

export class CompanySubActionModulesModel {
    public Id: number;
    public SubModuleId: number;
    public Name?: string;
    public companyModules?: CompanyModuleValueModel[];

    constructor(Id: number, SubModuleId: number, Name?: string, companyModules?: CompanyModuleValueModel[]) {
        this.Id = Id;
        this.SubModuleId = SubModuleId;
        this.Name = Name;
        this.companyModules = companyModules;
    }
}