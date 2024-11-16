
/*格式化数字 */
export const formatNumber = (number: number) => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(3) + 'B';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(3) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(3) + 'K';
  } else {
    return number.toFixed(3);
  }
}