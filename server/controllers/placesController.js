const axios = require('axios');

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getUnsplashImage = (category) => {
  if (category.includes('castle'))
    return 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400';
  if (category.includes('archaeological'))
    return 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400';
  if (category.includes('memorial') || category.includes('monument'))
    return 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400';
  if (category.includes('religion') || category.includes('place_of_worship'))
    return 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400';
  if (category.includes('museum'))
    return 'https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=400';
  if (category.includes('park') || category.includes('nature'))
    return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400';
  return 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400';
};

const getWikipediaImage = async (placeName, wikipediaTag) => {
  try {
    // Pehle Wikipedia tag se try karo
    const pageName = wikipediaTag
      ? wikipediaTag.replace('en:', '')
      : placeName;

    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageName)}`,
      {
        timeout: 4000,
        headers: { 'User-Agent': 'WanderAI/1.0' }
      }
    );

    const image = response.data?.thumbnail?.source ||
                  response.data?.originalimage?.source;

    // console.log(`"${pageName}" image:`, image ? '✅ ' + image : '❌ not found');
    return image || null;

  } catch (e) {
    // 404 aaya — place name se try karo
    if (e.response?.status === 404 && wikipediaTag) {
      try {
        const response2 = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(placeName)}`,
          {
            timeout: 4000,
            headers: { 'User-Agent': 'WanderAI/1.0' }
          }
        );
        const image = response2.data?.thumbnail?.source;
        if (image) {
          console.log(`"${placeName}" fallback image: ✅`);
          return image;
        }
      } catch (e2) {
        // dono se nahi mili
      }
    }
    console.log(`Wiki error "${placeName}": using default`);
    return null;
  }
};

const getCityCoordinates = async (city) => {
  const response = await axios.get(
    'https://nominatim.openstreetmap.org/search',
    {
      params: { q: city, format: 'json', limit: 1 },
      headers: { 'User-Agent': 'WanderAI/1.0' }
    }
  );

  if (!response.data || response.data.length === 0) {
    throw new Error('City not found');
  }

  return {
    lat: parseFloat(response.data[0].lat),
    lng: parseFloat(response.data[0].lon)
  };
};

// @GET /api/places/search
const searchPlaces = async (req, res) => {
  const { city, lat, lng } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }

  try {
    const cityCoords = await getCityCoordinates(city);
    const cityLat = cityCoords.lat;
    const cityLng = cityCoords.lng;

    const userLat = lat ? parseFloat(lat) : cityLat;
    const userLng = lng ? parseFloat(lng) : cityLng;

    const placesResponse = await axios.get(
      'https://api.geoapify.com/v2/places',
      {
        params: {
          categories: 'tourism.attraction,tourism.sights',
          filter: `circle:${cityLng},${cityLat},10000`,
          limit: 30,
          apiKey: process.env.GEOAPIFY_API_KEY
        }
      }
    );

    const rawPlaces = placesResponse.data.features;

    if (!rawPlaces || rawPlaces.length === 0) {
      return res.status(404).json({ message: 'No places found' });
    }

    const placesWithDistance = await Promise.all(
      rawPlaces.map(async (feature) => {
        const props = feature.properties;
        const placeLat = props.lat;
        const placeLng = props.lon;

        const distance =
          placeLat && placeLng
            ? getDistance(userLat, userLng, placeLat, placeLng)
            : null;

        const rawCategory = props.categories?.[0] || 'tourism.attraction';
        const category = rawCategory
          .split('.')
          .pop()
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());

        // Default image
        let photo = getUnsplashImage(rawCategory);

        // Wikipedia se real image try karo
        const wikipediaTag = props.datasource?.raw?.wikipedia;
        const wikidataId = props.datasource?.raw?.wikidata;

        if (wikipediaTag || wikidataId) {
          const wikiImage = await getWikipediaImage(props.name, wikipediaTag);
          if (wikiImage) photo = wikiImage;
        }

        return {
          placeId: props.place_id,
          name: props.name || 'Unknown Place',
          address: props.formatted || 'N/A',
          city: props.city || city,
          category,
          photo,
          wiki: wikipediaTag || null,
          openingHours: props.opening_hours || null,
          coordinates: { lat: placeLat, lng: placeLng },
          distance: distance ? parseFloat(distance.toFixed(2)) : null,
          openNow: null
        };
      })
    );

    const validPlaces = placesWithDistance
      .filter((p) => p.name !== 'Unknown Place' && p.name !== '')
      .sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });

    res.status(200).json({
      city,
      cityCoordinates: { lat: cityLat, lng: cityLng },
      userCoordinates: { lat: userLat, lng: userLng },
      totalResults: validPlaces.length,
      places: validPlaces
    });

  } catch (error) {
    console.error('Places Error:', error.message);
    if (error.message === 'City not found') {
      return res.status(404).json({ message: 'City not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/places/details/:placeId
const getPlaceDetails = async (req, res) => {
  const { placeId } = req.params;

  try {
    const response = await axios.get(
      'https://api.geoapify.com/v2/places',
      {
        params: {
          filter: `place:${placeId}`,
          apiKey: process.env.GEOAPIFY_API_KEY
        }
      }
    );

    const feature = response.data.features?.[0];
    if (!feature) {
      return res.status(404).json({ message: 'Place not found' });
    }

    const props = feature.properties;

    res.status(200).json({
      placeId: props.place_id,
      name: props.name,
      address: props.formatted || 'N/A',
      city: props.city || 'N/A',
      category: props.categories?.[0]?.split('.').pop() || 'N/A',
      openingHours: props.opening_hours || 'N/A',
      wiki: props.datasource?.raw?.wikipedia || null,
      website: props.website || 'N/A',
      coordinates: { lat: props.lat, lng: props.lon }
    });

  } catch (error) {
    console.error('Place Details Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { searchPlaces, getPlaceDetails };