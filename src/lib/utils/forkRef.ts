export function forkRefs<T extends HTMLElement>(...refs: React.Ref<T | undefined>[]) {
    return (node: T) => {
        for (const ref of refs) {
            if (ref != null) {
                if (typeof ref === 'function') ref(node);
                else ref.current = node;
            }
        }
    }
}