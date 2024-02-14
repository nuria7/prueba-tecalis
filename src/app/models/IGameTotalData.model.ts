import { IGameResultsData } from "./IGameResultsData.model";


export interface IGameTotalData {
    count?: number;
    next?: any;
    previous?: any;
    results: Array<IGameResultsData>;   
}