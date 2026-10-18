import {assetUrl} from '../utils/assets';
export type CategoryId='coffee'|'bakery'|'clothing';
export interface Product {id:string;category:CategoryId;name:string;en:string;subtitle:string;slogan:string;description:string;color:string;art:number;image?:string;origin?:string;process?:string;notes?:string[];pending?:boolean;}
export const categories=[{id:'coffee',name:'咖啡',en:'Coffee',caption:'从群岛，抵达日常。'},{id:'bakery',name:'烘焙',en:'Bakery',caption:'把风土，烘焙成温柔。'},{id:'clothing',name:'服装',en:'Everyday wear',caption:'让喜欢的画，走进生活。'}] as const;
export const products:Product[]=[
{id:'gayo',category:'coffee',name:'加约',en:'GAYO',subtitle:'群岛六境 · 联名咖啡',slogan:'一杯咖啡，一种看世界的方式。',description:'一段关于咖啡与画作的相遇。让日常的一杯，成为认识另一种表达的开始。',color:'#dce9e9',art:1,pending:true},
{id:'ijen',category:'coffee',name:'伊真',en:'IJEN',subtitle:'奇异果调 · 水洗',slogan:'清新果调，唤醒日常。',description:'来自东爪哇伊真咖啡产区，由当地合作农户共同完成采收。去除果肉与果胶后进行洁净处理，让酸质更清晰，风味更加轻盈干净。',origin:'东爪哇 · 伊真',process:'水洗 Washed',notes:['奇异果','青果清甜','柑橘与回甘'],color:'#dcece3',art:2},
{id:'malino',category:'coffee',name:'马利诺',en:'MALINO',subtitle:'芒果调 · 蜜处理',slogan:'把热带的明亮，留在杯中。',description:'来自南苏拉威西马利诺产区，热带环境孕育出成熟而丰润的果香印象。保留部分果胶进行干燥，让甜感更加集中，口感圆润饱满。',origin:'南苏拉威西 · 马利诺',process:'蜜处理 Honey',notes:['成熟芒果','热带熟果','蜂蜜与回甘'],color:'#f2e3bb',art:5},
{id:'cianjur',category:'coffee',name:'展玉',en:'CIANJUR',subtitle:'草莓调 · 厌氧',slogan:'莓好的一天，从这里开始。',description:'来自西爪哇 Cianjur 咖啡产区，由当地合作农户完成鲜果采收与筛选。将咖啡鲜果置于密闭环境中发酵，让果香更集中，甜感与层次更加鲜明。',origin:'西爪哇 · 展玉',process:'厌氧 Anaerobic',notes:['草莓','红色浆果','焦糖与回甘'],color:'#f0dbde',art:3},
{id:'toraja',category:'coffee',name:'托拉雅',en:'TORAJA',subtitle:'桃子调 · 日晒',slogan:'温柔桃香，自有回响。',description:'来自苏拉威西托拉雅咖啡产区，山地农户共同完成成熟咖啡鲜果采收。完整咖啡鲜果在日光下缓慢干燥，保留更多果实甜感与成熟果香。',origin:'苏拉威西 · 托拉雅',process:'日晒 Natural',notes:['蜜桃','成熟核果','可可与柔甜回甘'],color:'#f2dfcf',art:8},
{id:'temanggung',category:'coffee',name:'特芒贡',en:'TEMANGGUNG',subtitle:'哈密瓜调 · 群岛六境',slogan:'柔和蜜甜，慢慢回甘。',description:'来自中爪哇特芒贡咖啡产区，由当地合作农户完成采收与初步处理。蜜甜果感与坚果回甘，在杯中慢慢展开。',origin:'中爪哇 · 特芒贡',notes:['哈密瓜','蜜甜果感','坚果与回甘'],color:'#e2e7c8',art:7},
{id:'kopi-luwak',category:'coffee',name:'猫屎咖啡',en:'KOPI LUWAK',subtitle:'特别系列 · 资料待补充',slogan:'留一份好奇，给新的风味。',description:'特别系列的展示位置已预留。产地、处理方式、风味与规格将在资料确认后补充。',color:'#e3d9cd',art:6,pending:true},
...[
['福州茉莉茶酥','福州茉莉花茶','茶香萨布雷 / 茶酥','一口茉莉，轻轻盛开。','#eeeadb'],
['建宁莲子杏仁脆','建宁莲子','杏仁薄脆 / 佛罗伦汀逻辑','莲香与杏仁，清脆相逢。','#eee0c7'],
['永春芦柑饼','永春芦柑','柑橘点心 / 现代茶点饼','把一颗阳光，放进茶点里。','#f0dfc4'],
['莆田桂圆麻薯烧','莆田桂圆','麻薯软点 / 烘烤茶点','软糯之间，是熟悉的桂圆香。','#e4d3c4'],
['古田红曲米脆','古田红曲','米香薄脆 / 谷物脆饼','让谷物的香气，轻盈一点。','#efdad6'],
['浦城丹桂薏米糕','浦城丹桂 × 薏米','桂花糕点 / 轻茶点','细细桂香，慢慢品尝。','#e8e5d0'],
['平和蜜柚饼','平和蜜柚','柚香茶点 / 果香饼','一口柚香，清甜刚好。','#eeead1']
].map((b,i)=>({id:`bake-${i+1}`,category:'bakery' as CategoryId,name:b[0],en:'FUJIAN TEA COLLECTION',subtitle:b[1],slogan:b[3],description:`以${b[1]}为核心食材，将福建风土带进日常茶点。${b[2]}的产品方向，让熟悉的地方风味有了新的表达。`,color:b[4],art:i+1,image:assetUrl(`/static/assets/bakery-${i+1}.webp`),process:b[2]})),
...[1,2,3,4].map((n)=>({id:`wear-${n}`,category:'clothing' as CategoryId,name:['向阳','小花园','橘色漫游','蓝色小屋'][n-1]+' · 联名 T 恤',en:'ART IN EVERYDAY',subtitle:'服装概念款 · 资料待确认',slogan:'把喜欢的画，穿进日常。',description:'联名服装的概念展示。版型、面料、尺码与正式款式，将在商品资料确认后更新。',color:['#eeebe4','#e1e8e0','#eee0da','#dce5e9'][n-1],art:n,pending:true}))
];
export const artworks=[
{name:'向着太阳',en:'Towards the sun',story:'一轮明亮的太阳、一片蓝色的海，还有一艘慢慢出发的小船。颜色在纸上相遇，留下一段关于远方的想象。'},
{name:'小花园',en:'A little garden',story:'叶子沿着自己的方向生长，小花藏在浓淡不同的绿色里。靠近一点，才看得见花园里的细小惊喜。'},
{name:'橘色漫游',en:'An orange afternoon',story:'一只橘色的猫，在粉色天空下伸了个懒腰。这个小小的世界里，每一种颜色都有自己的节奏。'},
{name:'蓝色小屋',en:'The blue house',story:'花朵围着一间蓝色小屋盛开。把心里的安静画下来，也许就有了一处可以停留的地方。'},
{name:'花开的声音',en:'When flowers bloom',story:'橙色与红色的花向上伸展，像把阳光收集进花瓣。画面中的每一笔，都带着生长的力量。'},
{name:'晚安，月亮',en:'Goodnight, moon',story:'夜色落在小城，月亮照亮一扇扇窗。蓝色并不寂静，它也装着温暖的故事。'},
{name:'在一起',en:'Side by side',story:'两只小鸟停在同一根枝头。不同的颜色，不同的姿态，共享这一刻的安静。'},
{name:'山的那一边',en:'Beyond the mountains',story:'山峦在暖色与蓝色之间层层展开。沿着弯曲的小径，想象一段没有终点的散步。'}
].map((a,i)=>({...a,id:i+1,image:assetUrl(`/static/assets/art-${i+1}.webp`),author:`创作者 ${String(i+1).padStart(2,'0')}（占位）`}));
export const getProduct=(id:string)=>products.find(p=>p.id===id)||products[0];
export const getArt=(id:number)=>artworks.find(a=>a.id===id)||artworks[0];
export function openProduct(id:string){uni.navigateTo({url:`/pages/product/index?id=${encodeURIComponent(id)}`})}
export function openCategory(id:string){uni.navigateTo({url:`/pages/category/index?id=${id}`})}
export function openArt(productId:string,artId:number){uni.navigateTo({url:`/pages/artwork/index?product=${productId}&art=${artId}`})}
