// Types for blog data
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'building-native-mobile-apps-with-swift-and-kotlin',
    title: 'Building Native Mobile Apps with Swift and Kotlin in 2024',
    excerpt: 'A comprehensive guide to modern mobile development using Swift for iOS and Kotlin for Android, with best practices and performance tips.',
    content: `
# Building Native Mobile Apps with Swift and Kotlin in 2024

Mobile app development continues to evolve rapidly, with Swift and Kotlin firmly established as the preferred languages for iOS and Android development respectively. In this article, we'll explore the latest best practices, tools, and techniques for building high-performance native mobile applications in 2024.

## The State of Swift in 2024

Swift has matured significantly since its introduction in 2014. With Swift 6.0, we've seen improvements in:

- Memory management with the new ownership model
- Concurrency with async/await and actors
- Improved compile times
- Better interoperability with Objective-C

### SwiftUI vs UIKit

While UIKit remains relevant for complex applications, SwiftUI has become the default choice for new iOS applications. Its declarative syntax, live previews, and automatic support for different device sizes make it significantly more productive.

\`\`\`swift
struct ContentView: View {
    @State private var isAnimating = false
    
    var body: some View {
        VStack {
            Text("Hello, Swift!")
                .font(.largeTitle)
                .foregroundColor(.blue)
                .scaleEffect(isAnimating ? 1.5 : 1.0)
                .animation(.spring(), value: isAnimating)
            
            Button("Animate") {
                isAnimating.toggle()
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
        }
        .padding()
    }
}
\`\`\`

## Kotlin and Jetpack Compose

On the Android side, Jetpack Compose has revolutionized UI development, bringing a SwiftUI-like declarative approach to Android.

\`\`\`kotlin
@Composable
fun Greeting() {
    var isAnimating by remember { mutableStateOf(false) }
    
    Column(
        modifier = Modifier.padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Hello, Kotlin!",
            style = MaterialTheme.typography.headlineLarge,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.scale(if (isAnimating) 1.5f else 1f)
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Button(onClick = { isAnimating = !isAnimating }) {
            Text("Animate")
        }
    }
}
\`\`\`

## Cross-Platform Considerations

While this article focuses on native development, it's worth noting that frameworks like React Native and Flutter continue to improve. However, for applications where performance, platform integration, and access to the latest platform features are critical, native development remains the gold standard.

## Conclusion

The mobile development landscape in 2024 offers more powerful tools than ever before. By embracing Swift and Kotlin with their modern UI frameworks, developers can create exceptional user experiences while maintaining the performance benefits of native code.

In future articles, we'll dive deeper into specific aspects of mobile development, including state management, networking, and testing strategies for both platforms.
    `,
    coverImage: '/images/blog/002 Medium.jpeg',
    author: {
      name: 'Asher Pope',
      avatar: '/images/team/asher.jpg'
    },
    date: 'March 1, 2024',
    readingTime: '8 min read',
    category: 'Mobile Development',
    tags: ['Swift', 'Kotlin', 'SwiftUI', 'Jetpack Compose'],
    featured: true
  },
  {
    id: '2',
    slug: 'modern-web-development-with-nextjs',
    title: 'Modern Web Development with Next.js and Server Components',
    excerpt: 'Exploring the latest features in Next.js, including Server Components, the App Router, and how they\'re changing web development.',
    content: `
# Modern Web Development with Next.js and Server Components

Next.js has revolutionized React development by providing a powerful framework that combines the best of server-side rendering, static site generation, and client-side rendering. With the introduction of React Server Components and the App Router, Next.js has taken another leap forward in web development.

## The Evolution of Next.js

Next.js has evolved from a simple React framework to a comprehensive platform for building web applications. The latest version brings significant improvements:

- **App Router**: A new file-system based router built on React Server Components
- **Server Components**: Components that render on the server with zero client-side JavaScript
- **Streaming**: Progressive rendering of UI with Suspense
- **Server Actions**: Form handling and mutations without API endpoints

## Server Components: A Paradigm Shift

Server Components represent one of the biggest changes to React since its inception. They allow components to run exclusively on the server, reducing the JavaScript sent to the client and improving performance.

\`\`\`tsx
// A server component that fetches data
async function ProductList() {
  // This code only runs on the server
  const products = await fetchProducts();
  
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

The benefits include:

1. **Reduced Bundle Size**: Server components aren't included in the JavaScript bundle
2. **Direct Backend Access**: Server components can directly access databases and file systems
3. **Automatic Code Splitting**: Only the necessary client components are sent to the browser
4. **Improved SEO**: Content is rendered on the server for better indexing

## The App Router

The new App Router in Next.js introduces a more intuitive way to build applications with nested layouts, loading states, and error handling.

\`\`\`python
app/
├── layout.tsx      # Root layout
├── page.tsx        # Home page
├── blog/
│   ├── layout.tsx  # Blog layout
│   ├── page.tsx    # Blog index
│   └── [slug]/
│       └── page.tsx # Individual blog post
└── about/
    └── page.tsx    # About page
\`\`\`

## Streaming and Suspense

Next.js now supports streaming server-rendered content, allowing the page to be sent in chunks as it's generated. This improves Time To First Byte (TTFB) and provides a better user experience.

\`\`\`tsx
import { Suspense } from 'react';
import Loading from './loading';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
\`\`\`

## Server Actions

Server Actions allow you to define server-side functions that can be called from client components, eliminating the need for separate API routes for many use cases.

\`\`\`tsx
// Server action for form submission
async function submitForm(formData: FormData) {
  'use server';
  
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Server-side validation and database operations
  await saveToDatabase({ name, email });
  
  // Return a result that can be used by the client
  return { success: true };
}

// Client component that uses the server action
export default function ContactForm() {
  return (
    <form action={submitForm}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

## Conclusion

Next.js continues to push the boundaries of what's possible in web development. By embracing Server Components and the App Router, developers can build faster, more scalable applications with improved developer experience.

In future articles, we'll explore more advanced patterns and techniques for building modern web applications with Next.js.
    `,
    coverImage: '/images/blog/003 Medium.jpeg',
    author: {
      name: 'Asher Pope',
      avatar: '/images/team/asher.jpg'
    },
    date: 'February 15, 2024',
    readingTime: '10 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Server Components', 'App Router'],
    featured: false
  },
  {
    id: '3',
    slug: 'designing-intuitive-user-interfaces',
    title: 'Designing Intuitive User Interfaces: Principles and Practices',
    excerpt: 'Learn the fundamental principles of UI design that lead to intuitive, user-friendly applications across mobile and web platforms.',
    content: `
# Designing Intuitive User Interfaces: Principles and Practices

Creating intuitive user interfaces is both an art and a science. It requires a deep understanding of human psychology, design principles, and technical constraints. In this article, we'll explore the key principles that guide effective UI design and provide practical tips for implementation.

## The Foundations of Intuitive Design

### 1. Clarity

Users should never have to wonder what an element does or how to use it. Clear design communicates its purpose without explanation.

### 2. Consistency

Consistent interfaces allow users to apply what they've learned across the application. This includes visual consistency (colors, typography, spacing) and behavioral consistency (interactions, patterns).

### 3. Feedback

Every action should provide immediate and clear feedback. This confirms to users that their action was registered and helps them understand the system's state.

### 4. Efficiency

Design for efficiency by minimizing the steps required to complete common tasks. This often means making reasonable assumptions and smart defaults.

## Practical Implementation

### Visual Hierarchy

Establish a clear visual hierarchy to guide users through the interface:

\`\`\`css
/* Example of typographic hierarchy */
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}
\`\`\`

### Responsive Design

Design for all screen sizes from the beginning:

\`\`\`css
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}
\`\`\`

### Accessibility

Accessible design is intuitive design. It benefits all users, not just those with disabilities:

\`\`\`html
<!-- Good button example -->
<button 
  aria-label="Submit form"
  class="btn-primary"
>
  Submit
</button>

<!-- Instead of just -->
<div class="btn-primary" onclick="submitForm()">Submit</div>
\`\`\`

## Case Study: Redesigning a Mobile Banking App

We recently redesigned a mobile banking app that was suffering from poor user engagement. The key issues included:

1. Cluttered interface with too many options
2. Inconsistent navigation patterns
3. Lack of feedback for important actions
4. Poor accessibility

Our approach:

1. **Simplify**: We reduced the main dashboard to show only the most common actions, with secondary functions accessible through a well-organized menu.

2. **Establish patterns**: We created a consistent pattern for all transaction flows, so once a user learned how to make one type of transaction, they could apply that knowledge to others.

3. **Enhance feedback**: We added subtle animations and clear confirmation messages for all actions, especially financial transactions.

4. **Improve accessibility**: We increased contrast ratios, enlarged touch targets, and added proper screen reader support.

The results were significant: a 40% increase in daily active users, a 25% reduction in support tickets, and a 4.7/5 app store rating (up from 3.2).

## Conclusion

Designing intuitive interfaces isn't about following trends or personal preferences. It's about understanding users' mental models and creating interfaces that align with their expectations while gently guiding them toward their goals.

In future articles, we'll dive deeper into specific aspects of UI design, including animation, color theory, and designing for different platforms.
    `,
    coverImage: '/images/blog/004 Medium.jpeg',
    author: {
      name: 'Asher Pope',
      avatar: '/images/team/asher.jpg'
    },
    date: 'January 28, 2024',
    readingTime: '7 min read',
    category: 'Design',
    tags: ['UI Design', 'UX', 'Accessibility', 'Mobile Design'],
    featured: false
  },
  {
    id: '4',
    slug: 'scaling-applications-with-microservices',
    title: 'Scaling Applications with Microservices Architecture',
    excerpt: 'An in-depth look at how microservices can help scale applications, with real-world examples and implementation strategies.',
    content: `
# Scaling Applications with Microservices Architecture

As applications grow in complexity and user base, monolithic architectures often become difficult to maintain and scale. Microservices architecture has emerged as a popular solution to these challenges, offering improved scalability, resilience, and development velocity.

## Understanding Microservices

Microservices architecture breaks down an application into a collection of loosely coupled, independently deployable services. Each service:

- Focuses on a specific business capability
- Can be developed, deployed, and scaled independently
- Communicates with other services through well-defined APIs
- Can be implemented using different technologies as needed

## Key Benefits

### 1. Scalability

Individual services can be scaled based on their specific resource requirements, rather than scaling the entire application.

### 2. Resilience

Failures in one service don't necessarily cascade to others, improving overall system stability.

### 3. Development Velocity

Smaller, focused teams can work on individual services without coordinating with the entire development organization.

### 4. Technology Flexibility

Teams can choose the best technology stack for each service's specific requirements.

## Implementation Strategies

### Service Boundaries

Defining appropriate service boundaries is crucial. Consider:

- Business capabilities (e.g., order management, user profiles)
- Data ownership (which service owns what data)
- Team structure (Conway's Law suggests systems reflect organizational communication patterns)

### Inter-Service Communication

Services can communicate through:

1. **Synchronous communication** (REST, gRPC)
   
   \`\`\`typescript
   // Example of a service client in TypeScript
   class OrderService {
     private httpClient: HttpClient;
     private baseUrl: string = 'https://api.example.com/orders';
     
     async getOrder(orderId: string): Promise<Order> {
       const response = await this.httpClient.get(\`\${this.baseUrl}/\${orderId}\`);
       return response.data;
     }
     
     async createOrder(order: OrderRequest): Promise<Order> {
       const response = await this.httpClient.post(this.baseUrl, order);
       return response.data;
     }
   }
   \`\`\`

2. **Asynchronous communication** (message queues, event streams)
   
   \`\`\`typescript
   // Example of publishing an event
   class OrderService {
     private eventBus: EventBus;
     
     async createOrder(order: OrderRequest): Promise<Order> {
       // Create the order in the database
       const newOrder = await this.orderRepository.create(order);
       
       // Publish an event for other services
       await this.eventBus.publish('order.created', {
         orderId: newOrder.id,
         customerId: newOrder.customerId,
         amount: newOrder.totalAmount,
         timestamp: new Date().toISOString()
       });
       
       return newOrder;
     }
   }
   \`\`\`

### Data Management

Each service should own its data, but this creates challenges:

1. **Data duplication**: Some data may need to be duplicated across services
2. **Distributed transactions**: Maintaining consistency across services
3. **Query complexity**: Joining data from multiple services

Solutions include:

- **Event sourcing**: Storing all changes as a sequence of events
- **CQRS** (Command Query Responsibility Segregation): Separating read and write models
- **Saga pattern**: Managing distributed transactions through a sequence of local transactions

## Case Study: E-commerce Platform Migration

We recently helped a client migrate their monolithic e-commerce platform to a microservices architecture. The monolith had become:

- Difficult to scale during sales events
- Prone to complete outages when one component failed
- Slow to deploy due to complex dependencies

Our approach:

1. **Strangler pattern**: Gradually replacing functionality with microservices
2. **Domain-driven design**: Identifying bounded contexts for service boundaries
3. **API gateway**: Providing a unified entry point for clients
4. **Service mesh**: Managing service-to-service communication

The results:

- 99.99% uptime (up from 98.5%)
- 70% reduction in deployment time
- Ability to handle 5x the peak load
- Teams able to release independently

## Challenges and Considerations

Microservices aren't without challenges:

1. **Operational complexity**: More services mean more components to monitor and maintain
2. **Distributed system challenges**: Network latency, consistency, failure handling
3. **Service discovery**: How services find and communicate with each other
4. **Monitoring and tracing**: Understanding system behavior across services

Tools that can help:

- Kubernetes for container orchestration
- Istio or Linkerd for service mesh capabilities
- Prometheus and Grafana for monitoring
- Jaeger or Zipkin for distributed tracing

## Conclusion

Microservices architecture offers powerful benefits for scaling applications, but it's not a silver bullet. Successful implementation requires careful planning, appropriate tooling, and organizational alignment.

In future articles, we'll explore specific aspects of microservices architecture, including deployment strategies, testing approaches, and data management patterns.
    `,
    coverImage: '/images/blog/005 Medium.jpeg',
    author: {
      name: 'Asher Pope',
      avatar: '/images/team/asher.jpg'
    },
    date: 'January 10, 2024',
    readingTime: '12 min read',
    category: 'Backend',
    tags: ['Microservices', 'Scalability', 'System Design'],
    featured: false
  }
];

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // In a real implementation, this would fetch from Supabase
  return blogPosts;
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  // In a real implementation, this would fetch from Supabase
  return blogPosts.filter(post => post.featured);
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost> {
  // In a real implementation, this would fetch from Supabase
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
  
  return post;
}

// Get related blog posts
export async function getRelatedPosts(slug: string, limit: number = 3): Promise<BlogPost[]> {
  // In a real implementation, this would fetch from Supabase based on categories or tags
  const currentPost = await getBlogPost(slug);
  
  // Get posts with matching categories or tags, excluding the current post
  const relatedPosts = blogPosts
    .filter(post => post.slug !== slug)
    .filter(post => {
      const hasMatchingCategory = post.category === currentPost.category;
      const hasMatchingTag = post.tags.some(tag => 
        currentPost.tags.includes(tag)
      );
      
      return hasMatchingCategory || hasMatchingTag;
    })
    .slice(0, limit);
  
  // If we don't have enough related posts, add recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = blogPosts
      .filter(post => post.slug !== slug && !relatedPosts.includes(post))
      .slice(0, limit - relatedPosts.length);
    
    return [...relatedPosts, ...recentPosts];
  }
  
  return relatedPosts;
}

// Get blog posts by category
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  // In a real implementation, this would fetch from Supabase
  return blogPosts.filter(post => post.category === category);
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  // In a real implementation, this would fetch from Supabase
  return blogPosts.filter(post => post.tags.includes(tag));
}

// Get all categories
export async function getAllCategories(): Promise<string[]> {
  // In a real implementation, this would fetch from Supabase
  const categories = new Set<string>();
  
  blogPosts.forEach(post => {
    categories.add(post.category);
  });
  
  return Array.from(categories);
}

// Get all tags
export async function getAllTags(): Promise<string[]> {
  // In a real implementation, this would fetch from Supabase
  const tags = new Set<string>();
  
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      tags.add(tag);
    });
  });
  
  return Array.from(tags);
}

// Search blog posts
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  // In a real implementation, this would use Supabase full-text search
  const lowercaseQuery = query.toLowerCase();
  
  return blogPosts.filter(post => {
    return (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  });
} 