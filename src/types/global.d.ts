type Listings = {
  categories: any[];
  count: number;
  data: any[];
  source: string;
  type: string;
}

type Listing = {
  category?: string;
  ref: string;
  info: {
    amenities: any[];
    available: boolean;
    currency: {
      code: string;
      name: string;
      symbol: string;
    };
    description: string;
    details: {
      count: number;
      data: {
        type: string;
        value: string;
      }[]
    }
    host: {
      isSuperhost: boolean;
      name: string;
      avatar: {
        url: string;
        width: number;
        height: number;
      }
    }
    id: string;
    images: {
      count: number;
      data: {
        height: number;
        width: number;
        url: string;
      }[]
    }
    location: {
      lat: number;
      long: number;
      city: string;
      country: {
        code: string;
        title: string;
      }
    }
    mainImage: {
      url: string;
      width: number;
      height: number;
    }
    maxGuestCapacity: number;
    price: number;
    ratings: {
      accuracy: number
      checkin: number
      cleanliness: number
      communication: number
      location: number
      value: number
      guestSatisfactionOverall: number
    }
    title: string;
    type: string;
    visibleReviewCount: number;
  }
}