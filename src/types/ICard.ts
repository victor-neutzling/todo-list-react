export default interface ICard{
    title: string,
    description: string,
    id: string,
    selector: (id:string) => void,
    key: string,
    selected: boolean,
    color: string,
    date: string,
}