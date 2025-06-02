export default async function rewrites() {
  return [
    {
      source: '/health-check',
      destination: '/api/health-check',
    },
    {
      source: '/auth',
      destination: '/api/auth',
    },
    {
      source: '/mua-ban',
      destination: '/',
    },
    {
      source: '/:listId(\\d{1,8}\\.htm)',
      destination: '/detailView',
    },
    {
      source: '/:category/:listId(\\d{1,8}\\.htm)',
      destination: '/testPage',
    },
    {
      source: '/tin-dang-danh-cho-ban',
      destination: '/testPage',
    },
  ];
}
