import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Camera, Bird, Mountain, Heart, Coffee, Gem, Flower, 
  ChevronRight, ChevronLeft, RotateCcw, Share2, Video, Maximize, Zap, Aperture 
} from 'lucide-react';

// --- Types & Data ---

type PersonalityId = 
  | 'sony_portrait' 
  | 'nikon_bird' 
  | 'sony_landscape' 
  | 'fuji_hipster' 
  | 'canon_master' 
  | 'leica_rich'
  | 'panasonic_video'
  | 'hasselblad_medium'
  | 'ricoh_street'
  | 'zeiss_manual'
  | 'canon_portrait'
  | 'nikon_landscape'
  | 'sony_macro'
  | 'fuji_street'
  | 'olympus_travel'
  | 'dji_aerial'
  | 'iphone_pro'
  | 'pentax_soul'
  | 'film_classic'
  | 'sigma_sharp';

interface Answer {
  text: string;
  points: Partial<Record<PersonalityId, number>>;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface PersonalityDef {
  id: PersonalityId;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

const PERSONALITIES: Record<PersonalityId, PersonalityDef> = {
  sony_portrait: {
    id: 'sony_portrait',
    name: '索尼拍妹佬',
    subtitle: '只要光圈大，妹子随便跨',
    description: '你的相机里永远只有人像模式。眼部对焦是你最爱的功能，85mm f/1.4是你的本体。你的后期技术堪比整容医生，液化、磨皮、拉腿一气呵成。',
    icon: <Heart className="w-16 h-16 text-pink-500" />,
    color: 'text-pink-500',
    bgGradient: 'from-pink-900/40 to-orange-900/40',
  },
  nikon_bird: {
    id: 'nikon_bird',
    name: '尼康打鸟佬',
    subtitle: '心中无女人，拔剑自然神',
    description: '迷彩服是你的保护色，600mm定焦大炮是你的武器。为了拍到一只罕见的飞禽，你可以在野外趴上8个小时一动不动。你的臂力惊人，视力堪比鹰隼。',
    icon: <Bird className="w-16 h-16 text-yellow-500" />,
    color: 'text-yellow-500',
    bgGradient: 'from-yellow-900/40 to-green-900/40',
  },
  sony_landscape: {
    id: 'sony_landscape',
    name: '索尼风光佬',
    subtitle: '包里永远缺一块滤镜',
    description: '你不是在爬山，就是在去爬山的路上。查云图、看星历是你每天的必修课。你的三脚架比你的命还重要。为了极致的边缘画质，你愿意背着几十斤的器材徒步十公里。',
    icon: <Mountain className="w-16 h-16 text-blue-500" />,
    color: 'text-blue-500',
    bgGradient: 'from-blue-900/40 to-cyan-900/40',
  },
  fuji_hipster: {
    id: 'fuji_hipster',
    name: '富士滤镜党',
    subtitle: '直出就是正义，氛围感yyds',
    description: '你买相机一半是为了拍照，一半是为了穿搭。特色咖啡馆是你的主战场。你对“胶片模拟”如数家珍，认为“直出”才是摄影的灵魂。',
    icon: <Coffee className="w-16 h-16 text-green-500" />,
    color: 'text-green-500',
    bgGradient: 'from-green-900/40 to-emerald-900/40',
  },
  canon_master: {
    id: 'canon_master',
    name: '佳能老法师',
    subtitle: '法师出征，寸草不生',
    description: '摄影马甲是你的战袍，红圈镜头是你的荣耀。市郊公园是你永远的归宿。你喜欢成群结队出没，对“大片”有着独特的审美追求，水印必须够大。',
    icon: <Flower className="w-16 h-16 text-red-500" />,
    color: 'text-red-500',
    bgGradient: 'from-red-900/40 to-orange-900/40',
  },
  leica_rich: {
    id: 'leica_rich',
    name: '徕卡抚摸党',
    subtitle: '摄影是用光的艺术，把钱用光',
    description: '对你来说，相机不是工具，是工艺品。那个红色的可乐标是你身份的象征。你喜欢黄铜露白，享受手动对焦的阻尼感。你最常做的事是拿一块超细纤维布擦拭机身。',
    icon: <Gem className="w-16 h-16 text-red-600" />,
    color: 'text-red-600',
    bgGradient: 'from-red-950/60 to-zinc-900/60',
  },
  panasonic_video: {
    id: 'panasonic_video',
    name: '松下视频佬',
    subtitle: '不拍视频买什么松下',
    description: '你的相机上永远挂着麦克风和监视器。你对4K 120帧、10bit 4:2:2、V-Log如数家珍。比起拍照，你更在乎果冻效应和呼吸效应。你的硬盘永远处于爆满边缘。',
    icon: <Video className="w-16 h-16 text-indigo-500" />,
    color: 'text-indigo-500',
    bgGradient: 'from-indigo-900/40 to-purple-900/40',
  },
  hasselblad_medium: {
    id: 'hasselblad_medium',
    name: '哈苏中画幅巨佬',
    subtitle: '底大一级压死人',
    description: '你追求的是极致的画质和色彩科学。一亿像素是你起步的尊严。你按快门的速度很慢，因为每一次曝光都仿佛在燃烧金钱。你鄙视一切全画幅。',
    icon: <Maximize className="w-16 h-16 text-orange-400" />,
    color: 'text-orange-400',
    bgGradient: 'from-orange-900/40 to-amber-900/40',
  },
  ricoh_street: {
    id: 'ricoh_street',
    name: '理光扫街侠',
    subtitle: '天下武功，唯快不破',
    description: '你信奉“最好的相机就是你带在身边的相机”。你喜欢单手持机，超焦距盲拍是你的绝活。高对比度黑白滤镜是你的最爱。你穿梭在城市的大街小巷。',
    icon: <Zap className="w-16 h-16 text-zinc-400" />,
    color: 'text-zinc-400',
    bgGradient: 'from-zinc-800/60 to-zinc-950/80',
  },
  zeiss_manual: {
    id: 'zeiss_manual',
    name: '蔡司光学信徒',
    subtitle: '自动对焦是没有灵魂的',
    description: '你是纯粹的光学原教旨主义者。你迷恋金属镜身的冰冷触感和对焦环丝滑的阻尼。你认为紫边也是一种玄学，微反差和立体感是你毕生的追求。',
    icon: <Aperture className="w-16 h-16 text-blue-400" />,
    color: 'text-blue-400',
    bgGradient: 'from-blue-900/40 to-indigo-900/40',
  },
  canon_portrait: {
    id: 'canon_portrait',
    name: '佳能人像甜妹控',
    subtitle: '肤色红润，自带磨皮',
    description: '你坚信佳能的肤色表现是无敌的。你镜头里的妹子永远白里透红，充满元气。你对光影的追求远不如对“糖水感”的执着，50mm f/1.2是你的梦中情镜。',
    icon: <Heart className="w-16 h-16 text-red-400" />,
    color: 'text-red-400',
    bgGradient: 'from-red-900/30 to-pink-900/30',
  },
  nikon_landscape: {
    id: 'nikon_landscape',
    name: '尼康风光铁汉',
    subtitle: '锐度即正义，宽容度无敌',
    description: '你对画质的追求近乎偏执。你喜欢在极寒或极热的荒野中挑战极限。尼康的坚固耐用让你感到安心，你拍出的每一张风光照都锐利得能割伤眼睛。',
    icon: <Mountain className="w-16 h-16 text-yellow-600" />,
    color: 'text-yellow-600',
    bgGradient: 'from-yellow-950/40 to-zinc-900/40',
  },
  sony_macro: {
    id: 'sony_macro',
    name: '索尼微距数毛党',
    subtitle: '放大，再放大',
    description: '你对宏观世界有着近乎疯狂的痴迷。昆虫的复眼、花蕊的纹理是你镜头下的常客。你精通景深合成，为了拍出一张全清晰的微距照，你可以连续拍摄上百张素材。',
    icon: <Aperture className="w-16 h-16 text-orange-500" />,
    color: 'text-orange-500',
    bgGradient: 'from-orange-900/40 to-zinc-900/40',
  },
  fuji_street: {
    id: 'fuji_street',
    name: '富士街头诗人',
    subtitle: '胶片感，是岁月的味道',
    description: '你穿梭在老旧的街道，寻找光影与色彩的交织。你不在乎像素，只在乎那一抹“胶片感”。你的照片里总是带着淡淡的忧郁和浓浓的故事感。',
    icon: <Coffee className="w-16 h-16 text-emerald-500" />,
    color: 'text-emerald-500',
    bgGradient: 'from-emerald-900/40 to-zinc-900/40',
  },
  olympus_travel: {
    id: 'olympus_travel',
    name: '奥巴旅行特工',
    subtitle: '轻便，是为了走得更远',
    description: '你信奉M43系统的轻便与全能。你可以在雨中毫无顾忌地拍摄，因为你的器材防尘防滴。你喜欢长途跋涉，用最轻的负重记录下最广阔的世界。',
    icon: <Camera className="w-16 h-16 text-blue-300" />,
    color: 'text-blue-300',
    bgGradient: 'from-blue-900/30 to-zinc-900/30',
  },
  dji_aerial: {
    id: 'dji_aerial',
    name: '大疆上帝视角',
    subtitle: '换个角度看世界',
    description: '你已经不满足于地面的视角。你喜欢操控无人机飞向高空，俯瞰大地的肌理。你对禁飞区了如指掌，每一次起飞都是一场与风的博弈。',
    icon: <Maximize className="w-16 h-16 text-cyan-400" />,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-900/40 to-zinc-900/40',
  },
  iphone_pro: {
    id: 'iphone_pro',
    name: '手机摄影艺术家',
    subtitle: '计算摄影也是摄影',
    description: '你认为器材不重要，头脑才重要。你精通各种手机修图APP，能用手机拍出大片质感。你随时随地都在记录，是社交媒体上的影像弄潮儿。',
    icon: <Zap className="w-16 h-16 text-white" />,
    color: 'text-white',
    bgGradient: 'from-zinc-700/40 to-zinc-900/40',
  },
  pentax_soul: {
    id: 'pentax_soul',
    name: '宾得灵魂画师',
    subtitle: '宾得色彩，玄学之巅',
    description: '你是小众中的小众。你迷恋宾得那独特的绿色和红色表现。你不在乎对焦速度，只在乎那一口“宾味”。你享受那种被同伴问“这是什么牌子”的优越感。',
    icon: <Aperture className="w-16 h-16 text-green-400" />,
    color: 'text-green-400',
    bgGradient: 'from-green-900/40 to-zinc-900/40',
  },
  film_classic: {
    id: 'film_classic',
    name: '银盐胶片信徒',
    subtitle: '等待，是摄影的一部分',
    description: '你享受那种不能立刻看到结果的期待感。你迷恋暗房里的药水味，认为数码摄影是没有灵魂的复制。每一张底片都是你对时间的致敬。',
    icon: <Camera className="w-16 h-16 text-amber-600" />,
    color: 'text-amber-600',
    bgGradient: 'from-amber-900/40 to-zinc-900/40',
  },
  sigma_sharp: {
    id: 'sigma_sharp',
    name: '适马健身器材党',
    subtitle: '锐度够不够，看重不重',
    description: '你对“堆料”有着迷之执着。你认为镜头越重，画质越好。你有着惊人的臂力，能单手拎起适马的“健身器材”拍上一整天。锐度是你唯一的信仰。',
    icon: <Zap className="w-16 h-16 text-zinc-300" />,
    color: 'text-zinc-300',
    bgGradient: 'from-zinc-700/40 to-zinc-900/40',
  }
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: '难得的休息日，你决定带上相机出门，你的目的地通常是？',
    answers: [
      { text: '人流密集的繁华街头或幽暗小巷', points: { ricoh_street: 3, fuji_street: 2, leica_rich: 1 } },
      { text: '人迹罕至的自然保护区或深山老林', points: { nikon_bird: 3, nikon_landscape: 2, sony_landscape: 1 } },
      { text: '光线完美的室内影棚或精心布置的场景', points: { hasselblad_medium: 3, canon_portrait: 2, panasonic_video: 1 } },
      { text: '氛围感拉满的文艺街区或特色小店', points: { fuji_hipster: 3, iphone_pro: 1 } },
      { text: '风景秀丽的市郊公园或植物园', points: { canon_master: 3, sony_portrait: 2, sony_macro: 1 } },
    ],
  },
  {
    id: 2,
    question: '购买新镜头时，你最无法妥协的参数或特性是？',
    answers: [
      { text: '极致的虚化能力和梦幻的焦外', points: { sony_portrait: 3, canon_portrait: 2, canon_master: 1 } },
      { text: '超长的焦距和迅捷的对焦速度', points: { nikon_bird: 3, sigma_sharp: 1 } },
      { text: '无与伦比的色彩过渡和极其丰富的细节', points: { hasselblad_medium: 3, zeiss_manual: 2, pentax_soul: 1 } },
      { text: '轻巧便携，能随时塞进口袋', points: { ricoh_street: 3, olympus_travel: 2, iphone_pro: 1 } },
      { text: '呼吸效应控制极佳，最好有无级光圈', points: { panasonic_video: 3 } },
    ],
  },
  {
    id: 3,
    question: '拍摄结束后，你的后期处理习惯是？',
    answers: [
      { text: '精雕细琢，哪怕是一根头发丝或一点瑕疵也要修到完美', points: { sony_portrait: 3, canon_portrait: 2, hasselblad_medium: 1 } },
      { text: '追求极致画质，多张合成、降噪、拉宽容度是基操', points: { sony_landscape: 3, nikon_landscape: 2, sony_macro: 1 } },
      { text: '调色才是灵魂，套滤镜/LUT、拉曲线，情绪全靠色调给', points: { fuji_hipster: 3, fuji_street: 2, panasonic_video: 1 } },
      { text: '稍微调下明暗对比就发，或者干脆传到手机里简单搞搞', points: { iphone_pro: 3, ricoh_street: 2, canon_master: 1 } },
      { text: '尽量保持原汁原味，顶多裁切一下，真实最重要', points: { film_classic: 3, zeiss_manual: 2, leica_rich: 1 } },
    ],
  },
  {
    id: 4,
    question: '在路上偶遇另一位拿着相机的同行，你最先注意到的是？',
    answers: [
      { text: '下意识偷瞄他的机身型号和镜头（有没有红圈/金圈）', points: { canon_master: 3, sigma_sharp: 2, leica_rich: 1 } },
      { text: '看他镜头对着哪里，好奇他在拍什么好东西', points: { ricoh_street: 3, fuji_street: 2, nikon_bird: 1 } },
      { text: '看他的穿搭风格和拿相机的姿势帅不帅', points: { fuji_hipster: 3, leica_rich: 2, pentax_soul: 1 } },
      { text: '扫一眼他的配件（脚架、稳定器、灯阵），评估专业度', points: { panasonic_video: 3, sony_landscape: 2, dji_aerial: 1 } },
      { text: '看看他带的模特好不好看（或者根本不关心同行，只看妹子）', points: { sony_portrait: 3, canon_portrait: 2 } },
    ],
  },
  {
    id: 5,
    question: '对你而言，按下快门那一刻的终极追求是？',
    answers: [
      { text: '捕捉转瞬即逝的决定性瞬间', points: { ricoh_street: 3, fuji_street: 2, leica_rich: 1 } },
      { text: '记录极致的自然之美与生态奇观', points: { nikon_bird: 3, sony_landscape: 2, dji_aerial: 1 } },
      { text: '创作出具有商业价值或极高审美的人像/静物', points: { hasselblad_medium: 3, sony_portrait: 2, canon_portrait: 1 } },
      { text: '享受机械结构运作的纯粹快感与光学之美', points: { zeiss_manual: 3, film_classic: 2, leica_rich: 1 } },
      { text: '用动态影像讲述一个完整的故事', points: { panasonic_video: 3 } },
    ],
  },
  {
    id: 6,
    question: '关于“对焦”，你的态度是？',
    answers: [
      { text: '必须指哪打哪，最好能自动识别眼睛和动物', points: { sony_portrait: 3, nikon_bird: 2, sony_macro: 1 } },
      { text: '手动对焦才是灵魂，享受转动对焦环的阻尼感', points: { zeiss_manual: 3, film_classic: 2, leica_rich: 1 } },
      { text: '超焦距盲拍，根本不需要看屏幕', points: { ricoh_street: 3, fuji_street: 1 } },
      { text: '跟焦必须平滑，不能有丝毫抽搐', points: { panasonic_video: 3 } },
      { text: '只要光圈够小，全景深不需要对焦', points: { sony_landscape: 3, nikon_landscape: 2, dji_aerial: 1 } },
    ],
  },
  {
    id: 7,
    question: '你的摄影包里，除了相机和镜头，通常还会带些什么？',
    answers: [
      { text: '各种重型或专业配件（三脚架、稳定器、大功率补光灯）', points: { sony_landscape: 3, panasonic_video: 2, sigma_sharp: 1 } },
      { text: '户外生存物资（水壶、干粮、防晒防蚊、冲锋衣）', points: { nikon_bird: 3, nikon_landscape: 2, olympus_travel: 1 } },
      { text: '没啥特别的，可能就一块备用电池和擦镜纸', points: { zeiss_manual: 3, leica_rich: 2, film_classic: 1 } },
      { text: '拍摄小道具、拍立得，或者自己补妆用的小物件', points: { sony_portrait: 3, fuji_hipster: 2, canon_portrait: 1 } },
      { text: '我连摄影包都不带，相机直接挂脖子上或揣兜里走天下', points: { ricoh_street: 3, iphone_pro: 2, olympus_travel: 1 } },
    ],
  },
  {
    id: 8,
    question: '如果要给你的得意之作配一段文字发布，你通常会写什么？',
    answers: [
      { text: '详细列出机身、镜头型号和光圈快门ISO等拍摄参数', points: { hasselblad_medium: 3, zeiss_manual: 2, sigma_sharp: 1 } },
      { text: '一段不知所云的文艺短句，或者干脆只发几个emoji', points: { fuji_hipster: 3, fuji_street: 2, ricoh_street: 1 } },
      { text: '讲述拍摄背后的艰辛过程（比如等了多久、爬了多高）', points: { sony_landscape: 3, nikon_landscape: 2, dji_aerial: 1 } },
      { text: '猛夸一顿出镜的模特/客户，顺便艾特对方', points: { sony_portrait: 3, canon_portrait: 2 } },
      { text: '什么都不写，或者只打个简单的地点/日期定位', points: { leica_rich: 3, film_classic: 2, pentax_soul: 1 } },
    ],
  },
  {
    id: 9,
    question: '朋友想让你帮忙拍个短片，你的第一反应是？',
    answers: [
      { text: '没问题，我的稳定器和监视器已经饥渴难耐了！', points: { panasonic_video: 3, dji_aerial: 1 } },
      { text: '拍短片？我只懂按快门，视频还是算了吧。', points: { zeiss_manual: 3, film_classic: 2, pentax_soul: 1 } },
      { text: '可以啊，只要出镜的人好看，怎么拍都行。', points: { sony_portrait: 2, canon_portrait: 3 } },
      { text: '随便拿个小机器录一段就行，主打一个真实记录。', points: { iphone_pro: 3, ricoh_street: 2, olympus_travel: 1 } },
      { text: '拍视频画质太渣了，不如我给你拍几张一亿像素的硬照。', points: { hasselblad_medium: 3, sigma_sharp: 1 } },
    ],
  },
  {
    id: 10,
    question: '你最喜欢的拍摄天气是？',
    answers: [
      { text: '阳光明媚，光线充足的晴天。', points: { canon_master: 3, sony_portrait: 2, canon_portrait: 1 } },
      { text: '狂风暴雨或者大雪纷飞的极端天气。', points: { sony_landscape: 3, nikon_landscape: 2 } },
      { text: '阴天或者傍晚，光线柔和有氛围感。', points: { fuji_hipster: 3, fuji_street: 2, zeiss_manual: 1 } },
      { text: '只要目标出现，什么天气都无所谓。', points: { nikon_bird: 3, ricoh_street: 2, olympus_travel: 1 } },
      { text: '无所谓，反正我都在影棚里自己打灯。', points: { hasselblad_medium: 3, sony_macro: 2 } },
    ],
  },
  {
    id: 11,
    question: '看到一张非常震撼的照片，你首先会思考什么？',
    answers: [
      { text: '这光影是怎么布的？用了几个灯？', points: { hasselblad_medium: 3, sony_portrait: 2, canon_portrait: 1 } },
      { text: '这是在哪里拍的？机位在哪？', points: { sony_landscape: 3, nikon_landscape: 2, dji_aerial: 1 } },
      { text: '这是什么镜头拍的？焦外真好看！', points: { zeiss_manual: 3, sigma_sharp: 2, canon_master: 1 } },
      { text: '这色彩是怎么调出来的？求预设！', points: { fuji_hipster: 3, fuji_street: 2, pentax_soul: 1 } },
      { text: '这抓拍时机太绝了，怎么做到的？', points: { ricoh_street: 3, leica_rich: 2, film_classic: 1 } },
    ],
  },
  {
    id: 12,
    question: '你的相机外观现在是什么状态？',
    answers: [
      { text: '贴满了各种个性贴纸或者换了好看的蒙皮。', points: { fuji_hipster: 3, pentax_soul: 2 } },
      { text: '战损成色，边角都磨露白了，但这是勋章。', points: { ricoh_street: 3, leica_rich: 2, film_classic: 1 } },
      { text: '保护得像新的一样，平时都放在防潮箱里供着。', points: { leica_rich: 3, hasselblad_medium: 2, zeiss_manual: 1 } },
      { text: '裹着厚厚的迷彩炮衣或者硅胶保护套。', points: { nikon_bird: 3, nikon_landscape: 2, canon_master: 1 } },
      { text: '挂满了各种兔笼、快装板和怪手配件。', points: { panasonic_video: 3, dji_aerial: 1 } },
    ],
  },
  {
    id: 13,
    question: '别人夸你的照片好看时，你心里通常怎么想？',
    answers: [
      { text: '那当然，也不看看我花了多少钱买器材。', points: { leica_rich: 3, hasselblad_medium: 2, sigma_sharp: 1 } },
      { text: '主要是模特好看/风景好，我只是个按快门的。', points: { sony_portrait: 3, sony_landscape: 2, canon_portrait: 1 } },
      { text: '运气好而已，刚好碰到了那个瞬间。', points: { ricoh_street: 3, fuji_street: 2 } },
      { text: '谢谢，这可是我蹲了几个小时才拍到的。', points: { nikon_bird: 3, nikon_landscape: 2 } },
      { text: '表面谦虚，内心：我的调色/打光技术天下第一。', points: { fuji_hipster: 3, panasonic_video: 2, pentax_soul: 1 } },
    ],
  },
  {
    id: 14,
    question: '如果只能带一支镜头去旅行，你会选？',
    answers: [
      { text: '35mm或50mm定焦，进可攻退可守。', points: { zeiss_manual: 3, leica_rich: 2, film_classic: 1 } },
      { text: '28mm或更广的饼干头，主打轻便。', points: { ricoh_street: 3, olympus_travel: 2, fuji_hipster: 1 } },
      { text: '24-70mm大三元，干活必备，万金油。', points: { panasonic_video: 3, canon_master: 2, sigma_sharp: 1 } },
      { text: '85mm或135mm，只拍特写和人像。', points: { sony_portrait: 3, canon_portrait: 2 } },
      { text: '100-400mm或更长，绝不放过任何远处的细节。', points: { nikon_bird: 3, sony_landscape: 2, nikon_landscape: 1 } },
    ],
  },
  {
    id: 15,
    question: '你对“噪点”的看法是？',
    answers: [
      { text: '绝对不能忍！必须用AI降噪抹得干干净净。', points: { sony_landscape: 3, hasselblad_medium: 2, sony_macro: 1 } },
      { text: '只要不影响数毛，稍微有一点可以接受。', points: { nikon_bird: 3, nikon_landscape: 2, sigma_sharp: 1 } },
      { text: '噪点？那叫胶片颗粒感！是照片的灵魂！', points: { film_classic: 3, fuji_hipster: 2, ricoh_street: 1 } },
      { text: '无所谓，只要情绪到位，画质都是次要的。', points: { leica_rich: 3, pentax_soul: 2, zeiss_manual: 1 } },
      { text: '视频里出现噪点是灾难，必须严格控制ISO。', points: { panasonic_video: 3 } },
    ],
  },
  {
    id: 16,
    question: '参加摄影聚会，你最喜欢聊什么话题？',
    answers: [
      { text: '交流哪里的妹子好看，怎么约模特。', points: { sony_portrait: 2, canon_portrait: 3 } },
      { text: '吐槽某个牌子的色彩科学或者菜单设计。', points: { pentax_soul: 3, fuji_hipster: 2, panasonic_video: 1 } },
      { text: '炫耀自己最近又淘到了什么稀有的老镜头。', points: { zeiss_manual: 3, leica_rich: 2, film_classic: 1 } },
      { text: '分享最近发现的绝佳机位或者鸟类栖息地。', points: { sony_landscape: 3, nikon_bird: 2, dji_aerial: 1 } },
      { text: '探讨最新的传感器技术和宽容度测试数据。', points: { hasselblad_medium: 3, nikon_landscape: 2, sigma_sharp: 1 } },
    ],
  },
  {
    id: 17,
    question: '你的电脑硬盘里最多的是什么？',
    answers: [
      { text: '几十个G的未剪辑视频素材和代理文件。', points: { panasonic_video: 3, dji_aerial: 2 } },
      { text: '几百个G的连拍废片，还没来得及挑。', points: { nikon_bird: 3, sigma_sharp: 2 } },
      { text: '各种不同版本的后期预设和LUT。', points: { fuji_hipster: 3, fuji_street: 2 } },
      { text: '按照日期和地点严格分类的RAW格式原片。', points: { sony_landscape: 3, hasselblad_medium: 2, nikon_landscape: 1 } },
      { text: '各种精修过的人像大图和排版好的九宫格。', points: { sony_portrait: 3, canon_portrait: 2, canon_master: 1 } },
    ],
  },
  {
    id: 18,
    question: '遇到杠精批评你的照片，你会？',
    answers: [
      { text: '直接甩出原图EXIF信息，用参数教他做人。', points: { hasselblad_medium: 3, zeiss_manual: 2, sigma_sharp: 1 } },
      { text: '懒得理他，懂的人自然懂我的艺术表达。', points: { leica_rich: 3, ricoh_street: 2, film_classic: 1 } },
      { text: '虚心接受，然后继续坚持自己的风格。', points: { fuji_hipster: 3, pentax_soul: 2 } },
      { text: '怼回去：你行你上啊，你知道我拍这图有多辛苦吗？', points: { sony_landscape: 3, nikon_bird: 2, nikon_landscape: 1 } },
      { text: '根本不在乎，只要甲方/模特满意就行。', points: { panasonic_video: 3, sony_portrait: 2, canon_portrait: 1 } },
    ],
  },
  {
    id: 19,
    question: '你觉得摄影最烧钱的地方在哪里？',
    answers: [
      { text: '永远买不完的镜头和不断升级的机身。', points: { canon_master: 3, hasselblad_medium: 2, sigma_sharp: 1 } },
      { text: '各种昂贵的配件：滤镜、脚架、稳定器、存储卡。', points: { sony_landscape: 3, panasonic_video: 2, dji_aerial: 1 } },
      { text: '为了拍照而付出的路费、住宿费和向导费。', points: { nikon_bird: 3, olympus_travel: 2, nikon_landscape: 1 } },
      { text: '请模特、租场地、买道具的费用。', points: { sony_portrait: 2, canon_portrait: 3 } },
      { text: '信仰充值，为那个红色的Logo买单。', points: { leica_rich: 3, zeiss_manual: 2, pentax_soul: 1 } },
    ],
  },
  {
    id: 20,
    question: '如果有一天你决定退坑不玩摄影了，最可能的原因是？',
    answers: [
      { text: '身体吃不消了，背不动那么重的器材了。', points: { sony_landscape: 3, nikon_bird: 2, sigma_sharp: 1 } },
      { text: '觉得手机拍照已经足够好了，没必要带相机。', points: { iphone_pro: 3, ricoh_street: 2, fuji_hipster: 1 } },
      { text: '破产了，实在买不起新出的器材了。', points: { hasselblad_medium: 3, leica_rich: 2, zeiss_manual: 1 } },
      { text: '找不到愿意让我拍的人了。', points: { sony_portrait: 3, canon_portrait: 2 } },
      { text: '视频行业太卷了，干不动了。', points: { panasonic_video: 3, dji_aerial: 1 } },
    ],
  },
];

interface PersonalityScoreStat {
  expectedScore: number;
  variance: number;
  coverage: number;
}

const PERSONALITY_IDS = Object.keys(PERSONALITIES) as PersonalityId[];

const createScoreMap = (): Record<PersonalityId, number> =>
  PERSONALITY_IDS.reduce((accumulator, id) => {
    accumulator[id] = 0;
    return accumulator;
  }, {} as Record<PersonalityId, number>);

const PERSONALITY_SCORE_STATS: Record<PersonalityId, PersonalityScoreStat> = (() => {
  const stats = PERSONALITY_IDS.reduce((accumulator, id) => {
    accumulator[id] = {
      expectedScore: 0,
      variance: 0,
      coverage: 0,
    };
    return accumulator;
  }, {} as Record<PersonalityId, PersonalityScoreStat>);

  QUESTIONS.forEach(question => {
    PERSONALITY_IDS.forEach(id => {
      const scoreValues = question.answers.map(answer => answer.points[id] ?? 0);
      const expectedInQuestion =
        scoreValues.reduce((sum, value) => sum + value, 0) / scoreValues.length;
      const varianceInQuestion =
        scoreValues.reduce((sum, value) => sum + (value - expectedInQuestion) ** 2, 0) /
        scoreValues.length;

      stats[id].expectedScore += expectedInQuestion;
      stats[id].variance += varianceInQuestion;

      if (scoreValues.some(value => value > 0)) {
        stats[id].coverage += 1;
      }
    });
  });

  return stats;
})();

const pickWinningPersonality = (answers: number[]): PersonalityId => {
  const rawScores = createScoreMap();
  const hitCounts = createScoreMap();

  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex < 0) {
      return;
    }

    const selectedAnswer = QUESTIONS[questionIndex]?.answers[answerIndex];
    if (!selectedAnswer) {
      return;
    }

    Object.entries(selectedAnswer.points).forEach(([key, value]) => {
      if (!value) {
        return;
      }

      const personalityId = key as PersonalityId;
      rawScores[personalityId] += value;
      hitCounts[personalityId] += 1;
    });
  });

  const totalQuestions = QUESTIONS.length;
  const ranked = PERSONALITY_IDS.map(id => {
    const stat = PERSONALITY_SCORE_STATS[id];
    const std = Math.sqrt(stat.variance) || 1;
    const preferenceStrength = (rawScores[id] - stat.expectedScore) / std;
    const reliability = Math.sqrt(stat.coverage / totalQuestions);
    const supportRatio = stat.coverage > 0 ? hitCounts[id] / stat.coverage : 0;

    return {
      id,
      adjustedScore: preferenceStrength * reliability + supportRatio * 0.25,
      rawScore: rawScores[id],
      hitCount: hitCounts[id],
    };
  }).sort((a, b) => {
    if (b.adjustedScore !== a.adjustedScore) {
      return b.adjustedScore - a.adjustedScore;
    }

    if (b.rawScore !== a.rawScore) {
      return b.rawScore - a.rawScore;
    }

    if (b.hitCount !== a.hitCount) {
      return b.hitCount - a.hitCount;
    }

    return a.id.localeCompare(b.id);
  });

  return ranked[0]?.id ?? 'sony_portrait';
};

// --- Components ---

export default function App() {
  const [appState, setAppState] = useState<'home' | 'quiz' | 'result'>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [resultId, setResultId] = useState<PersonalityId | null>(null);

  const handleStart = () => {
    setSelectedAnswers(new Array(QUESTIONS.length).fill(-1));
    setCurrentQuestionIndex(0);
    setAppState('quiz');
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResult = () => {
    setResultId(pickWinningPersonality(selectedAnswers));
    setAppState('result');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none" />

      <main className="w-full max-w-2xl px-6 py-12 z-10 min-h-[600px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {appState === 'home' && <Home key="home" onStart={handleStart} />}
          {appState === 'quiz' && (
            <Quiz 
              key={`quiz-${currentQuestionIndex}`} 
              question={QUESTIONS[currentQuestionIndex]} 
              currentIndex={currentQuestionIndex}
              total={QUESTIONS.length}
              selectedAnswerIndex={selectedAnswers[currentQuestionIndex]}
              onSelectAnswer={handleSelectAnswer}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
          {appState === 'result' && resultId && (
            <Result 
              key="result" 
              personality={PERSONALITIES[resultId]} 
              onRestart={handleStart} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function Home({ onStart }: { onStart: () => void, key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center space-y-8"
    >
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border border-zinc-800 rounded-full border-dashed"
        />
        <div className="bg-zinc-900 p-6 rounded-full shadow-2xl shadow-black/50 border border-zinc-800">
          <Camera className="w-16 h-16 text-zinc-300" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 to-zinc-500">
          摄影佬人格测试
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-md mx-auto">
          测测你是哪种摄影圈究极生物。<br/>
          <span className="text-sm text-zinc-500 mt-2 block">（纯属玩梗，切勿对号入座，如有雷同，说明你就是）</span>
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="mt-8 px-8 py-4 bg-zinc-100 text-zinc-950 font-bold rounded-full text-lg flex items-center gap-2 hover:bg-white transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)]"
      >
        开始测试 <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}

function Quiz({ 
  question, 
  currentIndex, 
  total, 
  selectedAnswerIndex,
  onSelectAnswer,
  onNext,
  onPrev
}: { 
  question: Question, 
  currentIndex: number, 
  total: number, 
  selectedAnswerIndex: number,
  onSelectAnswer: (index: number) => void,
  onNext: () => void,
  onPrev: () => void,
  key?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full flex flex-col"
    >
      {/* Progress Bar */}
      <div className="w-full mb-8">
        <div className="flex justify-between text-sm text-zinc-500 mb-2 font-mono">
          <span>Question {currentIndex + 1}</span>
          <span>{total}</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-zinc-400 rounded-full"
            initial={{ width: `${(currentIndex / total) * 100}%` }}
            animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {question.answers.map((answer, idx) => {
          const isSelected = selectedAnswerIndex === idx;
          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectAnswer(idx)}
              className={`w-full text-left p-5 rounded-2xl border transition-all text-lg ${
                isSelected 
                  ? 'bg-zinc-800 border-zinc-400 text-zinc-100 shadow-lg' 
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {answer.text}
            </motion.button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 hover:text-zinc-200 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> 上一题
        </button>
        <button
          onClick={onNext}
          disabled={selectedAnswerIndex === -1}
          className="px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors flex items-center gap-2"
        >
          {currentIndex === total - 1 ? '查看结果' : '下一题'}
          {currentIndex !== total - 1 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
}

function Result({ personality, onRestart }: { personality: PersonalityDef, onRestart: () => void, key?: string }) {
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const handleShare = () => {
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="w-full flex flex-col items-center text-center"
    >
      <div className="text-zinc-500 font-mono mb-4 tracking-widest uppercase text-sm">
        TEST RESULT
      </div>

      <div className={`w-full max-w-md p-8 rounded-3xl border border-zinc-800 bg-gradient-to-b ${personality.bgGradient} backdrop-blur-xl relative overflow-hidden shadow-2xl`}>
        {/* Decorative background icon */}
        <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none scale-150">
          {personality.icon}
        </div>

        <div className="flex flex-col items-center relative z-10">
          <div className="mb-6 p-4 bg-zinc-950/50 rounded-full border border-zinc-800/50 backdrop-blur-md">
            {personality.icon}
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-black mb-2 ${personality.color} drop-shadow-lg`}>
            {personality.name}
          </h2>
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-950/50 border border-zinc-800/50 text-zinc-300 text-sm font-medium mb-6">
            "{personality.subtitle}"
          </div>
          
          <p className="text-zinc-400 leading-relaxed text-left">
            {personality.description}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-8 w-full max-w-md relative">
        <AnimatePresence>
          {showCopyMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-12 left-0 right-0 flex justify-center"
            >
              <div className="bg-zinc-100 text-zinc-950 px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                截图分享给你的摄影搭子吧！
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="flex-1 py-4 bg-zinc-900 text-zinc-300 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors border border-zinc-800"
        >
          <RotateCcw className="w-5 h-5" /> 再测一次
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex-1 py-4 bg-zinc-100 text-zinc-950 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-colors"
        >
          <Share2 className="w-5 h-5" /> 炫耀结果
        </motion.button>
      </div>
    </motion.div>
  );
}
