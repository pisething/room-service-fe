import { PropertyType, RoomType } from "./enum";
import { SortOption } from "./sort-option";

export interface RoomListParams {
    page?: number;
    size?: number;
    sort?: SortOption;
    sortBy?: 'createdAt' | 'price' | 'viewCount' | 'name';
    direction?: 'asc' | 'desc';
    roomType?: RoomType | null;
    propertyType?: PropertyType | null;
    price?: number;
    priceMin: number | null;
    priceMax: number | null;
    provinceCode?: string | null;
    districtCode?: string | null;
    communeCode?: string | null;
    villageCode?: string | null;
    hasWiFi?: false,
    hasAirConditioner?: false,
    hasParking?: false,
    hasPrivateBathroom?: false,
    hasKitchen?: false,
    hasWashingMachine?: false,
}
