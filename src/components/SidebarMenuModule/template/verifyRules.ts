export interface TemplateDivider {
    label: string;
    text: string;
}

export interface TemplateTag {
    type: 'success' | 'info' | 'warning' | 'danger';
    label: string;
}

export interface TemplateListItem {
    src: string;
    alt: string;
    label: string;
    tag: TemplateTag[];
}

export interface FiltrateList {
    label: string;
    disabled: boolean;
    //
    [key: string]: any;
}