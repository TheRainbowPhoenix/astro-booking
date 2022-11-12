// Fetch from /api/graphql?operationName=fetchPropertyContents&variables={"channelCode":"hotelbastidedelourmarindirect","locale":"en"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"040beba1013dc2700a73cff13f4e66bc5f64c8768eb5b8afed328fc3787fe4f9"}}

export type Property = {
  uuid: string;
  name: string;
  description: string;
  website?: string;
  starRating?: number;
  starRated: boolean;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postcode: number;
    googleMapLink?: string;
    country: {
      name: string;
      code: string;
    };
    latitude: string;
    longitude: number;
    locationInstructions?: string /* HTML */;
  };
  contact: {
    phone: string;
    email: string;
  };
  amenities: {
    name: string;
    icon?: string | null;
  }[];
  parkingFeatures?: {
    name: string;
    icon: string;
    code: string;
  }[];
  banner: {
    desktop: {
      standard: string;
      large: string;
    };
    mobile: {
      standard: string;
      large: string;
    };
  };
  images: {
    url: {
      fullsize: string;
      standard: string;
      thumbnail: string;
    };
    description: string;
    sortindex: number;
  }[];
  policies: {
    type: string;
    content: string /* HTML */;
    rules: any[];
    penaltyRules?: {
      type: string;
      daysPriorCheckIn: number;
      amount?: number | null;
      startDate: string;
      endDate: string;
    }[];
  }[];
  partner: {
    name: string;
    domain: string;
  };
};
