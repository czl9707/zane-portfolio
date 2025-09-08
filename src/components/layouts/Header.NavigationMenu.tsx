import type React from "react";
import navigationMenuStyle from "./Header.NavigationMenu.module.css";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function HeaderNavigationMenu({
    label,
    content,
}: {
    content?: React.ReactNode;
    label?: React.ReactNode;
    children: any[] // for astro typescript
}) {
    return (
        <NavigationMenu.Root>
            <NavigationMenu.List className={navigationMenuStyle.NavigationList}>
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className={navigationMenuStyle.NavigationTrigger} asChild>
                        <div>
                        {label}
                        </div>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className={navigationMenuStyle.NavigationMenuPanel}>
                        <div>
                            {content}
                        </div>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu.Root>
    );
}
