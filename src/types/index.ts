export interface PropertyRequest {
  location: string;
}

export interface PropertyResponse {
  propertyId: string;
  listingId: string;
  listingDisplayLevel: string;
  mlsId: string;
  url: string;
  dataSourceId: string;
  marketId: string;
  businessMarketId: string;
  mlsStatusId: string;
  servicePolicyId: string;
  listingMetadata: {
    searchStatus: string;
    listingType: string;
  };
  propertyType: string;
  beds: number;
  baths: number;
  priceInfo: {
    amount: string;
    displayLevel: string;
    priceType: string;
    homePrice: {
      displayLevel: string;
      int64Value: string;
    };
  };
  sqftInfo: {
    amount: string;
    displayLevel: string;
  };
  photosInfo: {
    photoRanges: Array<{
      startPos: number;
      endPos: number;
      version: string;
    }>;
    primaryPhotoDisplayLevel: string;
    secondaryPhotoDisplayLevel: string;
  };
  daysOnMarket: {
    daysOnMarket: string;
    timeOnRedfin: string;
    listingAddedDate: string;
    displayLevel: string;
  };
  timezone: string;
  yearBuilt: {
    yearBuilt: number;
    displayLevel: string;
  };
  lotSize: {
    amount: string;
    displayLevel: string;
  };
  hoaDues: {
    displayLevel: string;
  };
  sashes: Array<{
    sashTypeId: number;
    sashTypeName: string;
    sashTypeColor: string;
  }>;
  brokers: {
    listingBrokerAndAgent: {
      brokerName: string;
    };
    sellingBrokerAndAgent: Record<string, never>;
  };
  lastSaleData: {
    lastSoldDate: string;
  };
  personalization: Record<string, never>;
  insights: Record<string, never>;
  showMlsId: boolean;
  directAccessInfo: {
    supportPhoneNumber: string;
    timeZone: {
      id: number;
      timeZoneIdString: string;
      olsonTimeZoneIdString: string;
      description: string;
    };
  };
  fullBaths: number;
  bathInfo: {
    rawFullBaths: number;
    computedFullBaths: number;
    computedTotalBaths: number;
  };
  addressInfo: {
    centroid: {
      centroid: {
        latitude: number;
        longitude: number;
      };
      displayLevel: string;
    };
    formattedStreetLine: string;
    city: string;
    state: string;
    zip: string;
    location: string;
    streetlineDisplayLevel: string;
    unitNumberDisplayLevel: string;
    locationDisplayLevel: string;
    countryCode: string;
    postalCodeDisplayLevel: string;
  };
}
