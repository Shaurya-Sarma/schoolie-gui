import { Tag } from "../components/add-note/add-note.component";

export class Note {
  _id: string;
  name: string;
  data: string;
  tags: Tag[];
  date: Date;
  userId: string;
}
