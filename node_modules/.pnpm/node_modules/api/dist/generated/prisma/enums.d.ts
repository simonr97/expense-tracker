export declare const ExpenseStatus: {
    readonly Completed: "Completed";
    readonly Pending: "Pending";
};
export type ExpenseStatus = (typeof ExpenseStatus)[keyof typeof ExpenseStatus];
