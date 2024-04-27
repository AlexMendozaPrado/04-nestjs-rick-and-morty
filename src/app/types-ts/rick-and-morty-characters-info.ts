export interface RickAndMortyCharactersInfo {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    creadted :string;


}
export interface RickAndMortyCharactersInfoResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: RickAndMortyCharactersInfo[];
}

export interface restApiResponseData {
    info:RickAndMortyCharactersInfoResponse;
    results: RickAndMortyCharactersInfo[];
}