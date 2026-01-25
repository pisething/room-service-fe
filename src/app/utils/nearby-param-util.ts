import { HttpParams } from '@angular/common/http';
import { buildParams } from './param-util';
import { RoomListParams } from '../models/room-list-params';

/**
 * Build query params for /rooms/nearby with your backend contract:
 * - lat/lon/radius/page/size at root
 * - all normal filters under otherFilters.*
 */
export function buildNearbyParams(filter: RoomListParams): HttpParams {
  // 1) root params for NearbyRoomFilterDTO
  const root = buildParams({
    lat: filter.lat,
    lon: filter.lon,
    radiusMeters: filter.radiusMeters,
    page: filter.page,
    size: filter.size
  });

  // 2) other filters for RoomFilterDTO (namespaced)
  const other = buildParams({
    // all your normal filters:
    roomType: filter.roomType,
    propertyType: filter.propertyType,
    priceMin: filter.priceMin,
    priceMax: filter.priceMax,

    provinceCode: filter.provinceCode,
    districtCode: filter.districtCode,
    communeCode: filter.communeCode,
    villageCode: filter.villageCode,

    hasWiFi: filter.hasWiFi,
    hasAirConditioner: filter.hasAirConditioner,
    hasParking: filter.hasParking,
    hasPrivateBathroom: filter.hasPrivateBathroom,
    hasKitchen: filter.hasKitchen,
    hasWashingMachine: filter.hasWashingMachine
  });

  // 3) rename keys => otherFilters.<key>
  let params = root;

  // HttpParams has no iterator, so we use keys() + getAll()
  for (const key of other.keys()) {
    const values = other.getAll(key) ?? [];
    for (const v of values) {
      params = params.append(`otherFilters.${key}`, v);
    }
  }

  return params;
}
