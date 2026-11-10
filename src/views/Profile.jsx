import { useState } from 'react';
import { SFX, STATS } from '../data.js';
import { Icon, LogoMark } from '../icons.jsx';

export default function Profile({ user, muted, onToggleMute, onLogout, onPlaySfx, showToast }) {
  const [confirming, setConfirming] = useState(false);

  function clearData() {
    localStorage.clear();
    showToast('本地数据已清除');
    setTimeout(() => window.location.reload(), 600);
  }

  return (
    <div className="page profile">
      <div className="page-head">
        <div>
          <span className="page-kicker">PROFILE / CN</span>
          <h1>我的档案</h1>
          <p>账号状态、数据来源与音效版权信息。</p>
        </div>
        <div className="head-side">
          <span>ACCOUNT</span>
          <strong>LOCAL DEMO</strong>
          <em>不连接鹰角服务器</em>
        </div>
      </div>

      <div className="profile-grid">
        <section className="profile-card id-card">
          <div className="panel-head">
            <span>DOCTOR ID</span>
            <em>RHODES ISLAND</em>
          </div>
          <div className="id-main">
            <span className="id-avatar">博</span>
            <div>
              <strong>{user.name}</strong>
              <em>UID {user.uid}</em>
              <span className="online"><i /> PRTS ONLINE</span>
            </div>
          </div>
          <dl className="doctor-rows big">
            <div><dt>服务器</dt><dd>CN 国服</dd></div>
            <div><dt>账号</dt><dd>{user.account}</dd></div>
            <div><dt>等级</dt><dd>LV.{user.level}</dd></div>
            <div><dt>登录状态</dt><dd>本地演示登录</dd></div>
          </dl>
          <div className="id-foot">
            <LogoMark size={20} />
            <span>非官方同人工具 · 与鹰角网络无关</span>
          </div>
        </section>

        <section className="profile-card">
          <div className="panel-head">
            <span>DATA OVERVIEW</span>
            <em>2026.11</em>
          </div>
          <div className="profile-stats">
            <div><strong>{STATS.events}</strong><span>活动档案</span></div>
            <div><strong>{STATS.stages}</strong><span>关卡配队</span></div>
            <div><strong>CN</strong><span>数据范围</span></div>
          </div>
          <p className="profile-copy">
            配队来自公开攻略整理，覆盖 2026.01 至 2026.09 的国服活动，以及主线关键战与常驻资源关。
            干员按“核心 + 可替换”标注，练度请以原始攻略为准。
          </p>
          <div className="link-list">
            <a href="https://news.17173.com/content/01192026/185812687.shtml" target="_blank" rel="noreferrer">
              雅赛努斯复仇记攻略 <Icon name="arrow" size={13} />
            </a>
            <a href="https://news.17173.com/content/02112026/162406113.shtml" target="_blank" rel="noreferrer">
              辞岁行攻略 <Icon name="arrow" size={13} />
            </a>
            <a href="https://a.9game.cn/mrfz/12088276.html" target="_blank" rel="noreferrer">
              月行水上攻略 <Icon name="arrow" size={13} />
            </a>
          </div>
        </section>

        <section className="profile-card sound-card">
          <div className="panel-head">
            <span>LOGIN SOUND</span>
            <em>CC0</em>
          </div>
          <div className="sound-main">
            <span className={`sound-orb ${muted ? 'off' : ''}`}>
              <Icon name={muted ? 'mute' : 'volume'} size={22} />
            </span>
            <div>
              <strong>{SFX.title}</strong>
              <em>{SFX.author} · Freesound</em>
              <span>{SFX.license}</span>
            </div>
          </div>
          <div className="sound-actions">
            <button type="button" className="btn-primary sm" onClick={onPlaySfx} disabled={muted}>
              <Icon name="play" size={15} />
              试听
            </button>
            <button type="button" className="btn-ghost sm" onClick={onToggleMute}>
              <Icon name={muted ? 'mute' : 'volume'} size={15} />
              {muted ? '已静音' : '静音'}
            </button>
          </div>
          <p className="profile-copy">
            登录时播放的启动音效。原曲为 CC0 公共领域素材，可商用、无需署名；本项目保留出处信息。
          </p>
          <div className="link-list">
            <a href={SFX.source} target="_blank" rel="noreferrer">
              Freesound 原始页面 <Icon name="arrow" size={13} />
            </a>
          </div>
        </section>

        <section className="profile-card">
          <div className="panel-head">
            <span>REAL ACCOUNT</span>
            <em>NOT INCLUDED</em>
          </div>
          <h3 className="profile-title">关于“登录鹰角账号”</h3>
          <p className="profile-copy">
            当前版本没有接入官方账号系统。真实的鹰角账号登录需要官方 OAuth 授权与后端服务，
            纯前端无法安全完成，也不能把 token 暴露在浏览器里。
          </p>
          <ul className="req-list">
            <li><span>01</span>官方开发者资质与 OAuth client_id / redirect_uri</li>
            <li><span>02</span>后端完成授权码换 token、刷新与吊销</li>
            <li><span>03</span>按国服要求接入实名与防沉迷校验</li>
            <li><span>04</span>只读获取干员与关卡进度，避免越权</li>
          </ul>
          <p className="profile-copy muted-copy">
            因此本项目使用本地演示登录：验证码固定 123456，不会发送或保存真实账号信息。
          </p>
        </section>
      </div>

      <div className="profile-actions">
        {confirming ? (
          <>
            <span>确认退出当前演示账号？</span>
            <button type="button" className="btn-danger" onClick={onLogout}>确认退出</button>
            <button type="button" className="btn-ghost" onClick={() => setConfirming(false)}>取消</button>
          </>
        ) : (
          <>
            <button type="button" className="btn-ghost" onClick={() => setConfirming(true)}>
              <Icon name="logout" size={16} />
              退出登录
            </button>
            <button type="button" className="text-btn danger" onClick={clearData}>
              清除本地数据
            </button>
          </>
        )}
      </div>
    </div>
  );
}
