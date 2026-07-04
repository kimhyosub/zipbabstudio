/**
 * 관리자 세션 감지 (데모용)
 * 실제 로그인/인증 시스템이 아니라, localStorage 플래그로 "관리자 모드가 열려 있는지"만
 * 판단하는 간단한 데모 로직입니다. admin/index.html에서 데모 로그인 시 이 플래그가 설정됩니다.
 */
window.HCL_AUTH = {
  SESSION_KEY: "hcl_admin_session",

  isAdminLoggedIn: function () {
    try {
      return window.localStorage.getItem(this.SESSION_KEY) === "1";
    } catch (e) {
      return false;
    }
  },

  login: function () {
    try {
      window.localStorage.setItem(this.SESSION_KEY, "1");
    } catch (e) {
      /* localStorage 사용 불가 환경 — 데모 기능은 동작하지 않음 */
    }
  },

  logout: function () {
    try {
      window.localStorage.removeItem(this.SESSION_KEY);
    } catch (e) {
      /* noop */
    }
  }
};
