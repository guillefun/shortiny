export interface InputForm<T>{
  fields: FieldData<T>[],
  action: ActionForm
}

export interface FieldData<T> {
  id: T,
  label: string,
  type: string,
  placeholder?: string,
}

export interface ActionForm {
  label: string,
  action: ()=> void
}

export enum ButtonSize {
  default = "default",
  icon = "icon"
}

export interface SettingsFormData {
  username: string
}