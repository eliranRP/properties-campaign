import axios from 'axios';
import { PropertyResponse } from '../types';

export class PropertyService {
  async getPropertyData(location: string): Promise<PropertyResponse> {
    try {
      const encodedLocation = encodeURIComponent(location);
      const autocompleteUrl = `https://www.redfin.com/stingray/do/location-autocomplete?location=${encodedLocation}&count=10&start=0&v=3&ia=true&iss=true&al=1&ooa=true&ssCount=3&mc-mv=1731627045964&mc-dsov=1738884681092&mc-mlsv=1736893328385&mc-ccv=-775191232&mc-api=3&android-app-version-code=1136`;

      const headers = {
        'User-Agent': 'PostmanRuntime/7.44.0',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        'X-RF-Android':
          'a627a07fc7095219;google/sdk_gphone64_arm64/emu64a:14/UE1A.230829.036.A1/11228894:userdebug/dev-keys;Android;Google;560.0.3;1;7b1d5496-7922-4a9f-abea-7e298179d302;560.0',
      };

      // STEP 1: Call autocomplete
      const autocompleteRes = await axios.get(autocompleteUrl, { headers });
      const cleaned = autocompleteRes.data.replace(/^{}&&/, '');
      const parsed = JSON.parse(cleaned);
      const exactMatch = parsed?.payload?.exactMatch;

      if (!exactMatch?.url || !exactMatch?.id) {
        throw new Error('Property not found from autocomplete');
      }
      // STEP 2: Call protoListingResolver
      const encodedListingUrl = encodeURIComponent(exactMatch.url);
      const listingDetailsUrl = `https://www.redfin.com/stingray/mobile/v2/protoListingResolver?listing_url=${encodedListingUrl}&past_sale_ok=true&android-app-version-code=1136&mc-mv=1731627045964&mc-dsov=1738884681092&mc-mlsv=1736893328385&mc-ccv=-775191232&mc-api=3`;

      const listingRes = await axios.get(listingDetailsUrl, { headers });
      const homeData = listingRes?.data?.searchResult?.homes?.[0]?.homeData;
      return homeData as PropertyResponse;
    } catch (error) {
      console.error('Error fetching property data:', error);
      throw new Error('Failed to fetch property data');
    }
  }
}
