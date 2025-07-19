#!/usr/bin/env python3
import os
import asyncio
import httpx
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

async def fetch_unsplash_image(query, orientation="landscape"):
    """Fetch a single image from Unsplash API"""
    access_key = os.getenv("UNSPLASH_ACCESS_KEY") or os.getenv("Unsplash_Access_Key")
    if not access_key:
        raise ValueError("Missing UNSPLASH_ACCESS_KEY or Unsplash_Access_Key environment variable")

    params = {
        "query": query,
        "page": 1,
        "per_page": 1,
        "order_by": "relevant",
        "orientation": orientation
    }

    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {access_key}"
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.unsplash.com/search/photos",
                params=params,
                headers=headers
            )
            response.raise_for_status()
            data = response.json()

            if data["results"]:
                photo = data["results"][0]
                return {
                    "id": photo["id"],
                    "description": photo.get("description", ""),
                    "regular": photo["urls"]["regular"],
                    "thumb": photo["urls"]["thumb"],
                    "width": photo["width"],
                    "height": photo["height"]
                }
            return None
    except Exception as e:
        print(f"Error fetching image for '{query}': {str(e)}")
        return None

async def main():
    """Fetch images for all articles"""
    queries = {
        "ai-development": "artificial intelligence programming code screen",
        "docker": "docker containers software development",
        "performance": "website performance optimization analytics dashboard",
        "infrastructure": "cloud infrastructure servers data center",
        "automation": "workflow automation robots machinery"
    }
    
    print("Fetching images from Unsplash...")
    
    for name, query in queries.items():
        result = await fetch_unsplash_image(query)
        if result:
            print(f"{name}: {result['regular']}")
            print(f"  Description: {result['description']}")
            print(f"  Dimensions: {result['width']}x{result['height']}")
        else:
            print(f"{name}: Failed to fetch image")
        print()

if __name__ == "__main__":
    asyncio.run(main())