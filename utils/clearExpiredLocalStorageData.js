export default function clearExpiredLocalStorageData() {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    const itemStr = localStorage.getItem(key);

    try {
      const item = JSON.parse(itemStr);
      if (
        item &&
        item.timestamp &&
        Date.now() > item.timestamp + 12 * 60 * 60 * 1000
      ) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error parsing localStorage item at key ${key}:`, error);
    }
  }
}
