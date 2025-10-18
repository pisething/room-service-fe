export interface RoomListParams {
    page?: number;
    size?: number;
    sort?: string;
    roomType?: string;
    properType?: string;
    price?: number;
    priceMin: number | null;
    priceMax: number | null;
    provinceCode?: string;
    districtCode?: string;
    communeCode?: string;
    villageCode?: string;
}
