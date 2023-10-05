// This type should be avoided and used specialised type.
export type GenericData = {
  data: number | string | { [Key: string]: {} };
};
