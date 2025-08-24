import { Agent } from "./agent";
import { GenderPreference, RoomType, PropertyType } from "./enum";
import { RoomLocation } from "./location";

export interface Room {
        id?: string;

    name: string;
    price?: number;               // price per month
    floor?: number;
    roomSize?: number;            // square meters

    location?: RoomLocation;

    hasFan?: boolean;
    hasAirConditioner?: boolean;
    hasParking?: boolean;
    hasPrivateBathroom?: boolean;
    hasBalcony?: boolean;
    hasKitchen?: boolean;
    hasFridge?: boolean;
    hasWashingMachine?: boolean;
    hasTV?: boolean;
    hasWiFi?: boolean;
    hasElevator?: boolean;

    maxOccupants?: number;
    isPetFriendly?: boolean;
    isSmokingAllowed?: boolean;
    isSharedRoom?: boolean;
    genderPreference?: GenderPreference;

    roomType?: RoomType;
    propertyType?: PropertyType;

    distanceToCenter?: number;
    nearbyLandmarks?: string[];

    isUtilityIncluded?: boolean;
    depositRequired?: boolean;
    minStayMonths?: number;

    hasPhotos?: boolean;
    photoCount?: number;
    hasVideoTour?: boolean;

    verifiedListing?: boolean;

    availableFrom?: string;   // ISO string
    availableTo?: string;     // ISO string

    createdAt?: string;
    lastUpdated?: string;
    imageUrl?: string;
    agent?: Agent;
    bedrooms?: number;
    isFeatured?: boolean;
    status?: boolean;
    bathrooms?: number;
    images?: string[];

    extraAttributes?: Record<string, any>; 
}
