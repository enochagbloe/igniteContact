const ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    ASK_QUESTION: '/ask-question',
    PROFILE: (id: string) => `/profile/${id}`,
    TAG: (id: string) => `/tags/${id}`,
    QUESTION: (id: string) => `/questions/${id}`,
    LAST_POST: '/last-post',
}
export default ROUTES;