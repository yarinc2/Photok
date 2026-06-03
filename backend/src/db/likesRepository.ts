import db from './database';

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

export function toggleLike(photoId: number): boolean {
  if (isLiked(photoId)) {
    db.prepare('DELETE FROM likes WHERE photo_id = ?').run(photoId);
    return false;
  } else {
    db.prepare('INSERT INTO likes (photo_id, liked_at) VALUES (?, ?)').run(
      photoId,
      new Date().toISOString()
    );
    return true;
  }
}
