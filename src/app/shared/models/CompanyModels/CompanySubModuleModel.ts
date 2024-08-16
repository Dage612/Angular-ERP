import { CompanySubActionModulesModel } from "./CompanySubActionModulesModel";

export class CompanySubModuleModel {
    public Id: number;
    public ModuleId: number;
    public Name?: string;
    public Route?: string;
    public Img?: string;
    public submodulesactions?: CompanySubActionModulesModel[];

    constructor(Id: number, ModuleId: number, Name?: string, Route?: string, Img?: string, submodulesactions?: CompanySubActionModulesModel[]) {
        this.Id = Id;
        this.ModuleId = ModuleId;
        this.Name = Name;
        this.Route = Route;
        this.Img = Img;
        this.submodulesactions = submodulesactions;
    }
}