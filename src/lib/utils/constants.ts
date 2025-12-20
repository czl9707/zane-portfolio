export type RoleType = "developer" | "architect" | "human-being" | "christian";
export type ContentType = "blog" | "project" | "note"

export function displayRole(role: RoleType) {
    switch (role) {
        case "developer": return "Developer";
        case "architect": return "Architect";
        case "human-being": return "Human Being";
        case "christian": return "Christian";
    }
}

export const SITE_TITLE = "Zane Chen";
export const SITE_DESCRIPTION = 'Zane\'s digital corner, where he dumps his thoughts, projects, and insights on anything.';
