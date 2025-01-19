/* eslint-disable @next/next/no-img-element */
import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import * as SlideUp from "@/components/ui/slideup-effect";
import * as T from "@/components/ui/typography";


export async function generateStaticParams(): Promise<{ project: string }[]> {
    const result = (await ZaneArchProjects.getAllTitle())
    return result.map(t => ({ project: t.replace(" ", "_") }));
}


export default async function Page({ params }: { params: Promise<{ project: string }> }) {
    const title = (await params).project.replace("_", " ");
    const project = await ZaneArchProjects.getByTitle(title);
    return <>
        <SlideUp.Container className='grid grid-cols-3 mt-36'>
            <div>
                <T.H3>{project.title}</T.H3>
                <T.H5 className='text-foreground/75'></T.H5>
            </div>
        </SlideUp.Container>


        <SlideUp.Div className='w-full px-8'>
            <img src={project.cover.url} alt={project.cover.alt}
                className='w-full object-cover' />
        </SlideUp.Div>
    </>
} 