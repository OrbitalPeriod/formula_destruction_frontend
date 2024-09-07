export interface ApiResponse<T>{
    message : string,
    data : T | null
}

export interface Season{
    season : number,
    season_name : string
}

export interface DriverInfo {
    driver_id : number,
    username : string,
    driver_number : number,
    driver_image_url : string,
    birthday : Date | null,
    country : string,
}

export interface Driver{
    driver_id : number,
    username : string,
    driver_number : number,
    driver_image_url : string,
    birthday : Date | null,
    country : string,
    seats : Seat[],
}

export interface Seat{
    seat_id : number,
    results : RaceResult[],
    team : Team[],
}

export interface Team{
    team_id : number,
    name : string,
    color : string,
}

export interface RaceResult {
    position: number,
    bot_result: boolean,
    pole: boolean,
    leading_lap: boolean,
    fastest_lap: boolean,
    qualy_result: number | null,
    season: number,
    race_id: number,
    race_name: string,
    points: number
}

export interface SeasonInfo{
    season : Season,
    races : Race[]
}

export interface Race{
    race_name : string,
    season : number,
    results : PersonalResult[]
}

export interface PersonalResult{
    race_results : RaceResult,
    driver_info : DriverInfo,
    team : Team
}

export interface RaceInfo{
    race_name : string,
    season : number,
    race_id : number,
}