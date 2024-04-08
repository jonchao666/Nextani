export default function clearExpiredLocalStorageData() {
  const maxItems = 80;
  const maxSize = 5 * 1024 * 1024;
  let currentSize = 0;

  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const itemStr = localStorage.getItem(key);
    try {
      const item = JSON.parse(itemStr);
      if (item && item.timestamp) {
        items.push({ key, timestamp: item.timestamp, size: itemStr.length });
        currentSize += itemStr.length;
      }
    } catch (error) {
      console.error(`Error parsing localStorage item at key ${key}:`, error);
    }
  }

  items.sort((a, b) => a.timestamp - b.timestamp);

  while (items.length > maxItems || currentSize > maxSize) {
    const oldest = items.shift();
    if (oldest) {
      localStorage.removeItem(oldest.key);
      currentSize -= oldest.size;
    }
  }

  const now = Date.now();
  items.forEach((item) => {
    if (now > item.timestamp + 1 * 60 * 60 * 1000) {
      localStorage.removeItem(item.key);
    }
  });
}
