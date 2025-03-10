# 3D Models Directory

This directory can contain 3D models for the house viewer, but the application is already configured to use direct URLs to free 3D models.

## Current Model URLs

The HouseModelViewer component is already configured to use these free models:

1. Modern House: `https://dl.dropbox.com/s/89no6h10sgkdrex/modern_house.glb`
2. Traditional House: `https://dl.dropbox.com/s/0f5cccdnmkdukbq/traditional_house.glb`

## Adding Your Own Models (Optional)

If you prefer to use your own models instead of the ones provided via URL:

1. Download or create GLB format house models 
2. Name them `modern_house.glb` and `traditional_house.glb`
3. Place them in the `/public/models/` directory
4. Update the URLs in `HouseModelViewer.tsx` to point to your local files:
   ```typescript
   // Change from direct URL:
   const { scene } = useGLTF("https://dl.dropbox.com/s/89no6h10sgkdrex/modern_house.glb"...

   // To local file:
   const { scene } = useGLTF("/models/modern_house.glb"...
   ```

## Where to Find Free 3D Models

You can download free 3D models in GLB format from:

1. [Sketchfab](https://sketchfab.com/3d-models?features=downloadable&q=house)
2. [Poly Pizza](https://poly.pizza/category/buildings)
3. [TurboSquid](https://www.turbosquid.com/Search/3D-Models/free/house)

## Optimization Tips

- Keep file sizes under 5MB for better performance
- Use models with reasonable poly counts (10k-50k triangles)
- Ensure models have proper materials and textures

## Note

The application includes fallback simple houses built with Three.js geometry if these models are not available or fail to load.