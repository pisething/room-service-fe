export interface RoomListParams {
    page?: number;
    size?: number;
    sort?: string;
    roomType?: string;
    properType?: string;
    price?: number;
    // add these
  priceMin?: number | null;
  priceMax?: number | null;
}
