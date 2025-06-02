/**
 * Check if the user agent is a mobile device
 * @param {string} userAgent - The user agent string
 */
export const checkIsMobile = (userAgent: string): boolean => {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      userAgent
    )
  ) {
    return true;
  }
  return false;
};
