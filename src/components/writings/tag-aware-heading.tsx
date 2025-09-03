"use client"

import { useParams } from "next/navigation"
import Chip from "@/components/ui/chip";
import * as T from "@/components/ui/typography";

export default function TagAwareHeading() {
    const { tagSlug } = useParams();
    return <Chip><T.H6>#{tagSlug}</T.H6></Chip>
}