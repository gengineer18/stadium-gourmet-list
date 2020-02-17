export default function getClubName(clubId: string): string {
  let clubName: string = ''
  switch (clubId) {
    case 'consadole':
      clubName = '北海道コンサドーレ札幌'
      break;
    case 'vanraure':
      clubName = 'ヴァンラーレ八戸'
      break;
    case 'grulla':
      clubName = 'いわてグルージャ盛岡'
      break;
    case 'vegalta':
      clubName = 'ベガルタ仙台'
      break;
    case 'blaublitz':
      clubName = 'ブラウブリッツ秋田'
      break;
    case 'montedio':
      clubName = 'モンテディオ山形'
      break;
    case 'fukushima':
      clubName = '福島ユナイテッドFC'
      break;
    case 'antlers':
      clubName = '鹿島アントラーズ'
      break;
    case 'hollyhock':
      clubName = '水戸ホーリーホック'
      break;
    case 'tochigisc':
      clubName = '栃木SC'
      break;
    case 'thespa':
      clubName = 'ザスパクサツ群馬'
      break;
    case 'reds':
      clubName = '浦和レッズ'
      break;
    case 'ardija':
      clubName = '大宮アルディージャ'
      break;
    case 'jef':
      clubName = 'ジェフユナイテッド千葉'
      break;
    case 'reysol':
      clubName = '柏レイソル'
      break;
    case 'fctokyo':
      clubName = 'FC東京'
      break;
    case 'fctokyou23':
      clubName = 'FC東京 U-23'
      break;
    case 'verdy':
      clubName = '東京ヴェルディ'
      break;
    case 'zelvia':
      clubName = 'FC町田ゼルビア'
      break;
    case 'frontale':
      clubName = '川崎フロンターレ'
      break;
    case 'fmarinos':
      clubName = '横浜F・マリノス'
      break;
    case 'yokohamafc':
      clubName = '横浜FC'
      break;
    case 'yscc':
      clubName = 'Y.S.C.C.横浜'
      break;
    case 'scsagamihara':
      clubName = 'SC相模原'
      break;
    case 'bellmare':
      clubName = '湘南ベルマーレ'
      break;
    case 'ventforet':
      clubName = 'ヴァンフォーレ甲府'
      break;
    case 'parceiro':
      clubName = 'AC長野パルセイロ'
      break;
    case 'yamaga':
      clubName = '松本山雅FC'
      break;
    case 'albirex':
      clubName = 'アルビレックス新潟'
      break;
    case 'kataller':
      clubName = 'カターレ富山'
      break;
    case 'zweigen':
      clubName = 'ツエーゲン金沢'
      break;
    case 'spulse':
      clubName = '清水エスパルス'
      break;
    case 'jubilo':
      clubName = 'ジュビロ磐田'
      break;
    case 'fujiedamyfc':
      clubName = '藤枝MYFC'
      break;
    case 'azulclaro':
      clubName = 'アスルクラロ沼津'
      break;
    case 'grampus':
      clubName = '名古屋グランパス'
      break;
    case 'fcgifu':
      clubName = 'FC岐阜'
      break;
    case 'sanga':
      clubName = '京都サンガF.C.'
      break;
    case 'gamba':
      clubName = 'ガンバ大阪'
      break;
    case 'gambau23':
      clubName = 'ガンバ大阪 U-23'
      break;
    case 'cerezo':
      clubName = 'セレッソ大阪'
      break;
    case 'cerezou23':
      clubName = 'セレッソ大阪 U-23"'
      break;
    case 'vissel':
      clubName = 'ヴィッセル神戸'
      break;
    case 'gainare':
      clubName = 'ガイナーレ鳥取'
      break;
    case 'fagiano':
      clubName = 'ファジアーノ岡山'
      break;
    case 'sanfrecce':
      clubName = 'サンフレッチェ広島'
      break;
    case 'renofa':
      clubName = 'レノファ山口FC'
      break;
    case 'vortis':
      clubName = '徳島ヴォルティス'
      break;
    case 'kamatamare':
      clubName = 'カマタマーレ讃岐'
      break;
    case 'ehimefc':
      clubName = '愛媛FC'
      break;
    case 'fcimabari':
      clubName = 'FC今治'
      break;
    case 'avispa':
      clubName = 'アビスパ福岡'
      break;
    case 'giravanz':
      clubName = 'ギラヴァンツ北九州'
      break;
    case 'sagan':
      clubName = 'サガン鳥栖'
      break;
    case 'v-varen':
      clubName = 'V・ファーレン長崎'
      break;
    case 'roasso':
      clubName = 'ロアッソ熊本'
      break;
    case 'trinita':
      clubName = '大分トリニータ'
      break;
    case 'kagoshima':
        clubName = '鹿児島ユナイテッドFC'
      break;
    case 'fcryukyu':
      clubName = 'FC琉球'
      break;
    default:
      clubName = 'def'
  }
  return clubName
}
