export default {
  proxyUrl: process.env.REACT_APP_API_ENDPOINT || 'https://wooordhunter-backend-proxy.now.sh/',
  wooordhuntSearchApi: 'http://wooordhunt.ru/word/',
  wooordhuntTipsApi: 'http://wooordhunt.ru/get_tips.php?abc=',
  wooordhuntUKSoundPrefix: 'http://wooordhunt.ru/data/sound/word/uk/mp3',
  wooordhuntUSSoundPrefix: 'http://wooordhunt.ru/data/sound/word/us/mp3',
};
