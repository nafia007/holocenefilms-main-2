// Mock film data for the Film IP Marketplace

export const MOCK_FILMS = [
  {
    tokenId: 1,
    title: "The Last Frontier",
    filmmaker: "John Doe",
    description: "A gripping documentary about the last untouched wilderness in Alaska and the communities fighting to preserve it against climate change and industrial development.",
    price: 450,
    royaltyPercentage: 10,
    category: "Documentary",
    imageUrl: "https://images.unsplash.com/photo-1610993302484-8c1ea6120fe0?q=80&w=2070&auto=format&fit=crop",
    metadata: {
      name: "The Last Frontier",
      description: "A gripping documentary about the last untouched wilderness in Alaska and the communities fighting to preserve it against climate change and industrial development.",
      image: "https://images.unsplash.com/photo-1610993302484-8c1ea6120fe0?q=80&w=2070&auto=format&fit=crop",
      properties: {
        filmmaker: "John Doe",
        price: 450,
        royaltyPercentage: 10,
        category: "Documentary",
        createdAt: "2023-05-15T14:30:00Z",
        duration: "87 minutes",
        currentOwner: "John Doe",
        views: 1245,
        sales: 8,
        exclusive: true,
        awards: [
          "Best Documentary - Sundance Film Festival 2023",
          "Environmental Filmmaker Award 2023"
        ],
        attributes: [
          { trait_type: "Genre", value: "Environmental Documentary" },
          { trait_type: "Resolution", value: "4K" },
          { trait_type: "Language", value: "English" },
          { trait_type: "Subtitles", value: "Multiple" }
        ]
      }
    }
  },
  {
    tokenId: 2,
    title: "Urban Legends",
    filmmaker: "John Doe",
    description: "An anthology of short stories exploring modern urban myths and their psychological impact on city dwellers across different cultures.",
    price: 320,
    royaltyPercentage: 8,
    category: "Short Film",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
    metadata: {
      name: "Urban Legends",
      description: "An anthology of short stories exploring modern urban myths and their psychological impact on city dwellers across different cultures.",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
      properties: {
        filmmaker: "John Doe",
        price: 320,
        royaltyPercentage: 8,
        category: "Short Film",
        createdAt: "2023-07-22T09:15:00Z",
        duration: "32 minutes",
        currentOwner: "John Doe",
        views: 876,
        sales: 5,
        exclusive: false,
        awards: [
          "Best Anthology - Short Film Festival 2023"
        ],
        attributes: [
          { trait_type: "Genre", value: "Psychological Thriller" },
          { trait_type: "Resolution", value: "2K" },
          { trait_type: "Language", value: "Multiple" },
          { trait_type: "Subtitles", value: "English" }
        ]
      }
    }
  },
  {
    tokenId: 3,
    title: "Beyond the Horizon",
    filmmaker: "John Doe",
    description: "A visually stunning exploration of space exploration and humanity's quest to reach beyond our solar system, featuring interviews with leading astronomers and NASA scientists.",
    price: 550,
    royaltyPercentage: 12,
    category: "Documentary",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    metadata: {
      name: "Beyond the Horizon",
      description: "A visually stunning exploration of space exploration and humanity's quest to reach beyond our solar system, featuring interviews with leading astronomers and NASA scientists.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      properties: {
        filmmaker: "John Doe",
        price: 550,
        royaltyPercentage: 12,
        category: "Documentary",
        createdAt: "2023-03-10T16:45:00Z",
        duration: "95 minutes",
        currentOwner: "John Doe",
        views: 1890,
        sales: 11,
        exclusive: true,
        awards: [
          "Best Scientific Documentary 2023",
          "Visual Excellence Award - Documentary Film Association"
        ],
        attributes: [
          { trait_type: "Genre", value: "Science Documentary" },
          { trait_type: "Resolution", value: "8K" },
          { trait_type: "Language", value: "English" },
          { trait_type: "Subtitles", value: "Multiple" },
          { trait_type: "Special Features", value: "Behind the Scenes" }
        ]
      }
    }
  },
  {
    tokenId: 4,
    title: "Whispers in the Wind",
    filmmaker: "Emma Chen",
    description: "A poetic journey through rural China, capturing the fading traditions and wisdom of elderly villagers as modernization transforms their way of life.",
    price: 380,
    royaltyPercentage: 9,
    category: "Documentary",
    imageUrl: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?q=80&w=2070&auto=format&fit=crop",
    metadata: {
      name: "Whispers in the Wind",
      description: "A poetic journey through rural China, capturing the fading traditions and wisdom of elderly villagers as modernization transforms their way of life.",
      image: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?q=80&w=2070&auto=format&fit=crop",
      properties: {
        filmmaker: "Emma Chen",
        price: 380,
        royaltyPercentage: 9,
        category: "Documentary",
        createdAt: "2023-09-05T11:20:00Z",
        duration: "78 minutes",
        currentOwner: "Emma Chen",
        views: 945,
        sales: 6,
        exclusive: false,
        awards: [
          "Cultural Preservation Award 2023",
          "Best Cinematography - Asian Film Festival"
        ],
        attributes: [
          { trait_type: "Genre", value: "Cultural Documentary" },
          { trait_type: "Resolution", value: "4K" },
          { trait_type: "Language", value: "Mandarin" },
          { trait_type: "Subtitles", value: "English, French, Spanish" }
        ]
      }
    }
  },
  {
    tokenId: 5,
    title: "Digital Dreams",
    filmmaker: "Alex Rivera",
    description: "An experimental animation exploring the relationship between humans and technology through surreal dreamscapes and digital art.",
    price: 290,
    royaltyPercentage: 15,
    category: "Animation",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    metadata: {
      name: "Digital Dreams",
      description: "An experimental animation exploring the relationship between humans and technology through surreal dreamscapes and digital art.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      properties: {
        filmmaker: "Alex Rivera",
        price: 290,
        royaltyPercentage: 15,
        category: "Animation",
        createdAt: "2023-11-18T20:30:00Z",
        duration: "22 minutes",
        currentOwner: "Alex Rivera",
        views: 1320,
        sales: 14,
        exclusive: true,
        awards: [
          "Best Experimental Animation 2023",
          "Digital Art Excellence Award"
        ],
        attributes: [
          { trait_type: "Genre", value: "Experimental Animation" },
          { trait_type: "Resolution", value: "4K" },
          { trait_type: "Technique", value: "Mixed Media" },
          { trait_type: "Audio", value: "Original Score" }
        ]
      }
    }
  },
  {
    tokenId: 6,
    title: "Rhythm Nation",
    filmmaker: "Marcus Johnson",
    description: "A vibrant music documentary following underground musicians across five continents as they blend traditional sounds with modern beats to create revolutionary new genres.",
    price: 420,
    royaltyPercentage: 10,
    category: "Music Video",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    metadata: {
      name: "Rhythm Nation",
      description: "A vibrant music documentary following underground musicians across five continents as they blend traditional sounds with modern beats to create revolutionary new genres.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
      properties: {
        filmmaker: "Marcus Johnson",
        price: 420,
        royaltyPercentage: 10,
        category: "Music Video",
        createdAt: "2023-08-12T15:45:00Z",
        duration: "65 minutes",
        currentOwner: "Marcus Johnson",
        views: 2150,
        sales: 18,
        exclusive: false,
        awards: [
          "Best Music Documentary - Global Music Awards 2023",
          "Cultural Fusion Award - International Film Festival"
        ],
        attributes: [
          { trait_type: "Genre", value: "Music Documentary" },
          { trait_type: "Resolution", value: "4K" },
          { trait_type: "Language", value: "Multiple" },
          { trait_type: "Audio Quality", value: "Dolby Atmos" },
          { trait_type: "Subtitles", value: "Multiple" }
        ]
      }
    }
  },
  {
    tokenId: 7,
    title: "The Silent Revolution",
    filmmaker: "Sofia Mendoza",
    description: "A powerful documentary chronicling the peaceful resistance movement of indigenous communities protecting their ancestral lands from corporate exploitation.",
    price: 480,
    royaltyPercentage: 12,
    category: "Documentary",
    imageUrl: "https://images.unsplash.com/photo-1604313563542-9d276de62546?q=80&w=2070&auto=format&fit=crop",
    metadata: {
      name: "The Silent Revolution",
      description: "A powerful documentary chronicling the peaceful resistance movement of indigenous communities protecting their ancestral lands from corporate exploitation.",
      image: "https://images.unsplash.com/photo-1604313563542-9d276de62546?q=80&w=2070&auto=format&fit=crop",
      properties: {
        filmmaker: "Sofia Mendoza",
        price: 480,
        royaltyPercentage: 12,
        category: "Documentary",
        createdAt: "2023-06-30T13:15:00Z",
        duration: "92 minutes",
        currentOwner: "Sofia Mendoza",
        views: 1675,
        sales: 9,
        exclusive: true,
        awards: [
          "Human Rights Film Award 2023",
          "Best Director - Social Impact Film Festival"
        ],
        attributes: [
          { trait_type: "Genre", value: "Social Justice Documentary" },
          { trait_type: "Resolution", value: "4K" },
          { trait_type: "Language", value: "Spanish, Indigenous Languages" },
          { trait_type: "Subtitles", value: "English, French, Portuguese" },
          { trait_type: "Special Features", value: "Filmmaker Commentary" }
        ]
      }
    }
  },
  {
    tokenId: 8,
    title: "Neon Dreams",
    filmmaker: "Takashi Yamamoto",
    description: "A visually striking experimental film exploring the nightlife of Tokyo through a cyberpunk lens, blending reality and digital fantasy.",
    price: 350,
    royaltyPercentage: 14,
    category: "Experimental",
    imageUrl: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?q=80&w=1887&auto=format&fit=crop",
    metadata: {
      name: "Neon Dreams",
      description: "A visually striking experimental film exploring the nightlife of Tokyo through a cyberpunk lens, blending reality and digital fantasy.",
      image: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?q=80&w=1887&auto=format&fit=crop",
      properties: {
        filmmaker: "Takashi Yamamoto",
        price: 350,
        royaltyPercentage: 14,
        category: "Experimental",
        createdAt: "2023-10-25T22:10:00Z",
        duration: "45 minutes",
        currentOwner: "Takashi Yamamoto",
        views: 1890,
        sales: 16,
        exclusive: true,
        awards: [
          "Visual Innovation Award - Tokyo Film Festival",
          "Best Experimental Film - Digital Arts Showcase 2023"
        ],
        attributes: [
          { trait_type: "Genre", value: "Cyberpunk Experimental" },
          { trait_type: "Resolution", value: "4K" },
          { trait_type: "Language", value: "Japanese" },
          { trait_type: "Subtitles", value: "English, Chinese, Korean" },
          { trait_type: "Special Features", value: "Interactive Elements" }
        ]
      }
    }
  },
  {
    tokenId: 9,
    title: "Echoes of Tomorrow",
    filmmaker: "Maya Patel",
    description: "A thought-provoking science fiction feature that explores the ethical implications of artificial intelligence and human consciousness transfer in a near-future society.",
    price: 580,
    royaltyPercentage: 11,
    category: "Feature Film",
    imageUrl: "https://images.unsplash.com/photo-1485163819542-13adeb5e0068?q=80&w=2070&auto=format&fit=crop",
    metadata: {
      name: "Echoes of Tomorrow",
      description: "A thought-provoking science fiction feature that explores the ethical implications of artificial intelligence and human consciousness transfer in a near-future society.",
      image: "https://images.unsplash.com/photo-1485163819542-13adeb5e0068?q=80&w=2070&auto=format&fit=crop",
      properties: {
        filmmaker: "Maya Patel",
        price: 580,
        royaltyPercentage: 11,
        category: "Feature Film",
        createdAt: "2023-04-18T10:30:00Z",
        duration: "118 minutes",
        currentOwner: "Maya Patel",
        views: 2240,
        sales: 13,
        exclusive: true,
        awards: [
          "Best Screenplay - Science Fiction Film Festival 2023",
          "Audience Choice Award - Future Tech Film Showcase"
        ],
        attributes: [
          { trait_type: "Genre", value: "Science Fiction" },
          { trait_type: "Resolution", value: "4K" },
          { trait_type: "Language", value: "English" },
          { trait_type: "Subtitles", value: "Multiple" },
          { trait_type: "Special Features", value: "Director's Commentary" }
        ]
      }
    }
  },
  {
    tokenId: 10,
    title: "Canvas of Emotions",
    filmmaker: "Gabriel Moreno",
    description: "An intimate portrait of five contemporary painters from diverse backgrounds, exploring how their personal traumas and triumphs manifest in their artistic expressions.",
    price: 340,
    royaltyPercentage: 9,
    category: "Documentary",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2145&auto=format&fit=crop",
    metadata: {
      name: "Canvas of Emotions",
      description: "An intimate portrait of five contemporary painters from diverse backgrounds, exploring how their personal traumas and triumphs manifest in their artistic expressions.",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2145&auto=format&fit=crop",
      properties: {
        filmmaker: "Gabriel Moreno",
        price: 340,
        royaltyPercentage: 9,
        category: "Documentary",
        createdAt: "2023-02-05T09:45:00Z",
        duration: "84 minutes",
        currentOwner: "Gabriel Moreno",
        views: 1120,
        sales: 7,
        exclusive: false,
        awards: [
          "Best Art Documentary - International Film Critics Association",
          "Special Jury Prize - Art in Motion Festival"
        ],
        attributes: [
          { trait_type: "Genre", value: "Art Documentary" },
          { trait_type: "Resolution", value: "4K" },
          { trait_type: "Language", value: "Spanish, English" },
          { trait_type: "Subtitles", value: "Multiple" },
          { trait_type: "Special Features", value: "Extended Interviews" }
        ]
      }
    }
  }
];