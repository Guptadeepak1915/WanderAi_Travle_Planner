/*
#################################################################################
#           this below code for open api plateform                              #
#                                                                               #
#################################################################################

*/
// const OpenAI = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// // @POST /api/ai/tips
// const getPlaceTips = async (req, res) => {
//   const { placeName, city } = req.body;

//   if (!placeName || !city) {
//     return res.status(400).json({ message: 'placeName and city are required' });
//   }

//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: `You are WanderAI — a smart travel assistant. 
//           Give short, helpful, and interesting travel tips.
//           Always respond in this JSON format:
//           {
//             "tip": "main travel tip in 2-3 sentences",
//             "bestTime": "best time to visit",
//             "highlights": ["highlight 1", "highlight 2", "highlight 3"],
//             "localFood": "famous local food nearby",
//             "warning": "any important warning or thing to avoid"
//           }`
//         },
//         {
//           role: 'user',
//           content: `Give me travel tips for ${placeName} in ${city}, India.`
//         }
//       ],
//       max_tokens: 400,
//       temperature: 0.7
//     });

//     const rawText = completion.choices[0].message.content;

//     // JSON parse karo
//     const parsed = JSON.parse(rawText);

//     res.status(200).json({
//       placeName,
//       city,
//       ai: parsed
//     });
//   } catch (error) {
//     console.error('AI Error:', error.message);
//     res.status(500).json({ message: 'AI error', error: error.message });
//   }
// };

// // @POST /api/ai/itinerary
// const getItinerary = async (req, res) => {
//   const { city, hours, interests } = req.body;

//   if (!city) {
//     return res.status(400).json({ message: 'City is required' });
//   }

//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: `You are WanderAI — a smart travel planner.
//           Create a detailed travel itinerary.
//           Always respond in this JSON format:
//           {
//             "title": "itinerary title",
//             "duration": "X hours",
//             "schedule": [
//               {
//                 "time": "9:00 AM",
//                 "place": "place name",
//                 "activity": "what to do there",
//                 "duration": "1 hour"
//               }
//             ],
//             "tips": ["tip 1", "tip 2"],
//             "estimatedCost": "approximate cost in INR"
//           }`
//         },
//         {
//           role: 'user',
//           content: `Plan a ${hours || 6} hour itinerary for ${city}. 
//           My interests: ${interests || 'sightseeing, food, culture'}.
//           I am a solo traveler.`
//         }
//       ],
//       max_tokens: 800,
//       temperature: 0.7
//     });

//     const rawText = completion.choices[0].message.content;
//     const parsed = JSON.parse(rawText);

//     res.status(200).json({
//       city,
//       ai: parsed
//     });
//   } catch (error) {
//     console.error('AI Itinerary Error:', error.message);
//     res.status(500).json({ message: 'AI error', error: error.message });
//   }
// };

// // @POST /api/ai/chat
// const chatWithAI = async (req, res) => {
//   const { message, city, history } = req.body;

//   if (!message) {
//     return res.status(400).json({ message: 'Message is required' });
//   }

//   try {
//     const messages = [
//       {
//         role: 'system',
//         content: `You are WanderAI — a friendly and knowledgeable travel assistant.
//         ${city ? `The user is currently exploring ${city}.` : ''}
//         Answer travel related questions helpfully and concisely.
//         If asked about non-travel topics, politely redirect to travel.`
//       },
//       // Previous chat history
//       ...(history || []),
//       {
//         role: 'user',
//         content: message
//       }
//     ];

//     const completion = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages,
//       max_tokens: 300,
//       temperature: 0.8
//     });

//     const reply = completion.choices[0].message.content;

//     res.status(200).json({ reply });
//   } catch (error) {
//     console.error('Chat Error:', error.message);
//     res.status(500).json({ message: 'AI error', error: error.message });
//   }
// };

// module.exports = { getPlaceTips, getItinerary, chatWithAI };

/*
#################################################################################
#           this below code for openrouter api                                  #
#                                                                               #
#################################################################################

*/
const axios = require('axios');

const openRouterCall = async (messages, max_tokens = 300) => {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'google/gemma-3-4b-it:free',
      messages,
      max_tokens
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'WanderAI'
      }
    }
  );
  return response;
};

// @POST /api/ai/chat
const chatWithAI = async (req, res) => {
  const { message, city, history } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const messages = [
      {
        role: 'user',
        content: `You are WanderAI a friendly travel assistant.
        ${city ? `User is exploring ${city}.` : ''}
        Answer this: ${message}`
      }
    ];

    const response = await openRouterCall(messages, 300);
    const reply = response.data.choices[0].message.content;

    res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat Error:', error.message);
    console.error('Full Error:', error.response?.data);
    res.status(500).json({ 
      message: 'AI error', 
      error: error.message,
      details: error.response?.data 
    });
  }
};

// @POST /api/ai/tips
const getPlaceTips = async (req, res) => {
  const { placeName, city } = req.body;

  if (!placeName || !city) {
    return res.status(400).json({ message: 'placeName and city required' });
  }

  try {
    const messages = [
      {
        role: 'user',
        content: `You are a travel assistant. Give travel tips for ${placeName} in ${city}, India.
        Respond in JSON format only:
        {
          "tip": "main tip in 2-3 sentences",
          "bestTime": "best time to visit",
          "highlights": ["highlight 1", "highlight 2", "highlight 3"],
          "localFood": "famous local food",
          "warning": "important warning"
        }`
      }
    ];

    const response = await openRouterCall(messages, 500);
    const rawText = response.data.choices[0].message.content;
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid AI response format');
    const parsed = JSON.parse(jsonMatch[0]);

    res.status(200).json({ placeName, city, ai: parsed });

  } catch (error) {
    console.error('AI Tips Error:', error.message);
    console.error('Full Error:', error.response?.data);
    res.status(500).json({ 
      message: 'AI error', 
      error: error.message,
      details: error.response?.data
    });
  }
};

// @POST /api/ai/itinerary
const getItinerary = async (req, res) => {
  const { city, hours, interests } = req.body;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const messages = [
      {
        role: 'user',
        content: `You are a travel planner. Plan a ${hours || 6} hour trip in ${city}.
        Interests: ${interests || 'sightseeing, food, culture'}.
        Solo traveler.
        Respond in JSON format only:
        {
          "title": "itinerary title",
          "duration": "X hours",
          "schedule": [
            {
              "time": "9:00 AM",
              "place": "place name",
              "activity": "what to do",
              "duration": "1 hour"
            }
          ],
          "tips": ["tip 1", "tip 2"],
          "estimatedCost": "cost in INR"
        }`
      }
    ];

    const response = await openRouterCall(messages, 800);
    const rawText = response.data.choices[0].message.content;
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid AI response');
    const parsed = JSON.parse(jsonMatch[0]);

    res.status(200).json({ city, ai: parsed });

  } catch (error) {
    console.error('AI Itinerary Error:', error.message);
    console.error('Full Error:', error.response?.data);
    res.status(500).json({ 
      message: 'AI error', 
      error: error.message,
      details: error.response?.data
    });
  }
};

module.exports = { getPlaceTips, getItinerary, chatWithAI };