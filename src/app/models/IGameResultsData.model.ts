import { IGameInfoData } from "./IGameInfoData.model";

export interface IGameResultsData {
    domain?: string;
    games?: Array<IGameInfoData>;
    games_count?: number;
    id?: number;
    image_background?: string;
    name: string;
    slug: string;
    description?: string;
}