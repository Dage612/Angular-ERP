import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { SelectBaseControl } from "./SelectBaseModel";
import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

export class DinamicFormControl {

    public type!: string;
    public formControlName!: string;
    public label!: string;
    public options!: any[];
    public multiple!: boolean;
    public design!: string;
    public icon!: IconDefinition;
    public alertMessage!: string;
    public dependencyFormControlName!: string;
    public maxLength!: number;
    public minLength!: number;
    public disable!: boolean;
    public required!: boolean;
    public imageData!: string;
    public stepForm!: number;
    public placeholder!: string;
    public onChange?: (value: any) => void;
    public event?: (value: any) => void;
    public keyPress?: (value: any, other?: any, otherPlus?: any) => void;

    constructor(init?: Partial<DinamicFormControl>) {
        Object.assign(this, init);
    }
}



