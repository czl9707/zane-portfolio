export function DateRangeAsString(startDate: Date, endDate?: Date) {
    return (
        startDate.toLocaleString('US', { month: 'short', year: "numeric" }) +
        " - " +
        (endDate?.toLocaleString('US', { month: 'short', year: "numeric" }) ?? "Ongoing")
    );
}

export function MonthAsString(date: Date) {
    return date.toLocaleString('US', { month: 'short', year: "numeric" });
}

export function DateAsString(date: Date) {
    return date.toLocaleString('US', { month: 'short', year: "numeric", day: "2-digit", });
}