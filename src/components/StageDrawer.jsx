import { useEffect } from 'react';
import { EVENTS } from '../data.js';
import { Icon, Rarity } from '../icons.jsx';

const ROLE_LABEL = { dps: '输出', heal: '医疗', tank: '重装', vanguard: '先锋', control: '控制', special: '特种' };

export default function StageDrawer({ stage, onClose, showToast }) {
  useEffect(() => {
    if (!stage) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [stage, onClose]);

  if (!stage) return null;

  const event = EVENTS.find((e) => e.id === stage.eventId) || EVENTS.find((e) => e.name === stage.eventName);

  async function copySquad() {
    const text = [
      `【${stage.eventName || event?.name} ${stage.code}】推荐配队`,
      `核心：${stage.squad.map((o) => `${o.name}（${o.skill}，${o.note}）`).join('、')}`,
      stage.subs.length ? `替补：${stage.subs.join('、')}` : '',
      `部署：${stage.order.join(' ')}`,
      `提示：${stage.tips.join(' ')}`,
    ]
      .filter(Boolean)
      .join('\n');
    try {
      await navigator.clipboard.writeText(text);
      showToast('配队已复制到剪贴板');
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
      showToast('配队已复制到剪贴板');
    }
  }

  return (
    <div className="drawer-wrap" role="dialog" aria-modal="true" aria-label={`${stage.code} 推荐配队`}>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer-head">
          <div>
            <span className="drawer-event" style={{ color: stage.eventAccent }}>
              {stage.eventName || event?.name} / {stage.group}
            </span>
            <h2>{stage.code}</h2>
            <div className="drawer-meta">
              {stage.tags.map((tag) => <b key={tag}>{tag}</b>)}
              <span className="diff-dots">
                {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= stage.diff ? 'on' : ''} />)}
              </span>
            </div>
          </div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="关闭">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <section className="drawer-section">
            <div className="drawer-section-head">
              <h3>核心配队</h3>
              <span>{stage.squad.length} 位 / 可替换 {stage.subs.length} 位</span>
            </div>
            <div className="op-grid">
              {stage.squad.map((o) => (
                <article key={o.name} className={`op-card role-${o.role}`}>
                  <div className="op-card-top">
                    <Rarity value={o.rarity} />
                    <span>{ROLE_LABEL[o.role]}</span>
                  </div>
                  <strong>{o.name}</strong>
                  <em>{o.skill}</em>
                  <p>{o.note}</p>
                </article>
              ))}
            </div>
          </section>

          {stage.subs.length > 0 && (
            <section className="drawer-section">
              <div className="drawer-section-head">
                <h3>可替换干员</h3>
                <span>同定位即可</span>
              </div>
              <div className="subs-list">
                {stage.subs.map((name) => <span key={name}>{name}</span>)}
              </div>
            </section>
          )}

          <section className="drawer-section">
            <div className="drawer-section-head">
              <h3>部署顺序</h3>
              <span>{stage.order.length} 步</span>
            </div>
            <ol className="order-list">
              {stage.order.map((step, i) => (
                <li key={i}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="drawer-section">
            <div className="drawer-section-head">
              <h3>实战提示</h3>
              <span>机制 / 技能轴</span>
            </div>
            <ul className="tip-list">
              {stage.tips.map((tip, i) => (
                <li key={i}><span>!</span><p>{tip}</p></li>
              ))}
            </ul>
          </section>

          {event?.source?.url && (
            <div className="drawer-source">
              <Icon name="shield" size={15} />
              <span>{event.source.label}</span>
              <a href={event.source.url} target="_blank" rel="noreferrer">原始攻略</a>
            </div>
          )}
        </div>

        <div className="drawer-foot">
          <button type="button" className="btn-primary" onClick={copySquad}>
            <Icon name="copy" size={17} />
            复制配队
          </button>
          <button type="button" className="btn-ghost" onClick={onClose}>关闭</button>
        </div>
      </aside>
    </div>
  );
}
