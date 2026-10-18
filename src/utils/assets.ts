/** Resolve public assets for both root hosting and GitHub Pages subpaths. */
export function assetUrl(path:string):string {
  const relative=path.replace(/^\/+/, '');
  // #ifdef H5
  return `${import.meta.env.BASE_URL}${relative}`;
  // #endif
  // #ifndef H5
  return `/${relative}`;
  // #endif
}
