import { A } from "nanostores/computed";

export type RoomDimensions = {
    sqm?: string;
    sqfr?: string;
}

export type RoomImageUrl = {
    fullsize?: string;
    thumbnail?: string;
}

export type RoomImage = {
    url: RoomImageUrl;
    description?: string;
    sortindex: number;
}

export type Room = {
    uuid: string
    name: string;
    category: string;
    description: string;
    smoking: boolean;
    view?: string;
    bathroom?: any;
    bedrooms: string[];
    position: number;
    dimensions: RoomDimensions;
    amenities: Amenity[];
    images: RoomImage[];
    floorPlans: any[];
    minAvailability: number; 
    maxOccupancy: number; 
    rates: Rate[];
};

export type Amenity = {
    name: string;
    icon: string;
    featured: boolean
}

export type Occupancy = {
    included: number;
    adultRequired: boolean;
    maxOccupants: number;
    maxAdults: number;
    maxChildren: number;
    maxInfants: number;
}


export type PenaltyRules = {
    type: string;
    daysPriorCheckIn: number;
    amount: number;
    startDate: string;
    endDate: string;
}

export type Policy = {
    type: string;
    content?: string;
    rules: any; // TODO
    penaltyRules?: PenaltyRules[];
}


export type Rate = {
    uuid: number;
    name: string;
    description: string;
    ratePlanDescription?: string;
    promotional: boolean;
    promotionalOnly: boolean;
    nonGuaranteeCutofftime?: string;
    isLastMinute: boolean;
    minStay: number;
    maxNumberOfRooms: number;
    policies: Policy[];
    occupancy: Occupancy;
};