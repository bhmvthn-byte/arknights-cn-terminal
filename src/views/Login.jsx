import { useEffect, useRef, useState } from 'react';
import { Icon, LogoMark } from '../icons.jsx';

const PHONE_RE = /^1[3-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ onLogin }) {
  const [method, setMethod] = useState('phone');
  const [account, setAccount] = useState('');
  const [code, setCode] = useState('');
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState('');
  const [hint, setHint] = useState('');
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (countdown <= 0) return undefined;
    timerRef.current = setTimeout(() => setCountdown((n) => n - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [countdown]);

  const validAccount = method === 'phone' ? PHONE_RE.test(account) : EMAIL_RE.test(account);

  function switchMethod(next) {
    setMethod(next);
    setAccount('');
    setCode('');
    setError('');
    setHint('');
  }

  function sendCode() {
    if (!validAccount) {
      setError(method === 'phone' ? '请输入有效的中国大陆手机号' : '请输入有效的邮箱地址');
      return;
    }
    setError('');
    setCountdown(60);
    setHint('演示环境验证码：123456');
  }

  function fillDemo() {
    setMethod('phone');
    setAccount('13800138000');
    setCode('123456');
    setError('');
    setHint('演示环境验证码：123456');
  }

  function submit(e) {
    e.preventDefault();
    if (!validAccount) {
      setError(method === 'phone' ? '请输入有效的中国大陆手机号' : '请输入有效的邮箱地址');
      return;
    }
    if (!agree) {
      setError('请先阅读并同意演示说明');
      return;
    }
    if (code !== '123456') {
      setError('验证码不正确。演示环境请使用 123456');
      return;
    }
    setError('');
    onLogin(method === 'phone' ? `${account.slice(0, 3)}****${account.slice(-4)}` : account);
  }

  return (
    <div className="login">
      <section className="login-visual">
        <div className="login-visual-img" />
        <div className="login-visual-shade" />
        <div className="login-topline">
          <div className="brand-lockup">
            <LogoMark size={34} />
            <div>
              <strong>ARKNIGHTS</strong>
              <span>RHODES ISLAND</span>
            </div>
          </div>
          <span className="server-pill">CN · 国服</span>
        </div>

        <div className="login-title">
          <div className="login-kicker">OPERATIONS TERMINAL / 01</div>
          <h1>
            明日方舟
            <span>作战终端</span>
          </h1>
          <p>国服活动关卡配队参考。选择关卡，查看核心干员、替代方案与部署顺序。</p>
          <div className="login-rule" />
          <div className="login-chips">
            <span>活动关卡</span>
            <span>推荐配队</span>
            <span>站位思路</span>
          </div>
        </div>

        <div className="login-footline">
          <span>SERVER / CN</span>
          <span>DATA / 2026.11</span>
          <span>UNOFFICIAL TOOL</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-box">
          <div className="login-account-head">
            <LogoMark size={38} />
            <div>
              <strong>HYPERGRYPH ACCOUNT</strong>
              <span>鹰角网络账号 · 国服</span>
            </div>
          </div>

          <h2>登录作战终端</h2>
          <p className="login-sub">使用手机号或邮箱登录。当前为本地演示登录，不会连接鹰角服务器。</p>

          <div className="seg">
            <button type="button" className={method === 'phone' ? 'on' : ''} onClick={() => switchMethod('phone')}>
              手机号
            </button>
            <button type="button" className={method === 'email' ? 'on' : ''} onClick={() => switchMethod('email')}>
              邮箱
            </button>
          </div>

          <form onSubmit={submit} noValidate>
            <label className="field">
              <span>{method === 'phone' ? '手机号' : '邮箱地址'}</span>
              <input
                value={account}
                onChange={(e) => {
                  setAccount(e.target.value.trim());
                  setError('');
                }}
                inputMode={method === 'phone' ? 'numeric' : 'email'}
                placeholder={method === 'phone' ? '请输入中国大陆手机号' : 'doctor@example.com'}
                autoComplete="username"
              />
            </label>

            <label className="field">
              <span>验证码</span>
              <div className="field-row">
                <input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setError('');
                  }}
                  inputMode="numeric"
                  placeholder="6 位验证码"
                  autoComplete="one-time-code"
                />
                <button type="button" className="code-btn" onClick={sendCode} disabled={countdown > 0}>
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </label>

            <label className="agree">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span>我已了解：这是演示登录，不会上传真实账号信息</span>
            </label>

            {hint && <div className="hint">{hint}</div>}
            {error && <div className="form-error">{error}</div>}

            <button className="login-submit" type="submit">
              <span>登 录</span>
              <Icon name="arrow" size={18} />
            </button>
          </form>

          <button type="button" className="demo-fill" onClick={fillDemo}>
            填入演示账号
          </button>

          <p className="login-disclaimer">
            本项目为非官方同人工具。真实鹰角账号登录需要官方 OAuth 与后端服务，当前版本不包含该能力。
          </p>
        </div>
      </section>
    </div>
  );
}
