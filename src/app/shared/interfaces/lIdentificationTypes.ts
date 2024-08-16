export interface IdentificationType {
    Id: number;
    Code: string;
    Description: string;
    MaxLength: number | null;
}

export interface IdentificationTypes {
    optionsTypes: IdentificationType[];
}

