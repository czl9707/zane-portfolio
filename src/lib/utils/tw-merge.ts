import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            spacing: [
                "header",
                "block",
                "group",
                "component",
                "paragraph"
            ],
        },
    },
})