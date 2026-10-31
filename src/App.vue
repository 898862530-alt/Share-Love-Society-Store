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

.primary-button,.secondary-button{display:flex;align-items:center;justify-content:center;gap:12px;min-height:52px;padding:12px 20px;border-radius:14px;font-size:var(--font-body);font-weight:600;line-height:1.5;text-align:center}.primary-button{background:var(--color-accent);color:#fff}.secondary-button{background:var(--color-soft);color:var(--color-accent);border:1px solid var(--color-line)}.icon-button{width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;background:none;padding:8px;flex:none}.page-content{padding:32px var(--page-gutter)}.page-title{display:block;font-size:var(--font-large-title);line-height:1.35;font-weight:600;letter-spacing:-.8px}.page-subtitle{display:block;margin-top:12px;font-size:var(--font-secondary);color:var(--color-secondary);line-height:1.6}.empty-state{padding:56px 0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:20px}.empty-state>text:not(.body-text){font-size:var(--font-title-3);font-weight:600}.empty-state .primary-button{margin-top:12px}.stepper{display:flex;align-items:center;border:1px solid var(--color-line);border-radius:10px;background:#fff}.stepper button{width:44px;height:44px;padding:0;background:none;font-size:22px;color:var(--color-accent);display:flex;align-items:center;justify-content:center}.stepper text{min-width:32px;text-align:center;font-size:var(--font-secondary)}.modal-mask{position:fixed;inset:0;z-index:100;background:#122c3f55;display:flex;align-items:center;justify-content:center;padding:24px}.dialog-card{width:100%;max-width:420px;border-radius:24px;background:#fff;padding:24px;max-height:85vh;overflow-y:auto}.dialog-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:var(--font-title-3);font-weight:600;margin-bottom:20px}
/* #ifdef H5 */
body{margin:0;background:#f7fbfe}
uni-page-body{min-height:100vh}
a,button,uni-button{-webkit-tap-highlight-color:transparent}
/* #endif */
</style>
