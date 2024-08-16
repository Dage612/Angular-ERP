import { CompanySubModuleModel } from "./CompanySubModuleModel";

export class CompanyModules {
    public id: number;
    public name?: string;
    public route?: string;
    public img?: string;
    public submodules?: CompanySubModuleModel[];

    constructor(Id: number, Name?: string, Route?: string, Img?: string, submodules?: CompanySubModuleModel[]) {
        this.id = Id;
        this.name = Name;
        this.route = Route;
        this.img = Img;
        this.submodules = submodules;
    }
}