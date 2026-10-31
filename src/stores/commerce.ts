import {reactive,computed} from 'vue';
import {products} from '../data/catalog';
export interface Selection {productId:string;artId:number;spec:string;quantity:number;}
export interface CartItem extends Selection {key:string;}
export interface DemoOrder {id:string;createdAt:string;items:Selection[];contact:{name:string;phone:string;address:string};status:'演示完成';}
interface State {cart:CartItem[];favorites:string[];orders:DemoOrder[];draft:Selection[];draftFromCart:boolean;}
const key='sls-store-demo-v3';
function load():Partial<State>{try{const saved=uni.getStorageSync(key);return saved&&typeof saved==='object'?saved:{};}catch{return {};}}
function valid(i:Selection){return i&&products.some(p=>p.id===i.productId)&&Number.isInteger(i.artId)&&i.artId>=1&&i.artId<=8&&Number.isInteger(i.quantity)&&i.quantity>=1&&i.quantity<=99&&typeof i.spec==='string';}
const saved=load();
export const commerce=reactive<State>({cart:Array.isArray(saved.cart)?saved.cart.filter(valid):[],favorites:Array.isArray(saved.favorites)?saved.favorites.filter(id=>products.some(p=>p.id===id)):[],orders:Array.isArray(saved.orders)?saved.orders.filter(o=>o&&typeof o.id==='string'&&Array.isArray(o.items)&&o.items.every(valid)):[],draft:Array.isArray(saved.draft)?saved.draft.filter(valid):[],draftFromCart:!!saved.draftFromCart});
export const cartCount=computed(()=>commerce.cart.reduce((n,i)=>n+i.quantity,0));
function persist(){uni.setStorageSync(key,JSON.parse(JSON.stringify(commerce)));}
export function addToCart(item:Selection){if(!valid(item))return;const itemKey=`${item.productId}:${item.artId}:${item.spec}`;const existing=commerce.cart.find(i=>i.key===itemKey);if(existing)existing.quantity=Math.min(99,existing.quantity+item.quantity);else commerce.cart.push({...item,key:itemKey});persist();}
export function updateQuantity(itemKey:string,quantity:number){const i=commerce.cart.find(i=>i.key===itemKey);if(i)i.quantity=Math.max(1,Math.min(99,quantity));persist();}
export function removeCart(itemKey:string){commerce.cart=commerce.cart.filter(i=>i.key!==itemKey);persist();}
export function toggleFavorite(id:string){if(commerce.favorites.includes(id))commerce.favorites=commerce.favorites.filter(i=>i!==id);else commerce.favorites.push(id);persist();}
export function prepareCheckout(items:Selection[],fromCart=false){commerce.draft=items.filter(valid).map(i=>({...i}));commerce.draftFromCart=fromCart;persist();uni.navigateTo({url:'/pages/checkout/index'});}
export function placeDemoOrder(contact:DemoOrder['contact']):DemoOrder|undefined{
 if(!commerce.draft.length)return;
 const order:DemoOrder={id:`SLS${Date.now().toString(36).toUpperCase()}`,createdAt:new Date().toISOString(),items:commerce.draft.map(i=>({...i})),contact:{...contact},status:'演示完成'};
 commerce.orders.unshift(order);
 if(commerce.draftFromCart){for(const item of commerce.draft){const itemKey=`${item.productId}:${item.artId}:${item.spec}`;const current=commerce.cart.find(i=>i.key===itemKey);if(current){if(current.quantity>item.quantity)current.quantity-=item.quantity;else commerce.cart=commerce.cart.filter(i=>i.key!==itemKey);}}}
 commerce.draft=[];commerce.draftFromCart=false;persist();return order;
}
export function openCart(){uni.navigateTo({url:'/pages/cart/index'});}
export function openMine(){uni.navigateTo({url:'/pages/mine/index'});}
export function openStore(){uni.navigateTo({url:'/pages/store/index'});}
export function openHome(section?:string){uni.reLaunch({url:'/pages/home/index'+(section?`?section=${section}`:'')});}
