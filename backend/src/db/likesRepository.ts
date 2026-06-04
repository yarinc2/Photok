import db from './database';
import { PexelsPhoto, PhotoWithLike } from '../types';

export function isLiked(photoId: number): boolean {
  const row = db.prepare('SELECT 1 FROM likes WHERE photo_id = ?').get(photoId);
  return row !== undefined;
}

export function getLikedIds(photoIds: number[]): Set<number> {
  if (photoIds.length === 0) return new Set();
  const placeholders = photoIds.map(() => '?').join(',');
  const rows = db
    .prepare(`SELECT photo_id FROM likes WHERE photo_id IN (${placeholders})`)
    .all(...photoIds) as { photo_id: number }[];
  return new Set(rows.map((r) => r.photo_id));
}

export function toggleLike(photoId: number, photo?: PexelsPhoto): boolean {
  if (isLiked(photoId)) {
    db.prepare('DELETE FROM likes WHERE photo_id = ?').run(photoId);
    return false;
  } else {
    db.prepare('INSERT INTO likes (photo_id, liked_at, photo_json) VALUES (?, ?, ?)').run(
      photoId,
      new Date().toISOString(),
      JSON.stringify(photo ?? {}),
    );
    return true;
  }
}

export function getLikedCount(): number {
  const row = db.prepare('SELECT COUNT(*) as count FROM likes').get() as { count: number };
  return row.count;
}

export function getLikedPhotos(page: number, perPage: number): PhotoWithLike[] {
  const offset = (page - 1) * perPage;
  const rows = db
    .prepare('SELECT photo_json FROM likes ORDER BY liked_at DESC LIMIT ? OFFSET ?')
    .all(perPage, offset) as { photo_json: string }[];
  return rows.map((r) => ({ ...(JSON.parse(r.photo_json) as PexelsPhoto), liked: true }));
}
