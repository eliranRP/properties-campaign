import { PropertyResponse } from '../types';

export class PropertyService {
  private readonly headers = {
    'User-Agent': 'PostmanRuntime/7.44.0',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'X-RF-Android':
      'a627a07fc7095219;google/sdk_gphone64_arm64/emu64a:14/UE1A.230829.036.A1/11228894:userdebug/dev-keys;Android;Google;560.0.3;1;7b1d5496-7922-4a9f-abea-7e298179d302;560.0',
  };

  private async getAutocompleteData(location: string) {
    console.log('Step 1: Getting autocomplete data for location:', location);
    const encodedLocation = encodeURIComponent(location);
    const autocompleteUrl = `https://www.redfin.com/stingray/do/location-autocomplete?location=${encodedLocation}&count=10&start=0&v=3&ia=true&iss=true&al=1&ooa=true&ssCount=3&mc-mv=1731627045964&mc-dsov=1738884681092&mc-mlsv=1736893328385&mc-ccv=-775191232&mc-api=3&android-app-version-code=1136`;

    try {
      console.log('Making autocomplete API request to:', autocompleteUrl);
      const response = await fetch(autocompleteUrl, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Received autocomplete response');
      const data = await response.text();
      const cleaned = data.replace(/^{}&&/, '');
      const parsed = JSON.parse(cleaned);
      const exactMatch = parsed?.payload?.exactMatch;

      if (!exactMatch?.url || !exactMatch?.id) {
        console.error('No exact match found in autocomplete response');
        throw new Error('Property not found from autocomplete');
      }

      console.log('Found exact match:', {
        url: exactMatch.url,
        id: exactMatch.id,
      });

      return exactMatch;
    } catch (error) {
      console.error('Error in getAutocompleteData:', error);
      throw new Error('Failed to get autocomplete data');
    }
  }

  private async getListingDetails(listingUrl: string) {
    console.log('Step 2: Getting listing details for URL:', listingUrl);
    const encodedListingUrl = encodeURIComponent(listingUrl);
    const listingDetailsUrl = `https://www.redfin.com/stingray/mobile/v2/protoListingResolver?listing_url=${encodedListingUrl}&past_sale_ok=true&android-app-version-code=1136&mc-mv=1731627045964&mc-dsov=1738884681092&mc-mlsv=1736893328385&mc-ccv=-775191232&mc-api=3`;

    try {
      console.log('Making listing details API request to:', listingDetailsUrl);
      const response = await fetch(listingDetailsUrl, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Received listing details response');
      const data = await response.text();
      const cleaned = data.replace(/^{}&&/, '');
      const parsed = JSON.parse(cleaned);
      const homeData = parsed?.searchResult?.homes?.[0]?.homeData;

      if (!homeData) {
        console.error('No home data found in listing response');
        throw new Error('No home data found from listing details');
      }

      console.log(
        'Successfully retrieved home data for property:',
        homeData.propertyId
      );
      return homeData;
    } catch (error) {
      console.error('Error in getListingDetails:', error);
      throw new Error('Failed to get listing details');
    }
  }

  async getPropertyData(
    location: string,
    listingId: any
  ): Promise<PropertyResponse> {
    console.log('Starting property data fetch for location:', location);
    try {
      const exactMatch = await this.getAutocompleteData(location);
      console.log('getAutocompleteData', exactMatch);
      const homeData = await this.getListingDetails(exactMatch.url);

      console.log('Successfully completed property data fetch');
      return { ...homeData, listingId } as PropertyResponse;
    } catch (error) {
      console.error('Error in getPropertyData:', error);
      throw new Error('Failed to fetch property data');
    }
  }
}
