declare module "EntityNS" {

    export interface CodedValuesList {
        _DisplayAttribute: string;
        _StoredAttribute: string;
    }

    export interface VLSDeployment {
        _DeploySecurityInfo: string;
    }

    export interface SingularCaption {
        __cdata: string;
    }

    export interface PluralCaption {
        __cdata: string;
    }

    export interface Description {
        __cdata: string;
    }

    export interface Comments {
        __cdata: string;
    }

    export interface DataType {
        _DataType?: string;
        _Size?: string;
    }

    export interface Validation {
        _ValidationType: string;
        _CodedValuesList: string;
    }

    export interface ServerDataType {
        _Type?: string;
        _Size?: string;
        _ServerOfOrigin?: string;
    }

    export interface Property {
        _Name: string;
        _Value: string;
    }

    export interface ExtendedProperties {
        Property: Property;
    }

    export interface Formula {
        __cdata: string;
    }

    export interface Derivation {
        DefaultValue: any;
        _DerivationType: string;
        Formula: Formula;
    }

    export interface Attribute {
        DataType: DataType;
        Validation: Validation;
        Caption: any;
        _Name: string;
        _ValueRequired: string;
        _LayoutByDefault: string;
        _Persistent: string;
        _PreventUserUpdates: string;
        ServerDataType: ServerDataType;
        ExtendedProperties: ExtendedProperties;
        Derivation: Derivation;
        Description: string;
    }

    export interface Attributes {
        Attribute: Attribute[];
    }

    export interface IndexAttribute {
        _Name: string;
        _Descending: string;
    }

    export interface Index {
        Index_Attribute: IndexAttribute;
        _Name: string;
        _Primary: string;
        _Unique: string;
        _IgnoreNulls: string;
    }

    export interface Indexes {
        Index: Index[];
    }

    export interface Constraint {
        Condition: string;
        ErrorMessage: string;
        _Name: string;
        _ConditionType: string;
        _ErrorAttribute: string;
    }

    export interface Constraints {
        Constraint: Constraint[];
    }

    export interface Entity {
        CodedValuesList?: CodedValuesList;
        VLSDeployment?: VLSDeployment;
        SingularCaption?: SingularCaption;
        PluralCaption?: PluralCaption;
        Description: Description;
        Comments?: Comments;
        Attributes: Attributes;
        Indexes: Indexes;
        Constraints?: Constraints;
        _SurrId?: string;
        _CodedValuesList?: string;
        _IsRemoteAccessible?: string;
        _SuperClass?: string;
        _UseQuotedIdentifiers?: string;
        _LockMode?: string;
        _ImageReference?: string;
        _XdaConnector?: string;
        _DTDVersion?: string;
    }



}

