import { load } from 'cheerio';

export const scrapeBlogContent = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com',
        'Connection': 'keep-alive'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = load(html);

    $('script, style, noscript, iframe, header, footer').remove();

    const selectors = [
      'article',
      '.post-content',
      '.article-body',
      '.content-wrapper',
      'main',
      'body'
    ];

    let content = '';
    for (const selector of selectors) {
      const text = $(selector).text();
      if (text.length > content.length) {
        content = text;
      }
    }

    return content
      .replace(/\s+/g, ' ')
      .replace(/\[.*?\]/g, '')
      .trim();

  } catch (error: any) {
    console.error('Scraping failed:', error.message);
    throw new Error(`Scraping failed: ${error.message}`);
  }
};
