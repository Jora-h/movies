interface Provider {
  isAuthenticated: boolean;
  signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const authProvider: Provider = {
  isAuthenticated: document.cookie.indexOf("authToken=") >= 0,
  async signout() {
    authProvider.isAuthenticated = false;
  },
};
