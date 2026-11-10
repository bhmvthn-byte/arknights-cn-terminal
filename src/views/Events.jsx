import { useMemo, useState } from 'react';
import { ALL_STAGES, EVENTS } from '../data.js';
import { Icon } from '../icons.jsx';

const ROLE_LABEL = { dps: '输出', heal: '医疗', tank: '重装', vanguard: '先锋', control: '控制', special: '特种' };

function Diff({ value }) {
  return (
    <span className="diff-dots" aria-label={`难度 ${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= value ? 'on' : ''} />)}
    </span>
  );
}

function StageRow({ stage, showEvent, onOpen }) {
  return (
    <button type="button" className="stage-row" onClick={() => onOpen(stage)}>
      <span className="stage-code-block">
        <strong>{stage.code}</strong>
        <em>{stage.group}</em>
      </span>
      <span className="stage-body">
        {showEvent && <span className="stage-event-label" style={{ color: stage.eventAccent }}>{stage.eventName}</span>}
        <span className="stage-tags">
          {stage.tags.map((tag) => <b key={tag}>{tag}</b>)}
        </span>
        <span className="stage-squad-line">
          {stage.squad.map((o) => (
            <span key={o.name} className={`op-chip role-${o.role}`}>
              <i />
              {o.name}
            </span>
          ))}
          {stage.subs.length > 0 && <span className="subs-hint">可替换 {stage.subs.length} 位</span>}
        </span>
      </span>
      <span className="stage-diff">
        <em>DIFFICULTY</em>
        <Diff value={stage.diff} />
      </span>
      <span className="stage-open">
        查看配队
        <Icon name="arrow" size={15} />
      </span>
    </button>
  );
}

function EventCard({ event, onClick }) {
  return (
    <button type="button" className={`event-card ${event.banner ? '' : 'no-art'}`} style={{ '--acc': event.accent }} onClick={onClick}>
      {event.banner ? (
        <span className="event-card-img" style={{ backgroundImage: `url(${event.banner})` }} />
      ) : (
        <span className="event-card-pattern">
          <em>{event.code}</em>
        </span>
      )}
      <span className="event-card-shade" />
      <span className="event-card-top">
        <span>{event.type}</span>
        <span>{event.period}</span>
      </span>
      <span className="event-card-main">
        <span className="event-card-en">{event.en}</span>
        <strong>{event.name}</strong>
        <span className="event-card-foot">
          <span>{event.stages.length} 个关卡</span>
          <span className="event-card-go">进入 <Icon name="arrow" size={14} /></span>
        </span>
      </span>
    </button>
  );
}

export default function Events({ eventId, navigate, onOpen }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('全部');

  const event = EVENTS.find((item) => item.id === eventId);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_STAGES.filter((stage) => {
      const haystack = [
        stage.code,
        stage.eventName,
        stage.group,
        ...stage.tags,
        ...stage.squad.map((o) => o.name),
        ...stage.subs,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const groups = event ? ['全部', ...Array.from(new Set(event.stages.map((s) => s.group)))] : [];
  const stages = event
    ? event.stages.filter((s) => group === '全部' || s.group === group)
    : [];

  return (
    <div className="page events">
      <div className="page-head">
        <div>
          <span className="page-kicker">OPERATIONS / CN</span>
          <h1>{event ? event.name : '活动关卡'}</h1>
          <p>
            {event
              ? `共 ${event.stages.length} 个关卡 / ${new Set(event.stages.map((s) => s.group)).size} 个分组，点击关卡查看核心配队与可替换干员。`
              : '国服活动、主线与资源关的推荐配队。支持按关卡代号或干员名搜索。'}
          </p>
        </div>
        <label className="search">
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索关卡 / 干员，例如 ME-EX-8、山"
            aria-label="搜索关卡或干员"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="清空搜索">
              <Icon name="close" size={15} />
            </button>
          )}
        </label>
      </div>

      {query ? (
        <section className="search-panel">
          <div className="search-head">
            <strong>搜索 “{query}”</strong>
            <span>{results.length} 个关卡包含相关配队</span>
          </div>
          {results.length === 0 ? (
            <div className="empty">
              <Icon name="search" size={28} />
              <p>没有找到匹配的关卡或干员。</p>
              <span>试试输入关卡代号（如 TA-10）或干员名（如山）。</span>
            </div>
          ) : (
            <div className="stage-list">
              {results.map((stage) => (
                <StageRow key={`${stage.eventId}-${stage.code}`} stage={stage} showEvent onOpen={onOpen} />
              ))}
            </div>
          )}
        </section>
      ) : event ? (
        <>
          <button type="button" className="back-btn" onClick={() => navigate('events')}>
            <Icon name="back" size={16} />
            返回活动列表
          </button>

          <header className={`event-hero ${event.banner ? '' : 'no-art'}`} style={{ '--acc': event.accent }}>
            {event.banner && <div className="event-hero-img" style={{ backgroundImage: `url(${event.banner})` }} />}
            <div className="event-hero-shade" />
            <div className="event-hero-content">
              <div className="event-hero-meta">
                <span>{event.type}</span>
                <span>{event.period}</span>
                <span>{event.code}</span>
              </div>
              <h2>{event.name}</h2>
              <em>{event.en}</em>
              <p>{event.summary}</p>
              <div className="event-hero-stats">
                <div><strong>{event.stages.length}</strong><span>收录关卡</span></div>
                <div><strong>{Math.max(...event.stages.map((s) => s.diff))}</strong><span>最高难度</span></div>
                <div><strong>{new Set(event.stages.map((s) => s.group)).size}</strong><span>关卡分组</span></div>
              </div>
            </div>
          </header>

          <div className="group-tabs">
            {groups.map((item) => (
              <button key={item} type="button" className={group === item ? 'on' : ''} onClick={() => setGroup(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="stage-list">
            {stages.map((stage) => (
              <StageRow
                key={stage.code}
                stage={{ ...stage, eventId: event.id, eventName: event.name, eventAccent: event.accent }}
                onOpen={onOpen}
              />
            ))}
          </div>

          <div className="source-note">
            <Icon name="shield" size={16} />
            <span>配队来源：{event.source.label}</span>
            {event.source.url && (
              <a href={event.source.url} target="_blank" rel="noreferrer">查看原始攻略</a>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="event-grid">
            {EVENTS.map((item) => (
              <EventCard key={item.id} event={item} onClick={() => navigate(`events/${item.id}`)} />
            ))}
          </div>
          <div className="notice">
            <Icon name="grid" size={18} />
            <p>
              已收录 {EVENTS.length} 个活动档案、{ALL_STAGES.length} 个关卡配队。活动关卡按国服版本整理，
              干员按“核心 + 可替换”展示，点击任意关卡查看站位与技能轴。
            </p>
          </div>
        </>
      )}

      {event && !query && (
        <div className="role-legend">
          {Object.entries(ROLE_LABEL).map(([key, label]) => (
            <span key={key}><i className={`role-${key}`} />{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}
