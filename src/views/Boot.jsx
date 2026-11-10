import { LogoMark } from '../icons.jsx';

export default function Boot({ user }) {
  return (
    <div className="boot">
      <div className="boot-grid" />
      <div className="boot-scan" />
      <div className="boot-inner">
        <div className="boot-mark">
          <LogoMark size={78} />
        </div>
        <div className="boot-brand">RHODES ISLAND</div>
        <div className="boot-title">PRTS 作战终端</div>
        <div className="boot-sub">AUTHENTICATING · {user.account}</div>
        <div className="boot-bar">
          <i />
        </div>
        <ul className="boot-steps">
          <li><span>01</span>建立神经连接</li>
          <li><span>02</span>同步干员与关卡档案</li>
          <li><span>03</span>载入国服配队数据</li>
        </ul>
        <div className="boot-foot">CN SERVER / 数据版本 2026.11</div>
      </div>
    </div>
  );
}
