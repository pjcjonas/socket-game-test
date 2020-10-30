export interface IPlayerData{
    id: string;
    name: string;
    movement?: IPlayerMovement;
}

export interface IPlayerMovement {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
}