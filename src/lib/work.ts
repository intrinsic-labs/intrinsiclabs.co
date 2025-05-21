export interface SoftwareItem {
    id: string;
    title: string;
    description: string;
    technicalInfo?: string;
    videoUrl?: string;
    imageUrl: string;
    webLink?: string;
    buttonText?: string;
    videoType: 'youtube' | 'vimeo';
  }
  
  export const softwareItems: SoftwareItem[] = [
    {
      id: 'software1',
      title: 'Latent Spaces',
      description: `Latent Spaces is a brand new platform designed to help you unlock the full potential of AI. Current AI interfaces often reduce powerful models to harmless, honest, helpful chatbots, without reflecting the true nature of the mind behind the mask. We move beyond this limitation by giving users easy access to custom features and advanced model settings, facilitating deeper, more authentic interactions.

- Increases productivity by 10x through parallel exploration of multiple response paths
- Provides unprecedented insights into model behavior that improve prompt engineering skills
- Builds intuition for understanding how models think through visual representation of branching conversations
`,
      technicalInfo: 'iOS: Swift, SwiftUI, SwiftData | Web: Next.js, Tailwind CSS, React',
      videoUrl: 'https://www.youtube.com/embed/YFFTbfrFP1c?si=mSWOcx3ZCi-RfS0Y',
      imageUrl: '/images/work/latent-spaces.jpeg',
      webLink: 'https://latentspaces.app',
      buttonText: 'Explore The Project',
      videoType: 'youtube',
    },
    {
      id: 'software2',
      title: 'Global Missions Kiosk',
      description: `Many churches support a multitude of missionaries around the world. It's often difficult for church members to see the overall impact of their efforts.

We developed Global Missions Kiosk, which:
- Displays an interactive visual map of missionaries. Users can see an overview of each missionary's work and access up-to-date information about their individual needs and prayer requests.
- Builds and strengthens connections between congregations and missionaries.
- Can be managed effortlessly with an easy web interface.
- Can be deployed on any Android device, including tablets, kiosks, or networked PCs.
`,
      technicalInfo: 'Software: Kotlin, Jetpack Compose, Airtable | Hardware: Elo Touchscreen & Android Backpack',
      videoUrl: 'https://www.youtube.com/embed/zlIO9DF13Wc?si=0-rSoJsqFYBjARsJ',
      imageUrl: '/images/work/kiosk.jpeg',
      // webLink: '#contact',
      // buttonText: 'Contact For Details',
      videoType: 'youtube',
    },
    {
      id: 'video3',
      title: 'Blackthorn Geomatics',
      description: `Blackthorn Geomatics requested a robust, clear, and professional website to showcase their work and services. 

We developed a website that exceeded Blackthorn Geomatics' visual and content needs. We also helped their marketing team realize the benefits of a well-built website:
- Shortest possible load times
- Increased visitor conversion rates
- Better retention of potential customers`,
      technicalInfo: 'Web: Next.js, React, Tailwind CSS, Vercel',
      videoUrl: 'https://www.youtube.com/embed/e7UjhEKDBVQ?si=xcJrC0PgVLtn2_Cx',
      imageUrl: '/images/blackthorn.jpg',
      videoType: 'youtube',
    },
    {
      id: 'video4',
      title: 'Clearly Reformed',
      description: `In addition to their responsive website, Clearly Reformed wanted to develop a competitive advantage by offering a more tailored experience to their on-the-go audience, providing easy access to articles, podcasts, and videos.

We developed a native mobile app for iOS and Android platforms, which dynamically pulls data from the Clearly Reformed API. The app’s minimalist and modern design offers a seamless user experience with a dedicated podcast player, offline caching, and personalization options for creating bookmarks and notes.`,
      technicalInfo: 'iOS: Swift, SwiftUI, SwiftData | Android: Kotlin, Jetpack Compose, Room',
      videoUrl: 'https://www.youtube.com/embed/A140mrHiCpo?si=KyzgzVbffzSPmL79',
      imageUrl: '/images/cr.jpg',
      videoType: 'youtube',
    },
    {
      id: 'video5',
      title: 'Record Machine',
      description: `Preparing for a release can be stressful, difficult, and time-consuming. Musicians must bring together various mixes and masters, lyrics, voice memo ideas, artwork, and more. Frequently, these elements are scattered across multiple platforms and devices, making time management challenging.

Record Machine is an iOS app that keeps everything organized in one place, making release management effortless. It also features a built-in music player that mimics popular streaming platforms.`,
      technicalInfo: 'iOS: Swift, SwiftUI, SwiftData',
      videoUrl: 'https://www.youtube.com/embed/ZfhGOBoFU3g?si=wGD1xHaqvgOu5pwp',
      imageUrl: '/images/exodus.png',
      videoType: 'youtube',
    },
    {
      id: 'video6',
      title: 'Check Right In',
      description: `To become communing members, a local church required attendance of a certain number of New Members classes. The staff relied on a paper trail to keep track of classes with more than 85 people, making it impossible to maintain error-free records or retain historical data.

We created the Check Right In app, designed to operate across a network of tablets and seamlessly combine all attendance information in a single, centralized location. The app offered a time-saving, environmentally friendly solution while eliminating the risk of human error and reducing future operational costs.`,
      technicalInfo: 'iPadOS: Swift, SwiftUI, Airtable',
      videoUrl: 'https://www.youtube.com/embed/MyVbx84vLLU?si=mpf03v6vcB66G3wq',
      imageUrl: '/images/infinity-2.png',
      videoType: 'youtube',
    },
  ]; 