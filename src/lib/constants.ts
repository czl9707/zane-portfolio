export type RoleType = "developer" | "architect" | "human-being" | "christian";
export type ContentType = "blog" | "project" | "note"

export function displayRole(role: RoleType) {
    switch (role) {
        case "developer": return "Software Developer";
        case "architect": return "Architect";
        case "human-being": return "Human Being";
        case "christian": return "Christian";
    }
}