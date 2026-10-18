<script lang="ts">export default {};</script>
<style>
@import './styles/tokens.css';
view,text,button,scroll-view{box-sizing:border-box}
button{color:inherit;margin:0;border:0;font:inherit;cursor:pointer;white-space:normal;line-height:var(--line-secondary)}
.screen button{line-height:var(--line-secondary);font-family:inherit}
.screen button::after{border:0}
button:focus-visible{outline:2px solid var(--color-accent);outline-offset:4px}
image{display:block}
button[disabled]{opacity:.5}
button:active{opacity:.8}
.screen{width:100%;max-width:var(--content-max);min-height:100vh;margin:auto;padding-bottom:calc(var(--tab-height) + var(--space-6) + env(safe-area-inset-bottom));overflow-wrap:anywhere}
.eyebrow,.section-kicker{display:block;font-size:var(--font-caption);line-height:var(--line-secondary);font-weight:var(--weight-semibold);letter-spacing:1.2px;color:var(--color-muted)}
.body-text{font-size:var(--font-body);line-height:var(--line-body);color:var(--color-secondary)}
.text-link{background:none;padding:var(--space-3) 0;min-height:var(--touch-target);font-size:var(--font-secondary);font-weight:var(--weight-semibold);color:var(--color-accent);display:flex;align-items:center;gap:var(--space-2);line-height:var(--line-secondary);text-align:left}
.muted-note{display:block;font-size:var(--font-footnote);line-height:var(--line-secondary);color:var(--color-muted)}
.bottom-tabs{max-width:var(--content-max);margin:auto}
/* #ifdef H5 */
body{margin:0;background:#f5f5f2}
uni-page-body{min-height:100vh}
a,button,uni-button{-webkit-tap-highlight-color:transparent}
/* #endif */
</style>
