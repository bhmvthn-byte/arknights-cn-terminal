import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Login from './views/Login.jsx';
import Boot from './views/Boot.jsx';
import Shell from './components/Shell.jsx';
import Home from './views/Home.jsx';
import Events from './views/Events.jsx';
import Profile from './views/Profile.jsx';
import StageDrawer from './components/StageDrawer.jsx';
import { EVENTS } from './data.js';

const USER_KEY = 'ak_cn_user';

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [view, id] = raw.split('/');
  return { view: view || 'home', id: id || '' };
}

export default function App() {
  const [user, setUser] = useState(readUser);
  const [booting, setBooting] = useState(false);
  const [route, setRoute] = useState(parseRoute);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute());
      setSelected(null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const navigate = useCallback((path) => {
    if (`#/${path}` === window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = `#/${path}`;
  }, []);

  const handleLogin = useCallback((account) => {
    const profile = {
      name: '博士',
      uid: `10${Math.floor(100000 + Math.random() * 899999)}`,
      server: 'CN 国服',
      level: 120,
      account,
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    setUser(profile);
    window.location.hash = '#/home';
    setRoute({ view: 'home', id: '' });
    setBooting(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setBooting(false), 3800);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setBooting(false);
    setSelected(null);
    window.location.hash = '#/home';
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(''), 2400);
  }, []);

  const openStage = useCallback((stage) => setSelected(stage), []);

  const featured = useMemo(() => {
    const wanted = ['ME-EX-8', 'TA-10', 'SR-8'];
    return wanted.map((code) => {
      const event = EVENTS.find((e) => e.stages.some((s) => s.code === code));
      const stage = event.stages.find((s) => s.code === code);
      return { ...stage, eventId: event.id, eventName: event.name, eventAccent: event.accent, eventType: event.type };
    });
  }, []);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (booting) {
    return <Boot user={user} />;
  }

  return (
    <Shell
      user={user}
      route={route}
      navigate={navigate}
      onLogout={handleLogout}
      onHome={() => navigate('home')}
    >
      {route.view === 'home' && (
        <Home user={user} navigate={navigate} featured={featured} onOpen={openStage} />
      )}
      {route.view === 'events' && (
        <Events eventId={route.id} navigate={navigate} onOpen={openStage} />
      )}
      {route.view === 'profile' && (
        <Profile
          user={user}
          onLogout={handleLogout}
          showToast={showToast}
        />
      )}
      {!['home', 'events', 'profile'].includes(route.view) && (
        <Home user={user} navigate={navigate} featured={featured} onOpen={openStage} />
      )}
      <StageDrawer stage={selected} onClose={() => setSelected(null)} showToast={showToast} />
      {toast && <div className="toast">{toast}</div>}
    </Shell>
  );
}
