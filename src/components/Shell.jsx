import { Icon, LogoMark } from '../icons.jsx';

const NAV = [
  { id: 'home', label: '作战终端', sub: 'TERMINAL', icon: 'home' },
  { id: 'events', label: '活动关卡', sub: 'OPERATIONS', icon: 'layers' },
  { id: 'profile', label: '我的档案', sub: 'PROFILE', icon: 'user' },
];

export default function Shell({ user, route, navigate, children, onHome }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={onHome} aria-label="返回作战终端">
          <LogoMark size={34} />
          <span className="brand-text">
            <strong>ARKNIGHTS</strong>
            <em>国服作战终端</em>
          </span>
        </button>

        <nav className="topnav" aria-label="主导航">
          {NAV.map((item) => {
            const active = route.view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={active ? 'active' : ''}
                onClick={() => navigate(item.id)}
              >
                <Icon name={item.icon} size={17} />
                <span>{item.label}</span>
                <em>{item.sub}</em>
              </button>
            );
          })}
        </nav>

        <div className="topbar-right">
          <span className="cn-badge">
            <i />
            CN 国服
          </span>
          <button type="button" className="user-chip" onClick={() => navigate('profile')}>
            <span className="avatar">博</span>
            <span className="user-meta">
              <strong>{user.name}</strong>
              <em>LV.{user.level} · {user.uid}</em>
            </span>
          </button>
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <div>
          <LogoMark size={22} />
          <span>非官方同人工具 · 配队整理自公开攻略 · 登录为本地演示</span>
        </div>
        <span>RHODES ISLAND / CN SERVER / 2026.11</span>
      </footer>

      <nav className="bottomnav" aria-label="移动端导航">
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className={route.view === item.id ? 'active' : ''}
            onClick={() => navigate(item.id)}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
