/* eslint-disable @next/next/no-img-element */
import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import * as SlideUp from "@/components/ui/slideup-effect";


export async function generateStaticParams(): Promise<{ project: string }[]> {
    const result = (await ZaneArchProjects.getAllTitle())
    return result.map(t => ({ project: t.replace(" ", "_") }));
}


export default async function Page({ params }: { params: Promise<{ project: string }> }) {
    const title = (await params).project.replace("_", " ");
    const project = await ZaneArchProjects.getByTitle(title);
    return <>
        <SlideUp.Div className='w-full'>
            <img src={project.cover.url} alt={project.cover.alt}
                className='w-full object-cover' />
        </SlideUp.Div>
    </>
} 