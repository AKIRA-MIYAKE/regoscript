export default class Store {
    private conn;
    constructor(conn?: any);
    clone(): Store;
    isDefined(variable: string): boolean;
    defineVar(variable: string): void;
    getValue(variable: string): any;
    setValue(variable: string, value: any): any;
    private getId;
    private getVar;
}
//# sourceMappingURL=index.d.ts.map