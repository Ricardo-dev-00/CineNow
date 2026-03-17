import { describe, expect, it } from 'vitest';
import { formatRuntime, formatVoteAverage, getYouTubeEmbedUrl } from '../formatters';

describe('formatters utils', () => {
  it('deve formatar nota com 1 casa decimal', () => {
    expect(formatVoteAverage(7.84)).toBe('7.8');
  });

  it('deve formatar runtime em horas e minutos', () => {
    expect(formatRuntime(125)).toBe('2h 5min');
  });

  it('deve montar url embed do youtube', () => {
    expect(getYouTubeEmbedUrl('abc123')).toBe('https://www.youtube.com/embed/abc123');
  });
});
