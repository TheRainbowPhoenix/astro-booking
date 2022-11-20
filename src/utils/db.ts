export const getChannel = (code) => {
  return {
    name: `channel-${code}`,
    id: `${code}`,
  };
};

export const getProperty = (uuid) => {
  return {
    uuid: `${uuid}`,
    name: "Résidence Lunaire",
    description:
      "The best place to spend your holidays on, far from everything but with a perfect view on earth",
    website: "http://www.example.com/",
    starRating: 4,
    starRated: true,
    address: {
      addressLine1: "Place of star ",
      addressLine2: "",
      city: "Selenia ",
      state: "Nyx ",
      postcode: "42000 ",
      googleMapLink: "",
      country: {
        name: "France",
        code: "FR",
      },
      latitude: "0.0",
      longitude: "0.0",
      locationInstructions:
        "Get to the nearest rocket station and tell them to aim for the moon! ",
    },
    contact: {
      phone: ["0600000000"],
      email: "astrobooking@example.com",
      abn: null,
    },
    amenities: [
      {
        name: "Outdoor sun view",
        icon: null,
      },
    ],
    parkingFeatures: [
      {
        name: "Security Landing",
        icon: null,
        code: "security_landing",
      },
    ],
    banner: {
      desktop: {
        standard:
          "https://d3ltdu8ywan39g.cloudfront.net/attachments/properties/banners/22680/standard_paysage_site.png",
        large:
          "https://d3ltdu8ywan39g.cloudfront.net/attachments/properties/banners/22680/paysage_site.png",
      },
      mobile: {
        standard:
          "https://d3ltdu8ywan39g.cloudfront.net/attachments/properties/mobile_banners/22680/standard_paysage_site.png",
        large:
          "https://d3ltdu8ywan39g.cloudfront.net/attachments/properties/mobile_banners/22680/paysage_site.png",
      },
    },
    images: [
      {
        url: {
          fullsize:
            "https://d3ltdu8ywan39g.cloudfront.net/attachments/property_photos/images/174195/Hotel_Bastide_Lourmarin_-_exterieur_-_VincentAGNES-12.jpg",
          standard:
            "https://d3ltdu8ywan39g.cloudfront.net/attachments/property_photos/images/174195/standard_Hotel_Bastide_Lourmarin_-_exterieur_-_VincentAGNES-12.jpg",
          thumbnail:
            "https://d3ltdu8ywan39g.cloudfront.net/attachments/property_photos/images/174195/thumb_Hotel_Bastide_Lourmarin_-_exterieur_-_VincentAGNES-12.jpg",
        },
        description: "",
        sortindex: 0,
      },
    ],
    policies: [
      {
        type: "termsAndConditions",
        content:
          "Conditions d'annulation<br><br><ul><li>SANS FRAIS lors d'une annulation plus de 14  jours avant l'arrivée</li></ul><br><ul><li>30% du montant de l'hébergement pour une annulation à moins de 14 jours</li></ul><br><ul><li>La totalité du séjour pour une annulation à moins de 48 heures à l'avance ou en cas de non-présentation</li></ul><br><br><br>Le jour de votre arrivée, notre équipe vous accueille de 15h00 à 21h00. Si toutefois vous deviez arriver en dehors de ces horaires, merci de nous en notifier afin que vous disposiez des informations nécessaires pour récupérer votre chambre.<br><br><ul><li>Free of charge when cancelled up to 14 days before arrival</li></ul><br><ul><li>30% of the total stay when cancelled less than 14 days before arrival</li></ul><br><ul><li>The full amout of the stay when cancelled 48 hours or less before arrival</li></ul><br>Our reception desk is open until 10 PM. Should you be arriving later than this time, kindly let us know in order for us to send you all necessary informations for late check-in.",
        rules: [],
        penaltyRules: null,
      },
      {
        type: "propertyCancellationPolicy",
        content: "Veuillez mettre à jour",
        rules: null,
        penaltyRules: [
          {
            type: "Percentage",
            daysPriorCheckIn: 7,
            amount: 50,
            startDate: "2022-02-25",
            endDate: "2022-06-30",
          },
        ],
      },
    ],
    partner: {
      name: "Booking",
      domain: "astrobooking.example.com",
    },
  };
};

export const getRooms = (code) => {
  return {
    rooms: [
      {
        uuid: 10000,
        name: "Room One",
        catergory: "room",
        description:
          "These 2 smaller “entry level” rooms are perfect for a short stop on the moon.",
        smoking: null,
        view: "Limited view",
        bathrooms: 1,
        bedrooms: ["Double bed"],
        position: 0,
        dimensions: {
          sqm: 18,
          sqft: 20.2,
        },
        amenities: [
          {
            name: "Television",
            icon: "ic-television",
            featured: true,
          },
          {
            name: "Air conditioned",
            icon: "ic-air-conditioned",
            featured: true,
          },
          {
            name: "Wireless Internet",
            icon: "ic-wifi",
            featured: true,
          },
        ],
        images: [],
        minAvailability: 0,
        maxOccupancy: 2,
        rates: [
          {
            uuid: 20000,
            name: "Standard Rate",
            description: "ChangeMe",
            ratePlanDescription: "",
            promotional: false,
            promotionOnly: false,
            nonGuaranteeCutofftime: "",
            releasePeriod: "",
            isLastMinute: false,
            stayForTotalNights: null,
            payOnlyTotalNights: null,
            isPackageDeal: false,
            isLengthOfStayDeal: false,
            minStay: 1,
            customTextAreaFieldLabel: "",
            useCustomTextAreaField: false,
            position: 0,
            maxNumberOfRooms: 10,
            occupancy: {
              included: 2,
              adultRequired: true,
              maxOccupants: 2,
              maxAdults: 2,
              maxChildren: 0,
              maxInfants: 0,
            },
            policies: [],
          },
        ],
      },
      {
        uuid: 10001,
        name: "Room Two",
        catergory: "room",
        description:
          "Each rooms propose a unique and cosy decoration, with a large step the moon.",
        smoking: null,
        view: "Standard view",
        bathrooms: 1,
        bedrooms: ["Double bed"],
        position: 0,
        dimensions: {
          sqm: 20,
          sqft: 215.2,
        },
        amenities: [
          {
            name: "Television",
            icon: "ic-television",
            featured: true,
          },
          {
            name: "Air conditioned",
            icon: "ic-air-conditioned",
            featured: true,
          },
          {
            name: "Wireless Internet",
            icon: "ic-wifi",
            featured: true,
          },
        ],
        images: [],
        minAvailability: 0,
        maxOccupancy: 2,
        rates: [
          {
            uuid: 20000,
            name: "Standard Rate",
            description: "ChangeMe",
            ratePlanDescription: "",
            promotional: false,
            promotionOnly: false,
            nonGuaranteeCutofftime: "",
            releasePeriod: "",
            isLastMinute: false,
            stayForTotalNights: null,
            payOnlyTotalNights: null,
            isPackageDeal: false,
            isLengthOfStayDeal: false,
            minStay: 1,
            customTextAreaFieldLabel: "",
            useCustomTextAreaField: false,
            position: 0,
            maxNumberOfRooms: 10,
            occupancy: {
              included: 2,
              adultRequired: true,
              maxOccupants: 2,
              maxAdults: 2,
              maxChildren: 0,
              maxInfants: 0,
            },
            policies: [],
          },
        ],
      },
      {
        uuid: 10002,
        name: "Room Three",
        catergory: "room",
        description: "Get the atmosphere of a cozy and nice place to rest.",
        smoking: null,
        view: "Advanced view",
        bathrooms: 1,
        bedrooms: ["Double bed"],
        position: 0,
        dimensions: {
          sqm: 18,
          sqft: 20.2,
        },
        amenities: [
          {
            name: "Television",
            icon: "ic-television",
            featured: true,
          },
          {
            name: "Air conditioned",
            icon: "ic-air-conditioned",
            featured: true,
          },
          {
            name: "Wireless Internet",
            icon: "ic-wifi",
            featured: true,
          },
        ],
        images: [],
        minAvailability: 0,
        maxOccupancy: 2,
        rates: [
          {
            uuid: 20000,
            name: "Standard Rate",
            description: "ChangeMe",
            ratePlanDescription: "",
            promotional: false,
            promotionOnly: false,
            nonGuaranteeCutofftime: "",
            releasePeriod: "",
            isLastMinute: false,
            stayForTotalNights: null,
            payOnlyTotalNights: null,
            isPackageDeal: false,
            isLengthOfStayDeal: false,
            minStay: 1,
            customTextAreaFieldLabel: "",
            useCustomTextAreaField: false,
            position: 0,
            maxNumberOfRooms: 10,
            occupancy: {
              included: 2,
              adultRequired: true,
              maxOccupants: 2,
              maxAdults: 2,
              maxChildren: 0,
              maxInfants: 0,
            },
            policies: [],
          },
        ],
      },
    ],
  };
};
