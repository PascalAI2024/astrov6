import type { APIRoute } from 'astro';
import { posts } from '../../data/posts';

export const get: APIRoute = async () => {
  try {
    // Transform posts to include only necessary data for search
    const searchablePosts = posts.map(post => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags,
      publishDate: post.publishDate.toISOString()
    }));

    return new Response(JSON.stringify(searchablePosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};