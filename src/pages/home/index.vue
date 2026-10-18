<script setup lang="ts">
import {assetUrl} from '../../utils/assets';
import {categories,products,openCategory,openProduct} from '../../data/catalog';import LineIcon from '../../components/LineIcon.vue';import BottomTabs from '../../components/BottomTabs.vue';import ProductCard from '../../components/ProductCard.vue';
</script>
<template><view class="home screen"><view class="store-header"><view><text class="wordmark">爱分你<text class="wordmark-dot">·</text></text><text class="brand-sub">SHARE LOVE SOCIETY</text></view><text class="edition">联名商店</text></view><view class="category-bar"><button v-for="c in categories" :key="c.id" class="category-button" @click="openCategory(c.id)"><LineIcon :name="c.id" :size="32"/><text>{{c.name}}</text></button></view><view class="intro"><text class="eyebrow">GOOD THINGS. SHARED.</text><text class="home-heading">把喜欢，<text class="green-text">分给世界。</text></text><text class="intro-sub">让艺术走进日常，让每一份喜欢都有回响。</text></view><view class="new-section"><view class="section-heading"><text class="section-title">新品推荐</text><text class="section-caption">新的相遇，刚刚好。</text></view><view class="hero-stack"><button class="hero coffee-hero" @click="openProduct('gayo')" aria-label="查看加约联名咖啡"><view class="hero-copy"><text class="new-label">全新联名 / COFFEE</text><text class="hero-title">加约。<text class="hero-title-light">一杯有画的咖啡。</text></text><text class="hero-slogan">一杯咖啡，一种看世界的方式。</text></view><image class="hero-image" :src="assetUrl('/static/assets/coffee-hero.webp')" mode="aspectFill"/><view class="hero-bottom"><text>爱分你 × 植造社</text><view class="round-arrow"><LineIcon name="arrow" :size="24"/></view></view></button><button class="hero bakery-hero" @click="openProduct('bake-1')" aria-label="查看福州茉莉茶酥"><view class="hero-copy"><text class="new-label">新品推荐 / BAKERY</text><text class="hero-title">茉莉开了。<text class="hero-title-light">在你的茶点里。</text></text><text class="hero-slogan">一口茉莉，轻轻盛开。</text></view><image class="hero-image" :src="assetUrl('/static/assets/bakery-hero.webp')" mode="aspectFill"/><view class="hero-bottom"><text>福建风土 · 茶点系列</text><view class="round-arrow"><LineIcon name="arrow" :size="24"/></view></view></button></view></view><view v-for="c in categories" :key="c.id" class="product-section"><view class="section-heading"><text class="section-title">{{c.name}}</text><text class="section-caption">{{c.caption}}</text></view><scroll-view scroll-x class="product-scroll" :show-scrollbar="false"><view class="product-track"><view v-for="p in products.filter(p=>p.category===c.id).slice(0,4)" :key="p.id" class="product-track-item"><ProductCard :product="p"/></view><button class="more-card" @click="openCategory(c.id)"><view class="more-arrow"><LineIcon name="arrow" :size="24"/></view><text>了解更多</text><text class="more-en">EXPLORE {{c.en.toUpperCase()}}</text></button></view></scroll-view></view><view class="about-section"><text class="eyebrow">A LITTLE LOVE, EVERY DAY.</text><text class="about-title">好作品，<br/>值得被更多人看见。</text><view class="about-art"><image v-for="n in [4,1,2]" :key="n" :src="assetUrl(`/static/assets/art-${n}.webp`)" mode="aspectFill" :class="'about-art-'+n"/></view><text class="about-body">爱分你与不同品牌合作，让孤独症艺术家的画作走进咖啡、烘焙与服装。让创作被看见，让日常的选择成为一份支持，共同推动孤独症公益事业的发展。</text><text class="about-sign">SHARE LOVE SOCIETY</text></view><view class="home-footer"><text>让不同的表达，都有被看见的地方。</text><text class="demo-note">设计演示 · 产品概念图与作品为占位素材</text></view><BottomTabs active="store"/></view></template>
<style scoped>
.home{background:var(--color-background)}
.store-header>view{min-width:0}
.store-header{padding:calc(var(--space-5) + env(safe-area-inset-top)) var(--page-gutter) var(--space-4);display:flex;justify-content:space-between;align-items:center;gap:var(--space-4);background:var(--color-surface)}
.wordmark{font-size:var(--font-title-1);line-height:var(--line-title);font-weight:var(--weight-bold);letter-spacing:-.6px}
.wordmark-dot{color:var(--color-accent);padding-left:var(--space-1)}
.brand-sub{font-size:var(--font-caption);line-height:var(--line-secondary);letter-spacing:.8px;display:block;margin-top:var(--space-1);color:var(--color-muted)}
.edition{font-size:var(--font-footnote);color:var(--color-secondary);flex-shrink:0}
.category-bar{background:var(--color-surface);display:flex;justify-content:space-around;padding:var(--space-2) var(--page-gutter) var(--space-5);gap:var(--space-4)}
.category-button{flex:1;background:none;padding:var(--space-2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-2);font-size:var(--font-secondary);min-width:var(--touch-target);min-height:80px;color:var(--color-text)}
.intro{padding:var(--space-6) var(--page-gutter) var(--space-8);background:linear-gradient(var(--color-surface),var(--color-background))}
.home-heading{font-size:var(--font-large-title);font-weight:var(--weight-bold);letter-spacing:-.8px;display:block;line-height:var(--line-title);margin-top:var(--space-3)}
.green-text{color:var(--color-accent);display:inline-block}
.intro-sub{display:block;font-size:var(--font-secondary);line-height:var(--line-body);color:var(--color-secondary);margin-top:var(--space-3)}
.section-heading{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-1);padding:0 var(--page-gutter);margin-bottom:var(--space-5)}
.section-title{font-size:var(--font-title-1);line-height:var(--line-title);font-weight:var(--weight-bold);letter-spacing:-.5px}
.section-caption{font-size:var(--font-secondary);line-height:var(--line-secondary);color:var(--color-secondary)}
.hero-stack{padding:0 var(--page-gutter);display:flex;flex-direction:column;gap:var(--space-6)}
.hero{display:flex;flex-direction:column;border-radius:var(--radius-card);overflow:hidden;background:#eeece6;width:100%;padding:0;text-align:left;box-shadow:var(--shadow-card)}
.hero-copy{padding:var(--space-6) var(--space-6) var(--space-4);background:#eeece6}
.new-label{font-size:var(--font-caption);line-height:var(--line-secondary);letter-spacing:1px;color:var(--color-secondary);display:block;font-weight:var(--weight-semibold)}
.hero-title{display:block;font-size:var(--font-title-1);line-height:var(--line-title);font-weight:var(--weight-bold);letter-spacing:-.5px;margin-top:var(--space-3)}
.hero-title-light{display:block;font-size:var(--font-title-2);line-height:var(--line-title);font-weight:var(--weight-medium);color:var(--color-secondary);margin-top:var(--space-1)}
.hero-slogan{display:block;font-size:var(--font-secondary);line-height:var(--line-secondary);color:var(--color-secondary);margin-top:var(--space-3)}
.hero-image{width:100%;height:280px;flex:none}
.hero-bottom{padding:var(--space-3) var(--space-6) var(--space-4);display:flex;align-items:center;justify-content:space-between;gap:var(--space-3);font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-secondary);background:#eeece6}
.round-arrow{border-radius:50%;background:var(--color-surface);display:flex;align-items:center;justify-content:center;width:var(--touch-target);height:var(--touch-target);flex:none}
.product-section{margin-top:var(--space-12)}
.product-scroll{width:100%}
.product-track{display:flex;align-items:stretch;gap:var(--space-4);padding:0 var(--page-gutter) var(--space-3);width:max-content}
.product-track-item{width:var(--product-card-width);flex:none;display:flex}
.more-card{width:200px;flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-4);padding:var(--space-6);background:var(--color-soft);border-radius:var(--radius-card);font-size:var(--font-body);white-space:normal;font-weight:var(--weight-semibold)}
.more-arrow{border-radius:50%;border:1px solid #c4ccbf;width:var(--control-height);height:var(--control-height);display:flex;align-items:center;justify-content:center}
.more-en{font-size:var(--font-caption);color:var(--color-muted);letter-spacing:1px;line-height:var(--line-secondary)}
.about-section{margin-top:var(--space-12);background:var(--color-soft);padding:var(--space-12) var(--page-gutter);text-align:center}
.about-title{display:block;font-size:var(--font-title-1);line-height:var(--line-title);font-weight:var(--weight-bold);letter-spacing:-.5px;margin-top:var(--space-4);color:var(--color-text)}
.about-art{height:224px;position:relative;max-width:350px;margin:var(--space-5) auto var(--space-6)}
.about-art image{width:120px;height:152px;border:6px solid white;box-shadow:0 8px 16px #22331d13;position:absolute;top:var(--space-10)}
.about-art-4{left:var(--space-2);transform:rotate(-12deg)}
.about-art-1{left:calc(50% - 60px);top:var(--space-4)!important;z-index:2;transform:rotate(3deg)}
.about-art-2{right:var(--space-2);transform:rotate(13deg)}
.about-body{font-size:var(--font-body);line-height:var(--line-body);color:var(--color-secondary);display:block;margin:auto;text-align:left}
.about-sign{display:block;margin-top:var(--space-8);letter-spacing:1px;font-size:var(--font-caption);color:var(--color-muted)}
.home-footer{text-align:center;padding:var(--space-8) var(--page-gutter) var(--space-2);color:var(--color-secondary);font-size:var(--font-footnote);line-height:var(--line-secondary)}
.demo-note{font-size:var(--font-caption);color:var(--color-muted);margin-top:var(--space-3);display:block}
</style>
