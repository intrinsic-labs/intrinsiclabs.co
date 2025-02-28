# Intrinsic Labs Website - Site Plan
---

## Initial Thoughts

Here are some thoughts on building a new website for Intrinsic Labs, specifically for the purpose of showcasing our work and offering our services.

### Goals For The Site
Here are my thoughts & goals for the site:
- Fast load times
- Lots of small interactions (like when you hover on stuff etc) that make the site feel alive
- Very clean and modern design
- Data stored in Supabase and pulled in when the site loads
- A separate site that looks kinda like an Airtable interface for editing/managing the Supabase data

### Sites I Like 
Here are some sites I'd like to imitate. **PLEASE VISIT EACH OF THESE WEBSITES TO SEE WHAT THEY ARE DOING.**

1. Cursor: @https://www.cursor.com/ 
- I love the grainy colors and the developer vibe they've created. It is a simple site but it is quite beautiful
- Their pricing page is very clear and easy to take in: @https://www.cursor.com/pricing 
- I will want to mimic the Cursor pricing page for my offers page
- Their blog page, showing a lot of text content but still being stylish: @https://www.cursor.com/blog/shadow-workspace 

2. Daylight Computer: @https://daylightcomputer.com/ 
- One of the most amazing scroll interaction websites I've ever seen. Very sleek animations and interactions.
- Love the warm colors and photo choices. Very retro vibe - like early computer type stuff.
- They have an animated film grain filter on the photos. This makes the photos feel alive and almost like a "static video" - I'd love to replicate this on my site.

3. Anthropic: @https://www.anthropic.com/ 
- Super pretty and clean feeling. It's a lot of info but it feels easy to understand.
- @https://www.anthropic.com/claude This is a great page too, design-wise. Interactive and beautiful.

### Features of My Site
I will want to integrate the following features:
1. Static content pulled from Supabase (like paragraph content about our company, blog posts, etc)
2. Images pulled from Supabase
3. Lots of interactive UI elements (hover animations, clickable stuff, etc)
4. Forms for contacting us
5. I will at some point be building some simple web apps that people will be able to try out right on our website. I do not currently know what these will look like - I'm thinking simple React recreations of some of my mobile apps that users could try right in the browser etc
6. Some kind of site analytics

It's mainly a portfolio/showcase site with our offers and a way to get in touch. It will also have a blog so people can see what we're up to. I'd like to support comments on this blog. 


## Site Structure Overview

```
intrinsic-labs-website.com/
├── Home
├── Services
│   ├── Mobile Development
│   ├── Web Development
│   └── Custom Software
├── Work
│   ├── Case Studies
│   └── Projects
├── About
│   ├── Team
│   └── Values
├── Blog
│   ├── Articles
│   └── Resources
├── Contact
└── Admin (separate interface)
```

## Page Details

### 1. Home Page
**Purpose**: Create a strong first impression and direct visitors to key areas of the site.

**Content Elements**:
- Hero section with animated headline and brief value proposition
- Selected work showcase with case study previews
- Client testimonials carousel
- "About us" snapshot with team photo and brief intro
- Call-to-action for contact
- Animated grain background similar to Daylight Computer's site

**Interactive Elements**:
- Parallax scrolling effects
- Hover animations on cards and buttons
- Subtle background animations
- Animated text reveals on scroll

### 2. Services Pages

#### 2.1 Services Overview
**Purpose**: Showcase all services offered by Intrinsic Labs.

**Content Elements**:
- Introduction to service offerings
- Service categories with visual icons
- Brief description of each service with link to detailed page
- Process overview (how you work with clients)
- Technologies used visualization
- Call-to-action to view work or contact

#### 2.2 Mobile Development
**Purpose**: Detail your iOS and Android development capabilities.

**Content Elements**:
- Overview of mobile development approach
- Swift/SwiftUI and Kotlin/Jetpack expertise
- Development process specific to mobile
- Mobile-specific case studies
- Technology stack visualization (this could be really cool and interactive)
- Mobile app showcase with interactive previews (maybe replicated from Swift to simple JavaScript version to run in browser - think AppClip)

#### 2.3 Web Development
**Purpose**: Showcase your web development services.

**Content Elements**:
- Web development philosophy and approach
- Frontend and backend capabilities
- Technology stack details
- Web-specific case studies
- Interactive examples of web features
- Process timeline

#### 2.4 Custom Software
**Purpose**: Highlight specialized software development services.

**Content Elements**:
- Custom software development approach
- Types of software solutions offered
- Industry-specific solutions
- Case studies of custom software projects
- Technology considerations
- Development and maintenance process

### 3. Work Section

#### 3.1 Case Studies
**Purpose**: Provide in-depth analysis of selected projects.

**Content Elements**:
- Featured case studies with detailed breakdowns
- Problem statement for each project
- Solution approach and implementation details
- Results and metrics
- Client testimonials
- Visual documentation (mockups, wireframes, final product)
- Interactive elements showing before/after or process stages

#### 3.2 Projects Gallery
**Purpose**: Showcase breadth of work in a visually appealing format.

**Content Elements**:
- Filterable gallery of projects by category
- Brief description of each project
- Key technologies used
- Visual previews with hover animations
- Links to case studies where applicable

### 4. About Section

#### 4.1 About Overview
**Purpose**: Tell the story of Intrinsic Labs and build trust.

**Content Elements**:
- Company origin story
- Mission and vision statements
- Core values and approach
- Company timeline with interactive elements
- Office/workspace imagery with film grain effect

#### 4.2 Team
**Purpose**: Introduce team members and highlight expertise.

**Content Elements**:
- Team member profiles with photos
- Individual expertise and specializations
- Brief personal bios
- Interactive elements on hover

#### 4.3 Values
**Purpose**: Communicate company values and culture.

**Content Elements**:
- Core values with visual representations
- How values translate to client work
- Work culture highlights
- Approach to projects and client relationships
- Visual storytelling elements

### 5. Blog

#### 5.1 Blog Overview
**Purpose**: Share work in progress, industry insights, and company updates.

**Content Elements**:
- Featured/recent articles
- Category filters
- Search functionality
- Newsletter signup
- Popular tags
- Reading time indicators

#### 5.2 Article Pages
**Purpose**: Deliver valuable content to readers.

**Content Elements**:
- Article header with featured image
- Author information and publication date
- Well-formatted content with visual elements
- Code snippets where relevant
- Related articles
- Comment section
- Social sharing options
- Call-to-action at the end

#### 5.3 Resources
**Purpose**: Provide downloadable resources and tools.

**Content Elements**:
- Categorized resources
- Brief descriptions
- Download links
- Preview images
- Related blog posts

### 6. Contact Page
**Purpose**: Make it easy for potential clients to reach out.

**Content Elements**:
- Contact form with validation
- Estimated response time
- Social media links
- Availability information
- FAQ section for common inquiries

---

### 7. Admin Interface (Separate Site)
**Purpose**: Manage website content and blog posts.

**Content Elements**:
- Dashboard with content overview
- Content editor with preview
- Media library management
- User management
- Analytics overview
- Blog post editor with markdown support
- Comment moderation

## Content Types in Supabase
These are **ideas** for content types that we may need in the database.
These are subject to change and will likely develop as we actually build the site.

### 1. Pages
- Home page content
- Service page content
- About page content
- Contact information

### 2. Team Members
- Name
- Position
- Bio
- Photo
- Social links
- Expertise areas

### 3. Services
- Service name
- Description
- Features
- Process steps
- Related case studies
- Icon/image

### 4. Projects/Case Studies
- Project title
- Client
- Description
- Challenge
- Solution
- Results
- Technologies used
- Images/videos
- Testimonials
- Timeline

### 5. Blog Posts
- Title
- Content (rich text)
- Author
- Publication date
- Categories/tags
- Featured image
- SEO metadata
- Related posts

### 6. Testimonials
- Client name
- Company
- Quote
- Rating
- Project reference
- Client photo/logo

### 7. Media Library
- Images
- Videos
- Documents
- Metadata

---

## Interactive Elements & Animations

### Micro-interactions
- Button hover states
- Form field focus states
- Navigation highlights
- Card hover effects
- Cursor following elements

### Page Transitions
- Smooth page transitions
- Content reveal animations
- Loading states

### Scroll-based Animations
- Parallax effects
- Content reveal on scroll
- Progress indicators
- Sticky elements

### Special Effects
- Film grain overlay on images and color backgrounds (like Daylight Computer)
- Simple but thoughtful text animations
- Image transitions
- Background color shifts

## Responsive Design Considerations

### Breakpoints
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)
- Large Desktop (> 1440px)

### Mobile-specific Adaptations
- Simplified navigation (hamburger menu)
- Stacked content layout
- Touch-optimized interactions
- Reduced animations for performance

## Performance Optimization Strategies

### Image Optimization
- Next.js Image component usage
- WebP format with fallbacks
- Lazy loading
- Responsive images

### Code Optimization
- Code splitting
- Tree shaking
- Lazy loading components
- Optimized dependencies

### Caching Strategy
- Static generation where possible
- Incremental Static Regeneration for dynamic content
- API response caching

## Analytics Implementation

### Key Metrics to Track
- Page views and unique visitors
- Traffic sources
- User flow through site
- Conversion rates (contact form submissions)
- Time on page
- Bounce rate
- Blog post engagement

---

## Next Steps

See the PLAN_PHASES.md file for the next steps.
