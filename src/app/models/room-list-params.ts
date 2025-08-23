export interface RoomListParams {
  page?: number;           // 0-based
  size?: number;           // page size
  sort?: string;           // e.g., "createdAt,desc"
  q?: string;              // free-text
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  roomType?: string;       // or your enum string
  propertyType?: string;
  genderPreference?: string;
}
