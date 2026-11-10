import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Login from './views/Login.jsx';
import Boot from './views/Boot.jsx';
import Shell from './components/Shell.jsx';
import Home from './views/Home.jsx';
import Events from './views/Events.jsx';
import Profile from './views/Profile.jsx';
import StageDrawer from './components/StageDrawer.jsx';
import { EVENTS, SFX } from './data.js';

const USER_KEY = 'ak_cn_user';
const MUTE_KEY = 'ak_cn_muted';

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
  const [muted, setMuted] = useState(() => localStorage.getItem(MUTE_KEY) === '1');
  const [route, setRoute] = useState(parseRoute);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');
  const audioRef = useRef(null);
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

  const playSfx = useCallback(() => {
    if (muted) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(SFX.file);
      audioRef.current.volume = 0.55;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [muted]);

  const handleLogin = useCallback(
    (account) => {
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
      playSfx();
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setBooting(false), 3800);
    },
    [playSfx]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setBooting(false);
    setSelected(null);
    window.location.hash = '#/home';
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem(MUTE_KEY, next ? '1' : '0');
      if (next && audioRef.current) audioRef.current.pause();
      return next;
    });
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
    return <Login onLogin={handleLogin} onTestSound={playSfx} muted={muted} onToggleMute={toggleMute} />;
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
      muted={muted}
      onToggleMute={toggleMute}
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
          muted={muted}
          onToggleMute={toggleMute}
          onLogout={handleLogout}
          onPlaySfx={playSfx}
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
