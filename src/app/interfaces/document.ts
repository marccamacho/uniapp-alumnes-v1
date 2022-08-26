import { Tag } from './tag'

export interface Document {
  name: string;
  description?: string;
  rid?: string;
  kind: Tag;
  describes: any;
  kindId?: string;
  describesId?: string;
  downloadURL?: string;
  file?:any;
  unicity?:string;
}
