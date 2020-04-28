import { PipeTransform, Pipe } from "@angular/core";
import { Note } from "src/app/model/note";

@Pipe({
  name: "notesFilter",
})
export class notesFilterPipe implements PipeTransform {
  transform(notes: Note[], searchTerm: string): Note[] {
    if (!notes || !searchTerm) {
      return notes;
    }
    searchTerm = searchTerm.trim();
    return notes.filter(
      (note) =>
        note.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        note.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }
}
