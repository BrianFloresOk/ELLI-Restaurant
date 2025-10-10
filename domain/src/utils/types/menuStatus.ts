export const MenuStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
} as const;

export type MenuStatus = (typeof MenuStatus)[keyof typeof MenuStatus];