export const categoryTitles = {
  thisSeasonPopular: "Popular this season",
  nextSeason: "Upcoming next season",

  "Miyazaki, Hayao": "Hayao Miyazaki",
  "Kon, Satoshi": "Satoshi Kon",
  "Kawaguchi, Yuichiro": "Yuichiro Kawaguchi",
  "Kawaguchi, Yuichiro": "Yuichiro Kawaguchi",
  "Oshii, Mamoru": "Mamoru Oshii",
  "Otomo, Katsuhiro": "Katsuhiro Otomo",
  "Hosoda, Mamoru": "Mamoru Hosoda",
  "Oshii, Mamoru": "Mamoru Oshii",
  "Otomo, Katsuhiro": "Katsuhiro Otomo",
  "Anno, Hideaki": "Hideaki Anno",
  "Shinkai, Makoto": "Makoto Shinkai",
  "Shinbou, Akiyuki": "Akiyuki Shinbo",
  "Yamada, Naoko": "Naoko Yamada",
  "Yuasa, Masaaki": "Masaaki Yuasa",
  "Watanabe, Shinichirou": "Shinichirou Watanabe",
  "Imaishi, Hiroyuki": "Hiroyuki Imaishi",
};
export const categories = [
  "thisSeasonPopular",
  "Slice of Life",
  "nextSeason",
  "Adventure",
  "Fantasy",
  "Drama",
  "Avant Garde",
  "Action",
  "Sci-Fi",
  "Miyazaki, Hayao",
  "Shinkai, Makoto",
  "Supernatural",
  "Mystery",
  "Comedy",
  "Romance",
  "Kon, Satoshi",
  "Anno, Hideaki",
  "Yuasa, Masaaki",
  "Sports",
  "Watanabe, Shinichirou",
  "Shinbou, Akiyuki",
  "Horror",
  "Hosoda, Mamoru",
  "Suspense",
  "Imaishi, Hiroyuki",
  "Yamada, Naoko",
  "Oshii, Mamoru",
  "Gourmet",
];

export const genres = [
  "Fantasy",
  "Sci-Fi",
  "Drama",
  "Comedy",
  "Action",
  "Adventure",
  "Romance",
  "Slice of Life",
  "Supernatural",
  "Mystery",
  "Avant Garde",
  "Sports",
  "Horror",
  "Suspense",
  "Gourmet",
  "Award Winning",
];

export const directors = [
  "Miyazaki, Hayao",
  "Shinkai, Makoto",
  "Kon, Satoshi",
  "Anno, Hideaki",
  "Yuasa, Masaaki",
  "Watanabe, Shinichirou",
  "Shinbou, Akiyuki",
  "Hosoda, Mamoru",
  "Imaishi, Hiroyuki",
  "Yamada, Naoko",
  "Oshii, Mamoru",
];
export const types = ["TV", "OVA", "Movie", "Special", "ONA", "Music"];

export const themes = [
  "Music",
  "School",
  "Historical",
  "Mecha",
  "Anthropomorphic",
  "Parody",
  "Military",
  "Super Power",
  "Mythology",
  "Space",
  "Martial Arts",
  "Harem",
  "Psychological",
  "Isekai",
  "Mahou Shoujo",
  "Strategy Game",
  "Team Sports",
  "Detective",
  "Idols (Female)",
  "Educational",
  "Gore",
  "Racing",
  "Gag Humor",
  "CGDCT",
  "Samurai",
  "Workplace",
  "Iyashikei",
  "Idols (Male)",
  "Vampire",
  "Video Game",
  "Time Travel",
  "Reincarnation",
  "Performing Arts",
  "Pets",
  "Survival",
  "Otaku Culture",
  "Combat Sports",
  "Love Polygon",
  "Visual Arts",
  "Organized Crime",
  "Reverse Harem",
  "Childcare",
  "Delinquents",
  "Romantic Subtext",
  "Crossdressing",
  "High Stakes Game",
  "Medical",
  "Showbiz",
  "Magical Sex Shift",
];
const date = new Date();
const currentYear = date.getFullYear();
const years = [
  "2014-2010",
  "2009-2005",
  "2004-2000",
  "1990s",
  "1980s",
  "Earlier",
];
for (let i = 2015; i <= currentYear; i++) {
  years.unshift(i);
}
export { years };
