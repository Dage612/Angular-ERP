export default interface IServiceBase {
    execute(methodName: string, object: object): any;
}