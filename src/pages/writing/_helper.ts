import type { DataEntryMap } from "astro:content";

type BlogType = DataEntryMap["blog"][string] ;
type NoteType = DataEntryMap["note"][string];


export function arrangeContent(notes: NoteType[], blogs: BlogType[]): (BlogType | NoteType)[] {
    const FACTOR = 3;
    const writings: (BlogType | NoteType)[] = [];
    for (let i = 0; i < blogs.length || i * FACTOR < notes.length; i++) {
        if (i < blogs.length) {
            writings.push(blogs[i]);
        }
        for (let j = 0; j < FACTOR && j + i * FACTOR < notes.length; j++) {
            writings.push(notes[j + i * FACTOR])
        }
    }

    return writings;
}