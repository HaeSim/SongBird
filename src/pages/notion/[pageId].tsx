import { styled } from '@mui/material';
import type { GetStaticProps } from 'next';
import { getAllPagesInSpace } from 'notion-utils';
import * as React from 'react';
import { defaultMapPageUrl } from 'react-notion-x';
import notionClient, { DEFAULT_ROOT_PAGE_ID } from 'src/lib/notion';

import { NotionPage } from '@/components/organisms/NotionPage';
import Default from '@/components/templates/Layout/Default';
import { generateGetLayout, type NextPageWithLayout } from '@/utils/common';

const StyleReset = styled('div')`
  * {
    padding: unset;
    -webkit-text-size-adjust: unset;
    -moz-text-size-adjust: unset;
    -ms-text-size-adjust: unset;
    box-sizing: unset;
    -ms-box-sizing: unset;
    -moz-box-sizing: unset;
    -webkit-box-sizing: unset;
    font-family: unset;
    font-size: unset;
    font-weight: unset;
    line-height: unset;
    color: unset;
    word-wrap: unset;
    text-align: unset;
  }
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const pageId = context?.params?.pageId as string;

  const pageParam = pageId === 'notice' ? DEFAULT_ROOT_PAGE_ID : pageId;

  try {
    const recordMap = await notionClient.getPage(pageParam);

    return {
      props: {
        recordMap,
      },
      revalidate: 10,
      // 만약 pageId에서 -를 제거한 문자가 DEFAULT_ROOT_PAGE_ID와 같다면, 'notion'으로 리다이렉트합니다.
      // 이렇게 하면, 루트 페이지를 /notion으로 설정할 수 있습니다.
      redirect:
        pageId.replace(/-/g, '') === DEFAULT_ROOT_PAGE_ID
          ? { destination: '/notion/notice' }
          : undefined,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error: ', e);
    return {
      props: {
        recordMap: null,
      },
      redirect: {
        destination: '/notion/notice',
        permanent: false,
      },
      revalidate: 10,
    };
  }
};

export async function getStaticPaths() {
  const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    };
  }

  // notion.so workspace의 공용 페이지를 가져옵니다
  const mapPageUrl = defaultMapPageUrl(DEFAULT_ROOT_PAGE_ID);

  // 지정된 루트 페이지에서 시작하는 모든 공용 페이지를 순서대로 크롤합니다
  // next.js를 통해 모든 페이지를 사전 생성(정적 사이트 생성(SSG))합니다.
  // 이것은 유용한 최적화이지만 필수는 아닙니다. 쉽게 할 수 있습니다.
  // 경로를 빈 배열로 설정하여 빌드 시간에 페이지를 사전 생성하지 않습니다.
  const pages = await getAllPagesInSpace(
    DEFAULT_ROOT_PAGE_ID,
    undefined,
    notionClient.getPage,
    {
      traverseCollections: false,
    }
  );

  const paths = Object.keys(pages)
    .map((pageId) => mapPageUrl(`${pageId}`))
    .filter((path) => path && path !== '/');

  return {
    // paths 앞에 notion을 추가하면, /notion/으로 시작하는 모든 경로를 사전 생성합니다.
    paths: paths.map((path) => `/notion${path}`),
    fallback: true,
  };
}
interface INotionProps {
  recordMap: any;
}

const Notion: NextPageWithLayout<INotionProps> = ({ recordMap }) => {
  return (
    <StyleReset>
      <NotionPage recordMap={recordMap} />
    </StyleReset>
  );
};

Notion.getLayout = generateGetLayout(Default);

export default Notion;
