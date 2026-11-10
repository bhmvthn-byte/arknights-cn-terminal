import { EVENTS, STATS } from '../data.js';
import { Icon, Rarity } from '../icons.jsx';

const TYPE_LABEL = { SideStory: 'SideStory', 联动活动: '联动活动', 主线: '主线', 日常: '日常' };

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return '夜深了';
  if (h < 11) return '早上好';
  if (h < 14) return '中午好';
  if (h < 19) return '下午好';
  return '晚上好';
}

export default function Home({ user, navigate, featured, onOpen }) {
  const mainEvent = EVENTS[0];

  return (
    <div className="page home">
      <div className="page-head">
        <div>
          <span className="page-kicker">DOKTOR TERMINAL / CN</span>
          <h1>{greeting()}，博士。</h1>
          <p>这里是国服活动关卡的配队参考。选一关，直接看核心干员与替换方案。</p>
        </div>
        <div className="head-side">
          <span>DATA SYNC</span>
          <strong>2026.11.10</strong>
          <em>CN SERVER ONLY</em>
        </div>
      </div>

      <div className="home-hero">
        <article className="hero-card">
          <div className="hero-bg" style={{ backgroundImage: `url(${mainEvent.banner})` }} />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="hero-meta">
              <span className="tag-solid">FEATURED</span>
              <span>{mainEvent.type}</span>
              <span>{mainEvent.period}</span>
            </div>
            <h2>{mainEvent.name}</h2>
            <p>{mainEvent.summary}</p>
            <div className="hero-actions">
              <button type="button" className="btn-primary" onClick={() => navigate(`events/${mainEvent.id}`)}>
                查看关卡配队
                <Icon name="arrow" size={17} />
              </button>
              <button type="button" className="btn-ghost" onClick={() => onOpen(featured[0])}>
                直接看 {featured[0].code}
              </button>
            </div>
            <div className="hero-stats">
              <div><strong>{mainEvent.stages.length}</strong><span>收录关卡</span></div>
              <div><strong>{STATS.stages}</strong><span>全部配队</span></div>
              <div><strong>CN</strong><span>仅国服</span></div>
            </div>
          </div>
        </article>

        <aside className="doctor-panel">
          <div className="panel-head">
            <span>DOCTOR PROFILE</span>
            <em>ID CARD</em>
          </div>
          <div className="doctor-id">
            <span className="doctor-avatar">博</span>
            <div>
              <strong>{user.name}</strong>
              <em>LV.{user.level} / {user.uid}</em>
              <span className="online"><i /> 已连接 PRTS</span>
            </div>
          </div>
          <dl className="doctor-rows">
            <div><dt>服务器</dt><dd>CN 国服</dd></div>
            <div><dt>登录方式</dt><dd>{user.account.includes('@') ? '邮箱' : '手机号'}</dd></div>
            <div><dt>账号状态</dt><dd>本地演示</dd></div>
            <div><dt>数据版本</dt><dd>2026.11</dd></div>
          </dl>
          <div className="doctor-stats">
            <div><strong>{STATS.events}</strong><span>活动档案</span></div>
            <div><strong>{STATS.stages}</strong><span>关卡配队</span></div>
          </div>
          <button type="button" className="panel-link" onClick={() => navigate('events')}>
            浏览全部活动
            <Icon name="arrow" size={15} />
          </button>
        </aside>
      </div>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>今日推荐配队</h2>
            <p>当前版本高难关卡，点击查看完整站位与替换。</p>
          </div>
          <button type="button" className="text-btn" onClick={() => navigate('events')}>
            全部关卡
            <Icon name="arrow" size={15} />
          </button>
        </div>

        <div className="rec-grid">
          {featured.map((stage) => (
            <button type="button" className="rec-card" key={`${stage.eventId}-${stage.code}`} onClick={() => onOpen(stage)}>
              <div className="rec-top">
                <span className="stage-code" style={{ color: stage.eventAccent }}>{stage.code}</span>
                <span className="diff-dots" aria-label={`难度 ${stage.diff}`}>
                  {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= stage.diff ? 'on' : ''} />)}
                </span>
              </div>
              <div className="rec-event">{stage.eventName}</div>
              <div className="rec-squad">
                {stage.squad.slice(0, 4).map((o) => (
                  <span key={o.name} className="mini-op">
                    <Rarity value={o.rarity} />
                    {o.name}
                  </span>
                ))}
                {stage.squad.length > 4 && <span className="mini-more">+{stage.squad.length - 4}</span>}
              </div>
              <div className="rec-foot">
                <span>{stage.tags.slice(0, 2).join(' / ')}</span>
                <Icon name="arrow" size={15} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>活动档案</h2>
            <p>国服版本活动与常驻关卡总览。</p>
          </div>
        </div>
        <div className="event-lines">
          {EVENTS.map((event) => (
            <button
              type="button"
              key={event.id}
              className="event-line"
              style={{ '--acc': event.accent }}
              onClick={() => navigate(`events/${event.id}`)}
            >
              <span className="event-line-code">{event.code}</span>
              <span className="event-line-main">
                <strong>{event.name}</strong>
                <em>{event.en}</em>
              </span>
              <span className="event-line-type">{TYPE_LABEL[event.type] || event.type}</span>
              <span className="event-line-period">{event.period}</span>
              <span className="event-line-count">{event.stages.length} 关</span>
              <Icon name="arrow" size={16} />
            </button>
          ))}
        </div>
      </section>

      <div className="notice">
        <Icon name="shield" size={18} />
        <p>
          配队整理自 TapTap / 17173 / 9game 等公开攻略，干员可用同定位替代，练度以攻略标注为准。
          本项目为玩家自制的非官方工具，与鹰角网络无关。
        </p>
      </div>
    </div>
  );
}
