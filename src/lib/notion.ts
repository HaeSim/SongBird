import { NotionAPI } from 'notion-client';
import type {
  ExtendedRecordMap,
  SearchParams,
  SearchResults,
} from 'notion-types';

export const DEFAULT_ROOT_PAGE_ID = 'ea18bf18934249ddbce1d222a8b01b54';

const notion = new NotionAPI();

async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notion.getPage(pageId);

  return recordMap;
}

async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params);
}

const notionClient = {
  getPage,
  search,
};

export default notionClient;
