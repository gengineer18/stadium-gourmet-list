type ClubConfig = {
  name: string,
  color1: string,
  color2?: string,
  color3?: string,
}

export default function getClubConfig (clubId: string): ClubConfig {
  let clubConfig: ClubConfig = {
    name: '',
    color1: ''
  }
  switch (clubId) {
    case 'consadole':
      clubConfig = {
        name: '北海道コンサドーレ札幌',
        color1: '#D7000F',
        color2: '#000000'
      }
      break
    case 'vanraure':
      clubConfig = {
        name: 'ヴァンラーレ八戸',
        color1: '#008836'
      }
      break
    case 'grulla':
      clubConfig = {
        name: 'いわてグルージャ盛岡',
        color1: '#FFFFFF',
        color2: '#000000'
      }
      break
    case 'vegalta':
      clubConfig = {
        name: 'ベガルタ仙台',
        color1: '#FCC800'
      }
      break
    case 'blaublitz':
      clubConfig = {
        name: 'ブラウブリッツ秋田',
        color1: '#005BAB'
      }
      break
    case 'montedio':
      clubConfig = {
        name: 'モンテディオ山形',
        color1: '#004099',
        color2: '#FFFFFF'
      }
      break
    case 'fukushima':
      clubConfig = {
        name: '福島ユナイテッドFC',
        color1: '#E60012',
        color2: '#211612'
      }
      break
    case 'antlers':
      clubConfig = {
        name: '鹿島アントラーズ',
        color1: '#B8183F'
      }
      break
    case 'hollyhock':
      clubConfig = {
        name: '水戸ホーリーホック',
        color1: '#1C2088'
      }
      break
    case 'tochigisc':
      clubConfig = {
        name: '栃木SC',
        color1: '#FFEA02'
      }
      break
    case 'thespa':
      clubConfig = {
        name: 'ザスパクサツ群馬',
        color1: '#00063A',
        color2: '#FDD448'
      }
      break
    case 'reds':
      clubConfig = {
        name: '浦和レッズ',
        color1: '#E6002D'
      }
      break
    case 'ardija':
      clubConfig = {
        name: '大宮アルディージャ',
        color1: '#ED6C00'
      }
      break
    case 'jef':
      clubConfig = {
        name: 'ジェフユナイテッド千葉',
        color1: '#FFE100',
        color2: '#009260'
      }
      break
    case 'reysol':
      clubConfig = {
        name: '柏レイソル',
        color1: '#FFE850'
      }
      break
    case 'fctokyo':
      clubConfig = {
        name: 'FC東京',
        color1: '#0B2F8E',
        color2: '#E5002C'
      }
      break
    case 'fctokyou23':
      clubConfig = {
        name: 'FC東京 U-23',
        color1: '#0B2F8E',
        color2: '#E5002C'
      }
      break
    case 'verdy':
      clubConfig = {
        name: '東京ヴェルディ',
        color1: '#006937'
      }
      break
    case 'zelvia':
      clubConfig = {
        name: 'FC町田ゼルビア',
        color1: '#0054A7',
        color2: '#BEAF71'
      }
      break
    case 'frontale':
      clubConfig = {
        name: '川崎フロンターレ',
        color1: '#20AEF4',
        color2: '#212121'
      }
      break
    case 'fmarinos':
      clubConfig = {
        name: '横浜F・マリノス',
        color1: '#003F98',
        color2: '#FFFFFF',
        color3: '#E6002D'
      }
      break
    case 'yokohamafc':
      clubConfig = {
        name: '横浜FC',
        color1: '#00A0E9'
      }
      break
    case 'yscc':
      clubConfig = {
        name: 'Y.S.C.C.横浜',
        color1: '#005BAB',
        color2: '#EE7A00'
      }
      break
    case 'scsagamihara':
      clubConfig = {
        name: 'SC相模原',
        color1: '#2E8D47',
        color2: '#373333'
      }
      break
    case 'bellmare':
      clubConfig = {
        name: '湘南ベルマーレ',
        color1: '#6FBA2B',
        color2: '#004081'
      }
      break
    case 'ventforet':
      clubConfig = {
        name: 'ヴァンフォーレ甲府',
        color1: '#0060B5',
        color2: '#CA1944'
      }
      break
    case 'parceiro':
      clubConfig = {
        name: 'AC長野パルセイロ',
        color1: '#DA7600',
        color2: '#1A2260'
      }
      break
    case 'yamaga':
      clubConfig = {
        name: '松本山雅FC',
        color1: '#007343',
        color2: '#003E20'
      }
      break
    case 'albirex':
      clubConfig = {
        name: 'アルビレックス新潟',
        color1: '#E95405',
        color2: '#004099'
      }
      break
    case 'kataller':
      clubConfig = {
        name: 'カターレ富山',
        color1: '#0D267E',
        color2: '#9B0337'
      }
      break
    case 'zweigen':
      clubConfig = {
        name: 'ツエーゲン金沢',
        color1: '#D70C1E',
        color2: '#000000'
      }
      break
    case 'spulse':
      clubConfig = {
        name: '清水エスパルス',
        color1: '#FF8706'
      }
      break
    case 'jubilo':
      clubConfig = {
        name: 'ジュビロ磐田',
        color1: '#7399D1'
      }
      break
    case 'fujiedamyfc':
      clubConfig = {
        name: '藤枝MYFC',
        color1: '#803376'
      }
      break
    case 'azulclaro':
      clubConfig = {
        name: 'アスルクラロ沼津',
        color1: '#00A0E9',
        color2: '#122A88'
      }
      break
    case 'grampus':
      clubConfig = {
        name: '名古屋グランパス',
        color1: '#D70C17',
        color2: '#F39800'
      }
      break
    case 'fcgifu':
      clubConfig = {
        name: 'FC岐阜',
        color1: '#016427',
        color2: '#45B158'
      }
      break
    case 'sanga':
      clubConfig = {
        name: '京都サンガF.C.',
        color1: '#842178'
      }
      break
    case 'gamba':
      clubConfig = {
        name: 'ガンバ大阪',
        color1: '#013981',
        color2: '#000000'
      }
      break
    case 'gambau23':
      clubConfig = {
        name: 'ガンバ大阪 U-23',
        color1: '#013981',
        color2: '#000000'
      }
      break
    case 'cerezo':
      clubConfig = {
        name: 'セレッソ大阪',
        color1: '#DA005C'
      }
      break
    case 'cerezou23':
      clubConfig = {
        name: 'セレッソ大阪 U-23',
        color1: '#DA005C'
      }
      break
    case 'vissel':
      clubConfig = {
        name: 'ヴィッセル神戸',
        color1: '#9B001F'
      }
      break
    case 'gainare':
      clubConfig = {
        name: 'ガイナーレ鳥取',
        color1: '#6DBA3C',
        color2: '#023458'
      }
      break
    case 'fagiano':
      clubConfig = {
        name: 'ファジアーノ岡山',
        color1: '#B6003D',
        color2: '#1D2368'
      }
      break
    case 'sanfrecce':
      clubConfig = {
        name: 'サンフレッチェ広島',
        color1: '#51308F'
      }
      break
    case 'renofa':
      clubConfig = {
        name: 'レノファ山口FC',
        color1: '#EB5C00'
      }
      break
    case 'vortis':
      clubConfig = {
        name: '徳島ヴォルティス',
        color1: '#0A308F',
        color2: '#6BB131'
      }
      break
    case 'kamatamare':
      clubConfig = {
        name: 'カマタマーレ讃岐',
        color1: '#65AADD',
        color2: '#004471'
      }
      break
    case 'ehimefc':
      clubConfig = {
        name: '愛媛FC',
        color1: '#FF951B'
      }
      break
    case 'fcimabari':
      clubConfig = {
        name: 'FC今治',
        color1: '#161B60',
        color2: '#FFF102'
      }
      break
    case 'avispa':
      clubConfig = {
        name: 'アビスパ福岡',
        color1: '#17284C',
        color2: '#9C9E9E'
      }
      break
    case 'giravanz':
      clubConfig = {
        name: 'ギラヴァンツ北九州',
        color1: '#FFF102',
        color2: '#E60012'
      }
      break
    case 'sagan':
      clubConfig = {
        name: 'サガン鳥栖',
        color1: '#2096F3',
        color2: '#E95598'
      }
      break
    case 'v-varen':
      clubConfig = {
        name: 'V・ファーレン長崎',
        color1: '#F39800',
        color2: '#005BAC'
      }
      break
    case 'roasso':
      clubConfig = {
        name: 'ロアッソ熊本',
        color1: '#B71915'
      }
      break
    case 'trinita':
      clubConfig = {
        name: '大分トリニータ',
        color1: '#13098B'
      }
      break
    case 'kagoshima':
      clubConfig = {
        name: '鹿児島ユナイテッドFC',
        color1: '#16335C'
      }
      break
    case 'fcryukyu':
      clubConfig = {
        name: 'FC琉球',
        color1: '#BE003B',
        color2: '#E0CD76'
      }
      break
    default:
      clubConfig = {
        name: '',
        color1: ''
      }
  }
  return clubConfig
}
