declare module '4lyrics' {
    export class MusixMatch {
        get useragent(): string;
        fetchURLs(query: string): Promise<string[]>;
        parseURLs(html: string): Array<string>;
        fetchLyrics(url: string): Promise<string[]>;
        parseLyrics(html: string): string[];
    }
    
    export class AzLyrics {
        get useragent(): string;
        fetchURLs(query: string): Promise<string[]>;
        parseURLs(html: string): Array<string>;
        fetchLyrics(url: string): Promise<string[]>;
        parseLyrics(html: string): string[];
    }

    export class LyricsCom {
        get useragent(): string;
        fetchURLs(query: string): Promise<string[]>;
        parseURLs(html: string): Array<string>;
        fetchLyrics(url: string): Promise<string[]>;
        parseLyrics(html: string): string[];
    }

    export class SongLyricsCom {
        get useragent(): string;
        fetchURLs(query: string): Promise<string[]>;
        parseURLs(html: string): Array<string>;
        fetchLyrics(url: string): Promise<string[]>;
        parseLyrics(html: string): string[];
    }

    export function validateHeaders() : boolean;
}