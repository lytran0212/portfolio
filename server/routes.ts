import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import fs from "fs/promises";
import path from "path";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // GET /api/gallery-images -> returns list of image URLs under /attached_assets
  app.get("/api/gallery-images", async (_req: Request, res: Response) => {
    try {
      // In development we serve from client/public; in production from dist/public
      const isDev = process.env.NODE_ENV !== "production";
      const baseDir = isDev
        ? path.resolve(import.meta.dirname, "..", "client", "public", "attached_assets")
        : path.resolve(import.meta.dirname, "public", "attached_assets");

      // Allowed image extensions
      const exts = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

      const walk = async (dir: string, prefixUrl: string): Promise<string[]> => {
        let results: string[] = [];
        let entries: any[] = [];
        try {
          entries = await fs.readdir(dir, { withFileTypes: true });
        } catch (e) {
          // if folder doesn't exist just return empty
          return results;
        }
        for (const entry of entries) {
          const abs = path.join(dir, entry.name);
          const urlPath = path.posix.join(prefixUrl, entry.name);
          if (entry.isDirectory()) {
            const child = await walk(abs, urlPath);
            results = results.concat(child);
          } else {
            const ext = path.extname(entry.name).toLowerCase();
            if (exts.has(ext)) {
              // Ensure URL uses posix separators and starts with leading slash
              const url = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
              results.push(url);
            }
          }
        }
        return results;
      };

      const images = await walk(baseDir, "/attached_assets");

      // Sort by name for determinism
      images.sort((a, b) => a.localeCompare(b));
      res.json(images);
    } catch (err: any) {
      res.status(500).json({ message: err?.message ?? "Failed to list images" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
