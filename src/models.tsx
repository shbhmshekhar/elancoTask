export type DATA = ROOT[]

export interface ROOT {
  ConsumedQuantity: string
  Cost: string
  Date: string
  InstanceId: string
  MeterCategory: string
  ResourceGroup: string
  ResourceLocation: string
  Tags: Tags
  UnitOfMeasure: string
  Location: string
  ServiceName: string
}

 export interface Tags {
  "app-name": string
  environment: string
  "business-unit": string
}

export type Order = 'asc' | 'desc';

export interface TableHeader{
  ConsumedQuantity: string
  Cost: string
  Date: string
  InstanceId: string
  MeterCategory: string
  ResourceGroup: string
  ResourceLocation: string
  environment: string
  "business-unit": string
  UnitOfMeasure: string
  Location: string
  ServiceName: string

}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof TableHeader;
  label: string;
  numeric: boolean;
}